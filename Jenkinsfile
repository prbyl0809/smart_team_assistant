pipeline {
    agent any

    environment {
        IMAGE_BACKEND = "smartteam/backend:latest"
        IMAGE_FRONTEND = "smartteam/frontend:latest"
    }

    stages {
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
