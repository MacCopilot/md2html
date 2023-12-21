package main

import (
	"fmt"
	"os"

	"github.com/zizdlp/md2html/markdown/convert"
)

func main() {
	// 从命令行获取源目录和目标目录
	if len(os.Args) != 3 {
		fmt.Println("请提供源目录和目标目录参数")
		return
	}
	sourceDir := os.Args[1]
	targetDir := os.Args[2]

	// 启动监听
	err := convert.StartWatcher(sourceDir, targetDir)
	if err != nil {
		fmt.Println("Error:", err)
	}

	// 阻塞主 goroutine，保持程序运行
	select {}
}
