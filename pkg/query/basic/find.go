package query

import (
	requestdata "todo/infrastructure/dto/client"

	"gorm.io/gorm"
)

func (s *queryService[T]) Find(payload requestdata.QueryReq[T]) ([]T, error) {
	var list []T
	var personOmit []string

	query := s.psql

	for _, j := range payload.Joins {
		query = query.Joins(j)
	}

	for p, c := range payload.Preload {
		if c != nil {
			query = query.Preload(p, gorm.Expr(*c), func(tx *gorm.DB) *gorm.DB {
				return tx.Omit(payload.Omit[p]...)
			})
		} else {
			query = query.Preload(p, func(tx *gorm.DB) *gorm.DB {
				return tx.Omit(payload.Omit[p]...)
			})
		}
	}

	for key, omitChild := range payload.Omit {
		if len(omitChild) == 0 {
			personOmit = append(personOmit, key)
		}
	}
	query = query.Where(payload.Condition, payload.Args...).Omit(personOmit...)

	if payload.Order != "" {
		query = query.Order(payload.Order)
	}
	if payload.Limit != 0 {
		query = query.Limit(payload.Limit)
	}
	if payload.Offset != 0 {
		query.Offset(payload.Offset)
	}

	err := query.Find(&list).Error
	if err != nil {
		return nil, err
	}

	return list, nil
}
