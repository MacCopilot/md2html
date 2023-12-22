docker-compose --env-file dev.env  -f dev-docker-compose.yaml build
docker-compose --env-file dev.env -f dev-docker-compose.yaml down --volumes --remove-orphans
docker-compose --env-file dev.env -f dev-docker-compose.yaml up 