package query

import (
	"encoding/json"
	"strings"
	constant "todo/infrastructure/constant"
	requestdata "todo/infrastructure/dto/client"

	"gorm.io/gorm"
)

func (s *queryService[T]) First(payload requestdata.QueryReq[T]) (*T, error) {
	var item *T
	var personOmit []string

	query := s.psql

	for key, omitChild := range payload.Omit {
		if len(omitChild) == 0 {
			personOmit = append(personOmit, key)
		}
	}

	for _, j := range payload.Joins {
		query = query.Joins(j)
	}

	for p, c := range payload.Preload {
		if c != nil {
			query.Preload(p, gorm.Expr(*c), func(tx *gorm.DB) *gorm.DB {
				return tx.Omit(payload.Omit[p]...)
			})
		} else {
			query.Preload(p, func(tx *gorm.DB) *gorm.DB {
				return tx.Omit(payload.Omit[p]...)
			})
		}
	}

	query = query.Where(payload.Condition, payload.Args...).Omit(personOmit...)

	err := query.First(&item).Error
	if err != nil {
		return nil, err
	}

	if payload.PreloadNull == constant.TRUE {
		return item, nil
	}

	jsonItem, err := json.Marshal(item)
	if err != nil {
		return nil, err
	}

	var mapItem map[string]interface{}
	err = json.Unmarshal(jsonItem, &mapItem)
	if err != nil {
		return nil, err
	}

	for p, c := range payload.Preload {
		fields := strings.Split(p, ".")
		if c == nil {
			continue
		}

		var result map[string]interface{} = mapItem
		for _, f := range fields {
			f = strings.ToLower(string(f[0])) + f[1:]

			if result[f] == nil {
				return nil, nil
			}

			jsonData, err := json.Marshal(result[f])
			if err != nil {
				return nil, err
			}

			var converData map[string]interface{}
			err = json.Unmarshal(jsonData, &converData)
			if err != nil {
				return nil, err
			}

			result = converData
		}
	}

	return item, nil
}
