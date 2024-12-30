pipeline {
    agent any
    stages {
        // First pipeline: Triggered when a merge request is created
        stage('Merge Request Trigger') {
            when {
                changeRequest()  // Triggered when a merge request is created
            }
            steps {
                echo 'Merge Request Created: Running the first pipeline'
                // Add your steps for the first pipeline here
            }
        }

        // Second pipeline: Triggered when code is merged into the Develop branch
        stage('Code Merged to Develop') {
            when {
                branch 'Develop'  // Triggered when the develop branch is merged with new code
            }
            steps {
                echo 'Code merged to develop: Running the second pipeline'
                // Add your steps for the second pipeline here
            }
        }

        // Third pipeline: Triggered when a branch with the name release-* is created
        stage('Release Branch Trigger') {
            when {
                branch pattern: '^release-.*', comparator: 'REGEXP'  // Triggered when a branch with the name release-* is created
            }
            steps {
                echo 'Release Branch Created: Running the third pipeline'
                // Add your steps for the third pipeline here
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




// pipeline {
//     agent any

//     stages {
//         stage('Front-end: npm install') {
//             steps {
//                 dir('client') {
//                     echo 'Installing front-end dependencies...'
//                     sh 'npm install'
//                 }
//             }
//         }

//         stage('Back-end: npm install') {
//             steps {
//                 dir('server') {
//                     echo 'Installing back-end dependencies...'
//                     sh 'npm install'
//                 }
//             }
//         }

//         stage('SonarQube analysis') {
//             steps {
//                 script {
//                     def scannerHome = tool name: 'sonarscanner' // Name as configured in Jenkins
//                     withSonarQubeEnv('Sonarqube') { // Name of your SonarQube instance
//                         sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=project-devops"
//                     }
//                 }
//             }
//         }
//     }

//     post {
//         always {
//             echo 'Pipeline execution completed.'
//         }
//         success {
//             echo 'Pipeline executed successfully!'
//         }
//         failure {
//             echo 'Pipeline failed. Check the logs for details.'
//         }
//     }
// }
