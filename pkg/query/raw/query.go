package rawquery

import requestdata "todo/infrastructure/dto/client"

func (s *queryRawService[T]) Query(payload requestdata.QueryRawReq[T]) (*T, error) {
	var newData T

	condition := []interface{}{}
	condition = append(condition, payload.Data...)
	condition = append(condition, payload.Args...)
	err := s.psql.Raw(
		payload.Sql,
		condition...,
	).Scan(&newData).Error
	if err != nil {
		return nil, err
	}

	return &newData, nil
}
