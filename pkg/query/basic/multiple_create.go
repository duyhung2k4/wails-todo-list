package query

func (s *queryService[T]) MultiCreate(datas []T) ([]T, error) {
	newDatas := datas
	if err := s.psql.Create(&newDatas).Error; err != nil {
		return []T{}, err
	}

	return newDatas, nil
}
