pipeline {
    agent any

    stages {
        stage('Front-end: npm install') {
            steps {
                dir('client') {
                    echo 'Installing front-end dependencies...'
                    sh 'npm install'
                    echo "testing Devop branch"
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

        stage('Deploy Application') {
            when {
                branch 'release-*'  // Runs only when the branch name matches 'release-*'
            }
            steps {
                script {
                   echo "testing 3rd branch"
                }
            }
        }
        stage('SonarQube analysis') {
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
