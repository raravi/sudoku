pipeline {

    agent { dockerfile true }
    
    stages {
        stage('Verify tooling') {
           steps {
               sh 'docker version'
           }
       }
    }
}
