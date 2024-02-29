pipeline {
    agent any
    tools {nodejs "Node21"}
    stages {
        stage('Build Node Modules') {
           steps {
               sh 'npm i'
           }
       }
        stage("Start Sudoku Application") {
            steps {
                sh 'npm run start &'
            }
        }
        stage("Run Cypress Automation") {
            steps {
                sh 'npm run dev'
            }
        }
    }
}
