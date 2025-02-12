package taskhandle

import (
	requestdata "todo/infrastructure/dto/client"
	"todo/infrastructure/model"
)

func (h *taskHandle) Delete(req requestdata.DeleteTaskReq) error {
	err := h.query.Delete(requestdata.QueryReq[model.Task]{
		Condition: "id = ?",
		Args:      []interface{}{req.Id},
	})

	if err != nil {
		return nil
	}

	return nil
}
