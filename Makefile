build:
	go mod init github.com/zizdlp/md2html 
	go mod tidy  
test:
	go run tests/main.go