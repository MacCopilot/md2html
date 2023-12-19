package util

import (
	"time"

	"github.com/spf13/viper"
)

// Config stores all configuration of the application.
// The values are read by viper from a config file or environment variable.
type Config struct {
	Environment                 string        `mapstructure:"ENVIRONMENT"`
	DBDriver                    string        `mapstructure:"DB_DRIVER"`
	DBSource                    string        `mapstructure:"DB_SOURCE"`
	WIKIPath                    string        `mapstructure:"WIKI_PATH"`
	MigrationURL                string        `mapstructure:"MIGRATION_URL"`
	HTTPServerAddress           string        `mapstructure:"HTTP_SERVER_ADDRESS"`
	HOMEADDRESS                 string        `mapstructure:"HOME_ADDRESS"`
	GRPCServerAddress           string        `mapstructure:"GRPC_SERVER_ADDRESS"`
	WEBSOCKETServerAddress      string        `mapstructure:"WEBSOCKET_SERVER_ADDRESS"`
	AdminHTTPServerAddress      string        `mapstructure:"ADMIN_HTTP_SERVER_ADDRESS"`
	AdminGRPCServerAddress      string        `mapstructure:"ADMIN_GRPC_SERVER_ADDRESS"`
	AdminWEBSOCKETServerAddress string        `mapstructure:"ADMIN_WEBSOCKET_SERVER_ADDRESS"`
	RedisAddress                string        `mapstructure:"REDIS_ADDRESS"`
	TokenSymmetricKey           string        `mapstructure:"TOKEN_SYMMETRIC_KEY"`
	AdminTokenSymmetricKey      string        `mapstructure:"ADMIN_TOKEN_SYMMETRIC_KEY"`
	AccessTokenDuration         time.Duration `mapstructure:"ACCESS_TOKEN_DURATION"`
	RefreshTokenDuration        time.Duration `mapstructure:"REFRESH_TOKEN_DURATION"`
	UseHTTPS                    bool          `mapstructure:"USE_HTTPS"`
	EmailSenderName             string        `mapstructure:"EMAIL_SENDER_NAME"`
	EmailSenderAddress          string        `mapstructure:"EMAIL_SENDER_ADDRESS"`
	EmailSenderPassword         string        `mapstructure:"EMAIL_SENDER_PASSWORD"`
}

// LoadConfig reads configuration from file or environment variables.
func LoadConfig(path string) (config Config, err error) {
	viper.AddConfigPath(path)
	viper.SetConfigName("app")
	viper.SetConfigType("env")

	viper.AutomaticEnv()

	err = viper.ReadInConfig()
	if err != nil {
		return
	}

	err = viper.Unmarshal(&config)
	return
}
