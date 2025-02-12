package userhandle

import (
	requestdata "todo/infrastructure/dto/client"
	"todo/infrastructure/model"
	query "todo/pkg/query/basic"
	rawquery "todo/pkg/query/raw"
)

type userHandle struct {
	query    query.QueryService[model.User]
	rawQuery rawquery.QueryRawService[model.User]
}

type UserHandle interface {
	GetAll() ([]model.User, error)
	Create(req requestdata.CreateUserReq) (*model.User, error)
	Update(req requestdata.UpdateUserReq) (*model.User, error)
	Delete(req requestdata.DeleteUserReq) error
}

func Register() UserHandle {

	return &userHandle{
		query:    query.Register[model.User](),
		rawQuery: rawquery.Register[model.User](),
	}
}
