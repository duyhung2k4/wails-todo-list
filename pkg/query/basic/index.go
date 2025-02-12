package query

import (
	requestdata "todo/infrastructure/dto/client"
	"todo/infrastructure/initialize"

	"gorm.io/gorm"
)

type queryService[T any] struct {
	psql *gorm.DB
}

type QueryService[T any] interface {
	First(payload requestdata.QueryReq[T]) (*T, error)
	Find(payload requestdata.QueryReq[T]) ([]T, error)
	Create(data T) (*T, error)
	MultiCreate(datas []T) ([]T, error)
	Update(payload requestdata.QueryReq[T]) (*T, error)
	Delete(payload requestdata.QueryReq[T]) error
}

func Register[T any]() QueryService[T] {
	return &queryService[T]{
		psql: initialize.GetPsql(),
	}
}
