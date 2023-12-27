package convert

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/yuin/goldmark/text"
	md "github.com/zizdlp/md2html/markdown/render"
)
func ConvertMd2Html(src_path string,des_path string){
	fmt.Println("start convert file:",src_path)
	data, err := os.ReadFile(src_path)
	if err != nil {
		fmt.Println("read file failed:", err)
		return
	}

	markdown := md.GetMarkdownConfig()

	doc := markdown.Parser().Parse(text.NewReader(data))

	var table bytes.Buffer  
	if doc.HasChildren() && doc.FirstChild().Kind().String() == "Heading" { // 有heading就意味有 content table
		//remove 1. heading,2 lists
		markdown.Renderer().Render(&table, data, doc.FirstChild().NextSibling()) // 1.渲染目录
		content := doc.FirstChild()
		doc.RemoveChild(doc, content)
		content = doc.FirstChild() // 目录
		doc.RemoveChild(doc, content)
	}

	var b bytes.Buffer
	markdown.Renderer().Render(&b, data, doc) // 2.渲染正式内容
	if err != nil {
		fmt.Println("convert html failed:", err)
		return
	}

	// 写入 JSON 字符串到文件
	err = os.WriteFile(des_path, b.Bytes(), 0644)
	if err != nil {
		fmt.Println("write html to file failed:", err)
		return
	}
}
func ConvertMd2Json(src_path string,des_path string){
	fmt.Println("start convert file:",src_path)
	data, err := os.ReadFile(src_path)
	if err != nil {
		fmt.Println("read file failed:", err)
		return
	}

	markdown := md.GetMarkdownConfig()

	doc := markdown.Parser().Parse(text.NewReader(data))

	var table bytes.Buffer  
	if doc.HasChildren() && doc.FirstChild().Kind().String() == "Heading" { // 有heading就意味有 content table
		//remove 1. heading,2 lists
		markdown.Renderer().Render(&table, data, doc.FirstChild().NextSibling()) // 1.渲染目录
		content := doc.FirstChild()
		doc.RemoveChild(doc, content)
		content = doc.FirstChild() // 目录
		doc.RemoveChild(doc, content)
	}

	var b bytes.Buffer
	markdown.Renderer().Render(&b, data, doc) // 2.渲染正式内容
	if err != nil {
		fmt.Println("convert html failed:", err)
		return
	}
	htmlTable := table.String()
	htmlContent := b.String()

	// 构建包含 HTML 表格和内容的 JSON 对象
	jsonObject := map[string]string{
		"table":   htmlTable,
		"content": htmlContent,
	}
	// 将 JSON 对象序列化为 JSON 字符串
	jsonString, err := json.Marshal(jsonObject)
	if err != nil {
		fmt.Println("write to json failed:", err)
		return
	}

	// 写入 JSON 字符串到文件
	err = os.WriteFile(des_path, jsonString, 0644)
	if err != nil {
		fmt.Println("write html to file failed:", err)
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
func ConvertFolder(srcDir string,destDir string) {
	// 记录开始时间
	startTime := time.Now()
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
				ConvertMd2Json(srcPath,destPath)
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
	RenderLayout(srcDir,destDir)
}