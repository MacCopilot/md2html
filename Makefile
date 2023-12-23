build_backend:
	docker build -t wiki_backend -f ./wiki_backend/wiki_backend.Dockerfile ./wiki_backend
build_fronted:
	docker build -t wiki_fronted -f ./wiki_fronted/wiki_fronted.Dockerfile ./wiki_fronted
run_compose:
	docker-compose  -f dev-docker-compose.yaml build
	docker-compose  -f dev-docker-compose.yaml down --volumes --remove-orphans
	docker-compose  -f dev-docker-compose.yaml up 