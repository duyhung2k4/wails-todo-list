package main

import (
	"embed"
	taghandle "todo/controller/tag"
	taskhandle "todo/controller/task"
	userhandle "todo/controller/user"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create application with options
	err := wails.Run(&options.App{
		Title:  "app",
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		Bind: []interface{}{
			userhandle.Register(),
			taskhandle.Register(),
			taghandle.Register(),
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
