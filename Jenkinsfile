pipeline {
    agent any

    tools {nodejs "Node21"}

    stages {
        stage('Doing everything in Docker') {
           steps {
               sh 'docker-compose up'
           }
       }
    }
}
