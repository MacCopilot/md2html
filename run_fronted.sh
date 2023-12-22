docker stop wiki_fronted
docker rm wiki_fronted
docker run --name wiki_fronted -it -p 3000:3000  wiki_fronted
