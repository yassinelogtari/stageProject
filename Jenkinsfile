pipeline {
    agent any
    tools {
        nodejs 'nodejs'
    }
    stages {
        stage('Merge Request Trigger') {
            when {
                expression {
                    // Execute this stage only for pull requests
                    return env.CHANGE_ID != null
                }
            }
            steps {
                echo 'Triggered by merge request'
                echo 'Executing initial tests...'
            }
        }

        stage('Code Merged to Develop') {
            when {
                branch 'develop'
            }
            stages {
                stage('Front-end: npm install') {
                    steps {
                        dir('client') {
                            echo 'Installing front-end dependencies...'
                            echo 'Installing dev dependencies for Jest and Testing Library...'
                            sh 'npm install --save-dev jest @testing-library/react @testing-library/jest-dom'
                            sh 'npm install'
                        }
                    }
                }

                stage('Back-end: npm install') {
                    steps {
                        dir('server') {
                            echo 'Installing back-end dependencies...'
                            sh 'npm install'
                        }
                    }
                }

                stage('Unit Test') {
                    steps {
                        echo 'Running unit tests...'
                        dir('client') {
                            echo 'Running front-end unit tests...'
                            sh 'npm test'
                        }
                    }
                }

                stage('Sonar') {
                    steps {
                        script {
                            def scannerHome = tool name: 'sonarscanner'
                            withSonarQubeEnv('Sonarqube') {
                                sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=project-devops"
                            }
                        }
                    }
                }
            }
        }

        stage('Release Branch Trigger') {
            when {
                branch pattern: '^release-.*', comparator: 'REGEXP'
            }
            stages {
                stage('Build Docker Image') {
                    steps {
                        script {
                            echo 'Release Branch Created: Running the pipeline'
                            def version = env.BRANCH_NAME.replace('release-', '')
                            def imageName = "logtari31/testapp:${version}"

                            echo "Building Docker image with tag ${imageName}"
                            sh "docker build -t ${imageName}-frontend -f client/Dockerfile client/"
                            sh "docker build -t ${imageName}-backend -f server/Dockerfile server/"

                            echo "Pushing Docker image to the registry"
                            withCredentials([usernamePassword(credentialsId: 'logtari31-dockerhub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                                sh "docker login -u $DOCKER_USER -p $DOCKER_PASS"
                            }
                            sh "docker push ${imageName}-frontend"
                            sh "docker push ${imageName}-backend"
                        }
                    }
                }

                stage('Deploy Application') {
                    steps {
                        echo 'Deploying the application using the created Docker images...'
                        sh 'docker-compose up -d'
                    }
                }
            }
        }
    }
    post {
        always {
            echo 'Pipeline execution completed.'
        }
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the logs for details.'
        }
    }
}
