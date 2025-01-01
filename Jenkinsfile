pipeline {
    agent any
    stages {
        stage('Merge Request Trigger') {
            when {
                expression {
                    return env.CHANGE_ID != null
                }
            }
            steps {
                echo 'Processing merge request...'
                dir('client') {
                    echo 'Installing front-end dependencies...'
                    sh 'npm install'
                }
                dir('server') {
                    echo 'Installing back-end dependencies...'
                    sh 'npm install'
                }
                script {
                    def scannerHome = tool name: 'sonarscanner'
                    withSonarQubeEnv('Sonarqube') {
                        sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=project-devops"
                    }
                }
            }
        }

        stage('Code Merged to Develop') {
            when {
                branch 'Develop'
            }
            steps {
                echo 'Processing code merged to Develop...'
                dir('client') {
                    echo 'Installing front-end dependencies...'
                    sh 'npm install'
                }
                dir('server') {
                    echo 'Installing back-end dependencies...'
                    sh 'npm install'
                }
                script {
                    def scannerHome = tool name: 'sonarscanner'
                    withSonarQubeEnv('Sonarqube') {
                        sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=project-devops"
                    }
                }
            }
        }

        stage('Release Branch Trigger') {
            when {
                branch pattern: '^release-.*', comparator: 'REGEXP'
            }
            steps {
                script {
                    echo 'Release Branch Created: Running the pipeline'
                    def version = env.BRANCH_NAME.replace('release-', '')
                    def imageName = "logtari31/testapp:${version}"

                    echo "Building Docker image with tag ${imageName}"
                    sh "docker build -t ${imageName} -f client/Dockerfile client/"

                    echo "Pushing Docker image to the registry"
                    withCredentials([usernamePassword(credentialsId: 'logtari31-dockerhub', usernameVariable: 'logtari31', passwordVariable: 'dckr_pat__3zmHH2_U1esanJQk0DrES71xYc')]) {
                        sh "docker login -u $DOCKER_USER -p $DOCKER_PASS"
                    }
                    sh "docker push ${imageName}"
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
