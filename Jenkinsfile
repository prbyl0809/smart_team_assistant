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

    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DH_USER', passwordVariable: 'DH_TOKEN')]) {
          sh '''
            set -euo pipefail

            echo "$DH_TOKEN" | docker login -u "$DH_USER" --password-stdin

            BACK_REMOTE="${DH_USER}/smartteam-backend"
            FRONT_REMOTE="${DH_USER}/smartteam-frontend"

            for tag in '"${BUILD_NUMBER}"' '"${GIT_SHA}"' latest; do
              docker tag "${IMG_BACK}:${tag}"  "${BACK_REMOTE}:${tag}"
              docker tag "${IMG_FRONT}:${tag}" "${FRONT_REMOTE}:${tag}"

              docker push "${BACK_REMOTE}:${tag}"
              docker push "${FRONT_REMOTE}:${tag}"
            done

            docker logout || true
          '''
        }
      }
    }
  }

  post {
    success {
      echo "Pushed ${IMG_BACK} and ${IMG_FRONT} with tags: ${BUILD_NUMBER}, ${GIT_SHA}, latest"
    }
  }
}
