build:
	go mod init github.com/zizdlp/md2html 
	go mod tidy  
convert:
	go run cmd/convert/main.go src des
server:
	go run cmd/server/main.go
monitor:
	go run cmd/monitor/main.go src des

test_convert:
	go run cmd/test_convert/main.go ../src/test.md ../des/test.html