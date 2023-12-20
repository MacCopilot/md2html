package main

import (
	"fmt"
	"io"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/zizdlp/md2html/markdown/convert"
)

// copyFile 复制文件
func copyFile(src, dest string) error {
	srcFile, err := os.Open(src)
	if err != nil {
		return err
	}
	defer srcFile.Close()

	// 确保目标目录及其上级目录存在
	err = os.MkdirAll(filepath.Dir(dest), os.ModePerm)
	if err != nil {
		return err
	}

	destFile, err := os.Create(dest)
	if err != nil {
		return err
	}
	defer destFile.Close()

	_, err = io.Copy(destFile, srcFile)
	if err != nil {
		return err
	}

	return nil
}

func main() {
	// 记录开始时间
	startTime := time.Now()
	// 从命令行获取源目录和目标目录
	if len(os.Args) != 3 {
		fmt.Println("请提供源目录和目标目录参数")
		return
	}
	srcDir := os.Args[1]
	destDir := os.Args[2]

	// 遍历源目录
	err := filepath.Walk(srcDir, func(srcPath string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		// 检查是否为文件
		if !info.IsDir() {
			// 构建相对路径
			relPath, err := filepath.Rel(srcDir, srcPath)
			if err != nil {
				return err
			}

			// 构建目标路径
			destPath := filepath.Join(destDir, relPath)

			// 如果是以".md"结尾的文件，修改目标路径后缀为".json"
			if strings.HasSuffix(info.Name(), ".md") {
				destPath = filepath.Join(destDir, relPath[:len(relPath)-len(".md")]+".wiki")
				// 确保目标目录及其上级目录存在
				err = os.MkdirAll(filepath.Dir(destPath), os.ModePerm)
				if err != nil {
					return err
				}
				convert.ConvertMd2Json(srcPath,destPath)
			}else {
				// 复制文件
				err = copyFile(srcPath, destPath)
				if err != nil {
					fmt.Printf("复制文件 %s 到 %s 时发生错误：%v\n", srcPath, destPath, err)
					panic(err)
				}
			}
		}
		return nil
	})

	if err != nil {
		fmt.Println("遍历源目录时发生错误:", err)
		panic(err)
	}

	// 记录结束时间
	endTime := time.Now()

	// 计算耗时并输出
	elapsedTime := endTime.Sub(startTime)
	fmt.Printf("总耗时：%s\n", elapsedTime)
	convert.RenderLayout(srcDir,destDir)
}