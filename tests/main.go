package main

import (
	"bytes"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"strings"

	"github.com/yuin/goldmark/text"
	md "github.com/zizdlp/md2html/markdown/render"
)
func convertMd2Html(src_path string,des_path string){
	fmt.Println("start convert file:",src_path)
	data, err := os.ReadFile(src_path)
	if err != nil {
		fmt.Println("read file failed:", err)
		return
	}

	markdown := md.GetMarkdownConfig()

	doc := markdown.Parser().Parse(text.NewReader(data))
	var b bytes.Buffer
	if doc.HasChildren() && doc.FirstChild().Kind().String() == "Heading" { // 有heading就意味有 content table
		//remove 1. heading,2 lists
		markdown.Renderer().Render(&b, data, doc.FirstChild().NextSibling()) // 1.渲染目录
		content := doc.FirstChild()
		doc.RemoveChild(doc, content)
		content = doc.FirstChild() // 目录
		doc.RemoveChild(doc, content)
	}
	markdown.Renderer().Render(&b, data, doc) // 2.渲染正式内容
	if err != nil {
		return
	}
	err = os.WriteFile(des_path, b.Bytes(), 0644)
	if err != nil {
		return
	}
}

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
	// 指定源目录和目标目录路径
	srcDir := "tests/src"
	destDir := "tests/des"
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

			// 如果是以".md"结尾的文件，修改目标路径后缀为".html"
			if strings.HasSuffix(info.Name(), ".md") {
				destPath = filepath.Join(destDir, relPath[:len(relPath)-len(".md")]+".html")
				convertMd2Html(srcPath,destPath)
			}else {
				// 复制文件
				err = copyFile(srcPath, destPath)
				if err != nil {
					fmt.Printf("复制文件 %s 到 %s 时发生错误：%v\n", srcPath, destPath, err)
				} else {
					fmt.Printf("成功复制文件 %s 到 %s\n", srcPath, destPath)
				}
			}


		}

		return nil
	})

	if err != nil {
		fmt.Println("遍历源目录时发生错误:", err)
	}
	// // 遍历源目录
	// err := filepath.Walk(srcDir, func(srcPath string, info os.FileInfo, err error) error {
	// 	if err != nil {
	// 		return err
	// 	}

	// 	// 检查是否为文件
	// 	if !info.IsDir() {
	// 		// 构建目标路径
	// 		destPath := filepath.Join(destDir, info.Name())

	// 		// 如果是以".md"结尾的文件，修改目标路径后缀为".html"
	// 		if strings.HasSuffix(info.Name(), ".md") {
	// 			srcPath:= filepath.Join(destDir, strings.TrimSuffix(info.Name(), ".md")+".html")
	// 			destPath = filepath.Join(destDir, strings.TrimSuffix(info.Name(), ".md")+".html")
	// 			convertMd2Html(srcPath,destPath)

	// 		}
			
	// 		// 复制文件
	// 		err := copyFile(srcPath, destPath)
	// 		if err != nil {
	// 			fmt.Printf("复制文件 %s 到 %s 时发生错误：%v\n", srcPath, destPath, err)
	// 		} else {
	// 			fmt.Printf("成功复制文件 %s 到 %s\n", srcPath, destPath)
	// 		}
	// 	}

	// 	return nil
	// })

	// if err != nil {
	// 	fmt.Println("遍历源目录时发生错误:", err)
	// }
}

