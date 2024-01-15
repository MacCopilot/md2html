package render

import (
	admonitions "github.com/stefanfritsch/goldmark-admonitions"
	"github.com/yuin/goldmark"
	"github.com/yuin/goldmark/extension"
	"github.com/yuin/goldmark/parser"
	html "github.com/zizdlp/md2html/markdown/chromahtml"
	highlighting "github.com/zizdlp/md2html/markdown/highlight"
	"github.com/zizdlp/md2html/markdown/katex"
	"go.abhg.dev/goldmark/toc"
)

func GetMarkdownConfig() goldmark.Markdown {
	markdown := goldmark.New(
		goldmark.WithParserOptions(parser.WithAutoHeadingID()),
		goldmark.WithExtensions(
			&toc.Extender{
				Title: "content_table",
			},
		),
		// 支持 GFM
		goldmark.WithExtensions(extension.GFM),
		goldmark.WithExtensions(
			&admonitions.Extender{},
		),
		goldmark.WithExtensions(extension.NewCJK(extension.WithEastAsianLineBreaks(), extension.WithEscapedSpace())),
		goldmark.WithExtensions(
			extension.NewFootnote(
				extension.WithFootnoteIDPrefix([]byte("footnote-")),
				extension.WithFootnoteBacklinkHTML([]byte("^"))),
		),
		// 语法高亮
		goldmark.WithExtensions(
			highlighting.NewHighlighting(
				highlighting.WithStyle("murphy"),
				highlighting.WithFormatOptions(
					html.WithLineNumbers(true),
					html.WithClasses(true),
				),
			),
		),
		// goldmark.WithExtensions(mathjax.MathJax),
		// goldmark.WithExtensions(&qjskatex.Extension{}),
		goldmark.WithExtensions(&katex.Extender{}),
	)
	return markdown
}
