pipeline {
    agent any

    environment {
        IMAGE_BACKEND = "smartteam/backend:latest"
        IMAGE_FRONTEND = "smartteam/frontend:latest"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/prbyl0809/smart_team_assistant',
                    credentialsId: 'github-token'
            }
        }

        stage('Build Backend') {
            steps {
                sh 'docker build -t $IMAGE_BACKEND ./backend'
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'docker build -t $IMAGE_FRONTEND ./frontend'
            }
        }

        stage('Test') {
            steps {
                sh 'echo "Running tests..."'
            }
        }
    }
}
