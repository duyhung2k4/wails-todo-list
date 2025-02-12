package taghandle

import (
	requestdata "todo/infrastructure/dto/client"
	"todo/infrastructure/model"
)

func (h *tagHandle) GetAll() ([]model.Tag, error) {
	results, err := h.query.Find(requestdata.QueryReq[model.Tag]{})
	if err != nil {
		return []model.Tag{}, nil
	}

	return results, nil
}
