package userhandle

import (
	requestdata "todo/infrastructure/dto/client"
	"todo/infrastructure/model"
)

func (h *userHandle) Update(req requestdata.UpdateUserReq) (*model.User, error) {
	result, err := h.query.Update(requestdata.QueryReq[model.User]{
		Data: model.User{
			Name: req.Name,
		},
		Condition: "id = ?",
		Args:      []interface{}{req.Id},
	})

	if err != nil {
		return nil, err
	}

	return result, nil
}
