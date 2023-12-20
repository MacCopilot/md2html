package convert

import (
	"bytes"
	"encoding/json"
	"fmt"
	"os"

	"github.com/yuin/goldmark/text"
	md "github.com/zizdlp/md2html/markdown/render"
)
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
