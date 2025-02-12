package initialize

import (
	"database/sql"
	"log"
	"todo/infrastructure/model"

	_ "github.com/mattn/go-sqlite3"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func connection() {
	sqlDB, err := sql.Open("sqlite3", config.PathData)
	if err != nil {
		log.Fatal("Failed to open database/sql:", err)
	}

	db, err = gorm.Open(sqlite.Dialector{Conn: sqlDB}, &gorm.Config{})

	if err != nil {
		log.Fatalln("Error connection database: ", err)
	}

	db.AutoMigrate(
		&model.Task{},
		&model.User{},
		&model.Tag{},
	)
}

func GetPsql() *gorm.DB {
	return db
}
