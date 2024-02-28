pipeline {
    agent any
    stages {
        stage('Verify tooling') {
           steps {
               sh '''
                   docker info
                   docker version
                   docker compose version
                '''
           }
       }
    }
}
