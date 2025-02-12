package query

import requestdata "todo/infrastructure/dto/client"

func (s *queryService[T]) Delete(payload requestdata.QueryReq[T]) error {
	var del T

	query := s.psql.Where(payload.Condition, payload.Args...)

	if payload.Unscoped {
		query = query.Unscoped()
	}

	if err := query.Delete(&del).Error; err != nil {
		return err
	}
	return nil
}
