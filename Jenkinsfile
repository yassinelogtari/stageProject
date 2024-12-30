pipeline {
    agent any

    stages {
        stage('Front-end: npm install') {
            steps {
                dir('client') {
                    echo 'Installing front-end dependencies...'
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

        stage('SonarQube analysis') {
            steps {
                script {
                    def scannerHome = tool name: 'sonarscanner'
                    withSonarQubeEnv('sonarQube') {
                        sh """
                        ${scannerHome}\\bin\\sonar-scanner -Dsonar.projectKey=project-devops
                        """
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
