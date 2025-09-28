pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://https://github.com/prbyl0809/smart_team_assistant',
                    credentialsId: 'github-token'
            }
        }

        stage('Build') {
            steps {
                sh 'echo "Building project..."'
                sh 'ls -l'
            }
        }

        stage('Test') {
            steps {
                sh 'echo "Running tests..."'
            }
        }
    }
}
