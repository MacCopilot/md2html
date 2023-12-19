build:
	go mod init github.com/zizdlp/md2html 
	go mod tidy  
convert:
	go run cmd/convert/main.go src des
	rm -f -f statik/*
	statik -src=./des -dest=./
server:
	go run cmd/server/main.go