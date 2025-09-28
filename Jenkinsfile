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
            set -e

            echo "$DH_TOKEN" | docker login -u "$DH_USER" --password-stdin

            BACK_REMOTE="${DH_USER}/smartteam-backend"
            FRONT_REMOTE="${DH_USER}/smartteam-frontend"

            for TAG in "'${BUILD_NUMBER}'" "'${GIT_SHA}'" latest; do
              docker tag "${IMG_BACK_LOCAL}:${TAG}"  "${BACK_REMOTE}:${TAG}"
              docker tag "${IMG_FRONT_LOCAL}:${TAG}" "${FRONT_REMOTE}:${TAG}"
            done

            for TAG in "'${BUILD_NUMBER}'" "'${GIT_SHA}'" latest; do
              docker push "${BACK_REMOTE}:${TAG}"
              docker push "${FRONT_REMOTE}:${TAG}"
            done

            docker logout || true

            echo "✅ Pushed: ${BACK_REMOTE}:{${BUILD_NUMBER},${GIT_SHA},latest}"
            echo "✅ Pushed: ${FRONT_REMOTE}:{${BUILD_NUMBER},${GIT_SHA},latest}"
          '''
        }
        }
    }
  }
  
  post {
    success {
      echo "Images available on Docker Hub under your namespace."
    }
  }
}
