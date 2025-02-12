package initialize

import (
	"log"

	"github.com/spf13/viper"
)

type Config struct {
	PathData string `mapstructure:"path_data"`
}

func loadConfig() {
	viper.SetConfigName("setup")
	viper.SetConfigType("yaml")
	viper.AddConfigPath("./config")

	if err := viper.ReadInConfig(); err != nil {
		log.Fatalf("error read file config: %v", err)
	}

	if err := viper.Unmarshal(&config); err != nil {
		log.Fatalf("error map to struct: %v", err)
	}

	log.Println("config: ", config)
}

func GetConfig() Config {
	return config
}
