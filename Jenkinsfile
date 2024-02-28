pipeline {
    agent any

    tools {nodejs "Node21"}

    stages {
        stage('Build Node Modules') {
           steps {
               sh 'npm i'
           }
       }
        stage("Build React App") {
            steps {
                sh 'npm run build'
            }
        }
        stage("Run Cypress Automation") {
            steps {
                sh 'npm run cy:run'
            }
        }
    }
}