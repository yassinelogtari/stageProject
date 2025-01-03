pipeline {
    agent any
    stages {
        stage('Merge Request Trigger') {
            when {
                expression {
                    return env.CHANGE_ID != null
                }
            }
            stages {
                stage('Build') {
                    steps {
                        echo 'Building the app...'
                        dir('client') {
                            echo 'Building front-end...'
                            sh 'npm run build'
                        }
                        dir('server') {
                            echo 'Building back-end...'
                            sh 'npm run build'
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
                        dir('server') {
                            echo 'Running back-end unit tests...'
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

                stage('Integration Test') {
                    steps {
                        echo 'Running integration tests...'
                        dir('client') {
                            echo 'Running front-end integration tests...'
                            sh 'npm run integration-test'
                        }
                        dir('server') {
                            echo 'Running back-end integration tests...'
                            sh 'npm run integration-test'
                        }
                    }
                }
            }
        }

        stage('Code Merged to Develop') {
            when {
                branch 'Develop'
            }
            stages {
                // stage('Build') {
                //     // steps {
                //     //     echo 'Building the app...'
                //     //     dir('client') {
                //     //         echo 'Building front-end...'
                //     //         sh 'npm run build'
                //     //     }
                //     //     dir('server') {
                //     //         echo 'Building back-end...'
                //     //         sh 'npm run build'
                //     //     }
                //     // }
                // }

                stage('Unit Test') {
                    steps {
                        echo 'Running unit tests.......'
                        dir('client') {
                            echo 'Running front-end unit tests.....'
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

                stage('Integration Test') {
                    steps {
                        echo 'Running integration tests...'
                        dir('client') {
                            echo 'Running front-end integration tests...'
                            sh 'npm run integration-test'
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
                            sh "docker build -t ${imageName} -f client/Dockerfile client/"
                            sh "docker build -t ${imageName}-backend -f server/Dockerfile server/"

                            echo "Pushing Docker image to the registry"
                            withCredentials([usernamePassword(credentialsId: 'logtari31-dockerhub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                                sh "docker login -u $DOCKER_USER -p $DOCKER_PASS"
                            }
                            sh "docker push ${imageName}"
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
