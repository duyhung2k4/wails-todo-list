package model

import (
	"gorm.io/gorm"
)

type Tag struct {
	gorm.Model
	Name  string `json:"name"`
	Color string `json:"color"`
	Code  string `json:"code" gorm:"unique"`

	Tasks []Task `json:"tasks" gorm:"foreignKey:TagId"`
}
