pipeline {
  agent any

  environment {
    IMG_BACK = "smartteam/backend"
    IMG_FRONT = "smartteam/frontend"
  }

  stages {
    stage('Init') {
      steps {
        script {
          env.GIT_SHA = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
          env.BUILD_TAG_BACK = "${IMG_BACK}:${BUILD_NUMBER}"
          env.BUILD_TAG_FRONT = "${IMG_FRONT}:${BUILD_NUMBER}"
          env.SHA_TAG_BACK = "${IMG_BACK}:${GIT_SHA}"
          env.SHA_TAG_FRONT = "${IMG_FRONT}:${GIT_SHA}"
        }
        sh 'echo "GIT_SHA=$GIT_SHA  BUILD_NUMBER=$BUILD_NUMBER"'
      }
    }

    stage('Build Backend') {
      steps {
        sh "docker build -t ${BUILD_TAG_BACK} -t ${SHA_TAG_BACK} -t ${IMG_BACK}:latest ./backend"
      }
    }

    stage('Build Frontend') {
      steps {
        sh "docker build -t ${BUILD_TAG_FRONT} -t ${SHA_TAG_FRONT} -t ${IMG_FRONT}:latest ./frontend"
      }
    }

    stage('Test Backend') {
      steps {
        sh """
          docker build -f backend/Dockerfile.test -t ${IMG_BACK}-test:${BUILD_NUMBER} ./backend
          docker run --rm ${IMG_BACK}-test:${BUILD_NUMBER}
        """
      }
    }
  }
}
