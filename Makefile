.PHONY: test-backend

test-backend:
	docker build -f backend/Dockerfile.test -t backend-test:local ./backend
	docker run --rm backend-test:local
