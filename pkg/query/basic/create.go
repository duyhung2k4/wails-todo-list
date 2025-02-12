package query

import (
	requestdata "todo/infrastructure/dto/client"

	"gorm.io/gorm/clause"
)

func (s *queryService[T]) Create(data T) (*T, error) {
	newData := data
	if err := s.psql.Create(&newData).Error; err != nil {
		return nil, err
	}
	return &newData, nil
}

func (s *queryService[T]) Update(payload requestdata.QueryReq[T]) (*T, error) {
	newData := payload.Data

	err := s.psql.Where(payload.Condition, payload.Args...).Clauses(clause.Returning{}).Updates(&newData).Error
	if err != nil {
		return nil, err
	}

	return &newData, nil
}
