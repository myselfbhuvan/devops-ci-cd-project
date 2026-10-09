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

        stage('Login to GHCR') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'ghcr-credentials',
                        usernameVariable: 'GHCR_USER',
                        passwordVariable: 'GHCR_TOKEN'
                    )
                ]) {
                    sh '''
                        echo "$GHCR_TOKEN" | docker login ghcr.io \
                            -u "$GHCR_USER" \
                            --password-stdin
                    '''
                }
            }
        }

        stage('Tag Docker Image') {
            steps {
                sh '''
                    docker tag calculator-app:latest \
                    ghcr.io/myselfbhuvan/calculator-app:latest
                '''
            }
        }

        stage('Push Docker Image') {
            steps {
                sh '''
                    docker push ghcr.io/myselfbhuvan/calculator-app:latest
                '''
            }
        }
    }
}
