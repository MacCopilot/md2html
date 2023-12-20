package main

import (
	"fmt"
	"os"
	"path/filepath"
	"sync"

	"github.com/fsnotify/fsnotify"
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
	err := startWatcher(sourceDir, targetDir)
	if err != nil {
		fmt.Println("Error:", err)
	}

	// 阻塞主 goroutine，保持程序运行
	select {}
}

func startWatcher(sourceDir, targetDir string) error {
	watcher, err := fsnotify.NewWatcher()
	if err != nil {
		return err
	}
	defer watcher.Close()

	// 使用 WaitGroup 以确保所有子 goroutine 完成后再退出程序
	var wg sync.WaitGroup
	wg.Add(1)
	// 启动 goroutine 监听事件
	go func() {
		defer wg.Done()
		for {
			select {
			case event := <-watcher.Events:
				if event.Op&fsnotify.Write == fsnotify.Write && filepath.Ext(event.Name) == ".md" {
					// .md 文件被写入，进行同步操作
					fmt.Println("Markdown file modified:", event.Name)
				}
				if event.Op&fsnotify.Create == fsnotify.Create && filepath.Ext(event.Name) == ".md" {
					// .md 文件被创建，进行同步操作
					fmt.Println("Markdown file created:", event.Name)
				}
				if event.Op&fsnotify.Remove == fsnotify.Remove && filepath.Ext(event.Name) == ".md" {
					// .md 文件被删除，进行同步操作
					fmt.Println("Markdown file deleted:", event.Name)
				}
			case err := <-watcher.Errors:
				fmt.Println("Error:", err)
			}
		}
	}()

	// 添加监听源目录及其子目录
	err = filepath.Walk(sourceDir, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if info.IsDir() {
			wg.Add(1)
			go func() {
				defer wg.Done()
				watcher.Add(path)
			}()
		}
		return nil
	})
	if err != nil {
		return err
	}

	fmt.Println("Watcher started. Press Ctrl+C to stop.")
	// 等待所有子 goroutine 完成
	wg.Wait()
	return nil
}
