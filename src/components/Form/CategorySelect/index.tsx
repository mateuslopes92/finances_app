import {
  Category,
  Container,
  Icon
} from './styles';

import React from 'react';

interface CategorySelectProps {
  category: string
}

const CategorySelect: React.FC<CategorySelectProps> = ({ category }) => {
  return (
    <Container>
      <Category>{category}</Category>
      <Icon name='chevron-down' />
    </Container>
  );
}

export default CategorySelect;