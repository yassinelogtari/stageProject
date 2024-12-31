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
                     def scannerHome = tool name: 'sonarscanner'
                     withSonarQubeEnv('Sonarqube') {
                         sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=project-devops"
                     }
                 }
             }
         }
     }
                }
            }
        }



        
        stage('Code Merged to Develop') {
            when {
                branch 'Develop' 
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
            steps {
                script {
                    echo 'Release Branch Created: Running the pipeline'
                    def version = env.BRANCH_NAME.replace('release-', '')
                    def imageName = "logtari31/testapp:${version}"

                  
                    echo "Building Docker image with tag ${imageName}"
                    sh "docker build -t ${imageName} ."
                    
                    echo "Pushing Docker image to the registry"
                    sh "docker login -u logtari31 -p Bq#NstR53vwt,m]"
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



