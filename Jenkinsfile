pipeline {
    agent any

    stages {

        stage('Front-end: npm install') {
            steps {
                dir('client') {
                    sh 'npm install --legacy-peer-deps'
                }
            }
        }

        stage('Back-end: npm install') {
            steps {
                dir('server') {
                    sh 'npm install'
                }
            }
        }

    }
}
