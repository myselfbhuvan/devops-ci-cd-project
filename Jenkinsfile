pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Test Application') {
            steps {
                echo 'Testing Calculator Application...'
                sh 'node --version'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t calculator-app:latest .'
            }
        }

        stage('Verify Docker Image') {
            steps {
                sh 'docker images calculator-app'
            }
        }
    }
}
