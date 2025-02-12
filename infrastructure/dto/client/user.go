package requestdata

type CreateUserReq struct {
	Name string `json:"name"`
}

type UpdateUserReq struct {
	Id   uint   `json:"id"`
	Name string `json:"name"`
}

type DeleteUserReq struct {
	Id uint `json:"id"`
}
