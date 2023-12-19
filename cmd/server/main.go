package main

import (
	"net"
	"net/http"
	"os"

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






