package taskhandle

import (
	requestdata "todo/infrastructure/dto/client"
	"todo/infrastructure/model"
	query "todo/pkg/query/basic"
	rawquery "todo/pkg/query/raw"
)

type taskHandle struct {
	query    query.QueryService[model.Task]
	rawQuery rawquery.QueryRawService[model.Task]
}

type TaskHandle interface {
	GetAll() ([]model.Task, error)
	Create(req requestdata.CreateTaskReq) (*model.Task, error)
	Update(req requestdata.UpdateTaskReq) (*model.Task, error)
	Delete(req requestdata.DeleteTaskReq) error
}

func Register() TaskHandle {
	return &taskHandle{
		query:    query.Register[model.Task](),
		rawQuery: rawquery.Register[model.Task](),
	}
}
