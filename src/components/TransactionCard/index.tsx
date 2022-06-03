import {
  Amount,
  CardFooter,
  CardTitle,
  Category,
  CategoryName,
  Container,
  Date,
  Icon
} from './styles';

import React from 'react';
import { categories } from '../../utils/categories';

export interface TransactionCardDataProps {
  type: 'positive' | 'negative',
  name: string,
  price: string,
  category: string,
  date: string
}

export interface TransactionCardProps {
  data: TransactionCardDataProps
}

const TransactionCard: React.FC<TransactionCardProps> = ({ data }) => {
  const category = categories.filter(item => item.key === data.category)[0];

  return (
    <Container>
      <CardTitle>{data.name}</CardTitle>
      <Amount type={data.type}>
        {data.type === 'negative' && '- '}
        {data.price}
      </Amount>

      <CardFooter>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </CardFooter>
    </Container>
  );
}

export default TransactionCard;