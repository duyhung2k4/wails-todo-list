package userhandle

import (
	requestdata "todo/infrastructure/dto/client"
	"todo/infrastructure/model"
)

func (h *userHandle) Delete(req requestdata.DeleteUserReq) error {
	err := h.query.Delete(requestdata.QueryReq[model.User]{
		Condition: "id = ?",
		Args:      []interface{}{req.Id},
	})

	if err != nil {
		return nil
	}

	return nil
}
