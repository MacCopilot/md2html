package convert

import (
	"bytes"
	"fmt"
	"os"

	"github.com/yuin/goldmark/text"
	md "github.com/zizdlp/md2html/markdown/render"
)
func ConvertMd2Html(src_path string,des_path string){
	fmt.Println("start convert file:",src_path)
	data, err := os.ReadFile(src_path)
	if err != nil {
		fmt.Println("read file failed:", err)
		panic(err)
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
		fmt.Println("convert html failed:", err)
		panic(err)
	}
	err = os.WriteFile(des_path, b.Bytes(), 0644)
	if err != nil {
		fmt.Println("write html to file failed:", err)
		panic(err)
	}
}
