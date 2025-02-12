package taskhandle

import (
	requestdata "todo/infrastructure/dto/client"
	"todo/infrastructure/model"
)

func (h *taskHandle) Create(req requestdata.CreateTaskReq) (*model.Task, error) {
	data := &model.Task{
		Name:     req.Name,
		StartAt:  req.StartAt,
		FinishAt: req.FinishAt,
		TagId:    req.TagId,
		UserId:   req.UserId,
	}

	result, err := h.query.Create(*data)
	if err != nil {
		return nil, err
	}

	return result, nil
}
