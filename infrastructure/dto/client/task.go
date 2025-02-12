package requestdata

import "time"

type CreateTaskReq struct {
	Name     string     `json:"name"`
	StartAt  *time.Time `json:"startAt"`
	FinishAt *time.Time `json:"finishAt"`
	TagId    uint       `json:"tagId"`
	UserId   uint       `json:"userId"`
}

type UpdateTaskReq struct {
	Id       uint       `json:"id"`
	Name     string     `json:"name"`
	StartAt  *time.Time `json:"startAt"`
	FinishAt *time.Time `json:"finishAt"`
	TagId    uint       `json:"tagId"`
	UserId   uint       `json:"userId"`
}

type DeleteTaskReq struct {
	Id uint `json:"id"`
}
