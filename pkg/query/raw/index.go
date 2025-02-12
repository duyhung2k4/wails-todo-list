package rawquery

import (
	requestdata "todo/infrastructure/dto/client"
	"todo/infrastructure/initialize"

	"gorm.io/gorm"
)

type queryRawService[T any] struct {
	psql *gorm.DB
}

type QueryRawService[T any] interface {
	Query(payload requestdata.QueryRawReq[T]) (*T, error)
	QueryAll(payload requestdata.QueryRawReq[T]) ([]T, error)
}

func Register[T any]() QueryRawService[T] {
	return &queryRawService[T]{
		psql: initialize.GetPsql(),
	}
}
