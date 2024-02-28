pipeline {
    agent any

    tools {nodejs "Node21"}

    stages {
        stage("Build React App") {
            steps {
                sh 'npm run build'
            }
        }
        stage("Run Cypress Automation") {
            steps {
                sh 'npm run dev'
            }
        }
    }
}