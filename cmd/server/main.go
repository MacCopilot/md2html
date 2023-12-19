package main

import (
	"net"
	"net/http"
	"os"
	"strings"

	"github.com/grpc-ecosystem/grpc-gateway/runtime"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
	"github.com/zizdlp/md2html/util"
)

func main() {

	config, err := util.LoadConfig(".")
	if err != nil {
		log.Fatal().Msgf("cannot load config: %s", err)
	}
	if config.Environment == "development" {
		// 将 log 包的输出设置为 Zerolog 的 ConsoleWriter
		log.Logger = log.Output(zerolog.ConsoleWriter{Out: os.Stderr})
	}
	runStaticServer(config)
}



func CustomMatcher(key string) (string, bool) {
	switch key {
	case "X-Envoy-External-Address":
		return key, true
	default:
		return runtime.DefaultHeaderMatcher(key)
	}
}
func runStaticServer(config util.Config) {
	mux := http.NewServeMux()

	// Serve static files from the "/tmp/wiki/" directory
	fileServer := http.FileServer(http.Dir("des/"))
	mux.Handle("/", http.StripPrefix("/", fileServer))
	listener, err := net.Listen("tcp", config.HTTPServerAddress)
	if err != nil {
		log.Fatal().Msgf("cannot create listener: %s", err)
	}

	log.Info().Msgf("start static file server at %s", listener.Addr().String())
	err = http.Serve(listener, mux)
	if err != nil {
		log.Fatal().Msgf("cannot start static file server: %s", err)
	}
}



func allowCORS(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if origin := r.Header.Get("Origin"); origin != "" {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			if r.Method == "OPTIONS" && r.Header.Get("Access-Control-Request-Method") != "" {
				preflightHandler(w, r)
				return
			}
		}
		h.ServeHTTP(w, r)
	})
}

// preflightHandler adds the necessary headers in order to serve
// CORS from any origin using the methods "GET", "HEAD", "POST", "PUT", "DELETE"
// We insist, don't do this without consideration in production systems.
func preflightHandler(w http.ResponseWriter, r *http.Request) {
	headers := []string{"Content-Type", "Accept", "Authorization"}
	w.Header().Set("Access-Control-Allow-Headers", strings.Join(headers, ","))
	methods := []string{"GET", "HEAD", "POST", "PUT", "DELETE", "PATCH"}
	w.Header().Set("Access-Control-Allow-Methods", strings.Join(methods, ","))
	log.Info().Msgf("preflightHandler at %s", r.URL.Path)
}






