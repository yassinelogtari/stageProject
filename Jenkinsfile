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

        stage('SonarQube Analysis') {
            steps {
                echo 'Running SonarQube analysis...'
                sh '''
                    sonar-scanner \
                        -Dsonar.projectKey=project-devops \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=http://52.158.44.105:9000 \
                        -Dsonar.login=sqp_2c0fff6260ac2b3702c285d31b1b741556be9658
                '''
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
