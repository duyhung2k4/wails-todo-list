package taghandle

import (
	requestdata "todo/infrastructure/dto/client"
	"todo/infrastructure/model"
	query "todo/pkg/query/basic"
	rawquery "todo/pkg/query/raw"
)

type tagHandle struct {
	query    query.QueryService[model.Tag]
	rawQuery rawquery.QueryRawService[model.Tag]
}

type TagHandle interface {
	GetAll() ([]model.Tag, error)
	Create(req requestdata.CreateTagReq) (*model.Tag, error)
	Update(req requestdata.UpdateTagReq) (*model.Tag, error)
	Delete(req requestdata.DeleteTagReq) error
}

func Register() TagHandle {
	return &tagHandle{
		query:    query.Register[model.Tag](),
		rawQuery: rawquery.Register[model.Tag](),
	}
}
