package katex

import (
	_ "embed"
	"io"
)

func Render(w io.Writer, src []byte, display bool) error {
	if display {
		_, err := io.WriteString(w, "<div class='math display'>$$"+string(src)+"$$</div>")
		return err
	} else {
		_, err := io.WriteString(w, "<span class='math inline'>$"+string(src)+"$</span>")
		return err
	}

}