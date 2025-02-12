package taskhandle

import (
	requestdata "todo/infrastructure/dto/client"
	"todo/infrastructure/model"
)

func (h *taskHandle) GetAll() ([]model.Task, error) {
	results, err := h.query.Find(requestdata.QueryReq[model.Task]{})
	if err != nil {
		return []model.Task{}, nil
	}

	return results, nil
}
