package taskhandle

import (
	requestdata "todo/infrastructure/dto/client"
	"todo/infrastructure/model"
)

func (h *taskHandle) Update(req requestdata.UpdateTaskReq) (*model.Task, error) {
	result, err := h.query.Update(requestdata.QueryReq[model.Task]{
		Data: model.Task{
			Name:     req.Name,
			StartAt:  req.StartAt,
			FinishAt: req.FinishAt,
			TagId:    req.TagId,
			UserId:   req.UserId,
		},
		Condition: "id = ?",
		Args:      []interface{}{req.Id},
	})

	if err != nil {
		return nil, err
	}

	return result, nil
}
