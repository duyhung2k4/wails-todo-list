package taghandle

import (
	requestdata "todo/infrastructure/dto/client"
	"todo/infrastructure/model"
)

func (h *tagHandle) Update(req requestdata.UpdateTagReq) (*model.Tag, error) {
	result, err := h.query.Update(requestdata.QueryReq[model.Tag]{
		Data: model.Tag{
			Name:  req.Name,
			Color: req.Color,
			Code:  req.Code,
		},
		Condition: "id = ?",
		Args:      []interface{}{req.Id},
	})

	if err != nil {
		return nil, err
	}

	return result, nil
}
