package model

import (
	"time"

	"gorm.io/gorm"
)

type Task struct {
	gorm.Model
	Name     string     `json:"name"`
	StartAt  *time.Time `json:"startAt"`
	FinishAt *time.Time `json:"finishAt"`

	UserId uint  `json:"userId"`
	User   *User `json:"user" gorm:"foreignKey:UserId; constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`

	TagId uint `json:"tagId"`
	Tag   *Tag `json:"tag"`
}
