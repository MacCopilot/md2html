build:
	go mod init github.com/zizdlp/md2html 
	go mod tidy  
convert:
	go run cmd/convert/main.go src des
server:
	go run cmd/server/main.go
monitor:
	go run cmd/monitor/main.go src des
build_image:
	docker build -t backend -f ./build/backend.Dockerfile .

build_fronted:
	docker build --build-arg NEXT_PUBLIC_HOME_URL=http://localhost:3000 --build-arg NEXT_PUBLIC_BACKEND_URL=http://localhost:8080 --build-arg NEXT_SHARP_PATH=/app/node_modules/sharp -t wiki_fronted -f ./wiki_fronted.Dockerfile .