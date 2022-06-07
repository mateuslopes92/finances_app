import {
  Amount,
  Container,
  Title
} from './styles';

import React from 'react';

interface HistoryCardProps {
  color: string,
  title: string,
  price: string
}

const HistoryCard: React.FC<HistoryCardProps> = ({ color, title, price }) => {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{price}</Amount>
    </Container>
  );
}

export default HistoryCard;