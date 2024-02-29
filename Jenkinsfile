pipeline {
    agent {
        docker { image 'node:20.11.1-alpine3.19' }
    }
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
