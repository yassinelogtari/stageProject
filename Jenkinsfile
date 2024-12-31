pipeline {
    agent any
    stages {
        // First pipeline: Triggered when a merge request is created
        stage('Merge Request Trigger') {
            when {
                 expression {
                    return env.CHANGE_ID != null // Trigger if it's a merge request
                }
            }
            steps {
                /     stages {
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
                     def scannerHome = tool name: 'sonarscanner' // Name as configured in Jenkins
                     withSonarQubeEnv('Sonarqube') { // Name of your SonarQube instance
                         sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=project-devops"
                     }
                 }
             }
         }
     }
                }
            }
        }



        // Second pipeline: Triggered when code is merged into the Develop branch
        stage('Code Merged to Develop') {
            when {
                branch 'Develop'  // Triggered when the develop branch is merged with new code
            }
            steps {
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
                     def scannerHome = tool name: 'sonarscanner' // Name as configured in Jenkins
                     withSonarQubeEnv('Sonarqube') { // Name of your SonarQube instance
                         sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=project-devops"
                     }
                 }
             }
         }
            }
        }

        // Third pipeline: Triggered when a branch with the name release-* is created
        stage('Release Branch Trigger') {
            when {
                branch pattern: '^release-.*', comparator: 'REGEXP'  // Triggered when a branch with the name release-* is created
            }
            steps {
                script {
                    echo 'Release Branch Created: Running the pipeline'

                    // Extract the version from the branch name
                    def version = env.BRANCH_NAME.replace('release-', '')
                    def imageName = "logtari31/testapp:${version}"

                    // Stage 1: Build and Push Docker Image
                    echo "Building Docker image with tag ${imageName}"
                    sh "docker build -t ${imageName} ."
                    
                    echo "Pushing Docker image to the registry"
                    sh "docker login -u logtari31 -p Bq#NstR53vwt,m]"
                    sh "docker push ${imageName}"

                    // Stage 2: Deploy Application
                    // echo "Deploying application using image ${imageName}"
                    // sh """
                    //     docker pull ${imageName}
                    //     docker stop my-app || true
                    //     docker rm my-app || true
                    //     docker run -d --name my-app -p 80:80 ${imageName}
                    // """
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
