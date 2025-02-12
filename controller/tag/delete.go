package taghandle

import (
	requestdata "todo/infrastructure/dto/client"
	"todo/infrastructure/model"
)

func (h *tagHandle) Delete(req requestdata.DeleteTagReq) error {
	err := h.query.Delete(requestdata.QueryReq[model.Tag]{
		Condition: "id = ?",
		Args:      []interface{}{req.Id},
	})

	if err != nil {
		return nil
	}

	return nil
}
