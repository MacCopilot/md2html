build_backend:
	docker build -t wiki_backend -f ./wiki_backend/wiki_backend.Dockerfile ./wiki_backend
build_frontend:
	docker build -t wiki_frontend -f ./wiki_frontend/wiki_frontend.Dockerfile ./wiki_frontend
run_compose:
	docker-compose  -f dev-docker-compose.yaml build
	docker-compose  -f dev-docker-compose.yaml down --volumes --remove-orphans
	docker-compose  -f dev-docker-compose.yaml up 