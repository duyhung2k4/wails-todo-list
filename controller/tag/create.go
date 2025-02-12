package taghandle

import (
	requestdata "todo/infrastructure/dto/client"
	"todo/infrastructure/model"
)

func (h *tagHandle) Create(req requestdata.CreateTagReq) (*model.Tag, error) {
	data := &model.Tag{
		Name:  req.Name,
		Color: req.Color,
		Code:  req.Code,
	}

	result, err := h.query.Create(*data)
	if err != nil {
		return nil, err
	}

	return result, nil
}
