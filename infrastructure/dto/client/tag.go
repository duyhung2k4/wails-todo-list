package requestdata

type CreateTagReq struct {
	Name  string `json:"name"`
	Color string `json:"color"`
	Code  string `json:"code"`
}

type UpdateTagReq struct {
	Id    uint   `json:"id"`
	Name  string `json:"name"`
	Color string `json:"color"`
	Code  string `json:"code"`
}

type DeleteTagReq struct {
	Id uint `json:"id"`
}
