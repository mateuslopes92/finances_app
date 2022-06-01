import {
  Category,
  Container,
  Icon
} from './styles';

import React from 'react';

interface CategorySelectButtonProps {
  category: string,
  onPress: () => void
}

const CategorySelectButton: React.FC<CategorySelectButtonProps> = ({ category, onPress }) => {
  return (
    <Container onPress={onPress}>
      <Category>{category}</Category>
      <Icon name='chevron-down' />
    </Container>
  );
}

export default CategorySelectButton;