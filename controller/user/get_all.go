package userhandle

import (
	requestdata "todo/infrastructure/dto/client"
	"todo/infrastructure/model"
)

func (h *userHandle) GetAll() ([]model.User, error) {
	results, err := h.query.Find(requestdata.QueryReq[model.User]{})
	if err != nil {
		return []model.User{}, nil
	}

	return results, nil
}
