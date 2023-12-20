build:
	go mod init github.com/zizdlp/md2html 
	go mod tidy  
convert:
	go run cmd/convert/main.go src des
server:
	go run cmd/server/main.go
monitor:
	go run cmd/sync/main.go t1 t2