docker stop wiki_backend
docker rm wiki_backend
docker run --name wiki_backend -it -p 8080:8080   -v $(pwd)/src:/tmp/src -v $(pwd)/des:/tmp/des backend
