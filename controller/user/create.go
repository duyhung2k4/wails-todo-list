package userhandle

import (
	requestdata "todo/infrastructure/dto/client"
	"todo/infrastructure/model"
)

func (h *userHandle) Create(req requestdata.CreateUserReq) (*model.User, error) {
	data := &model.User{
		Name: req.Name,
	}

	result, err := h.query.Create(*data)
	if err != nil {
		return nil, err
	}

	return result, nil
}
