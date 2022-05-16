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

export interface CategoryProps { 
  name: string,
  icon: string
}

export interface TransactionCardDataProps {
  type: 'positive' | 'negative',
  title: string,
  amount: string,
  category: CategoryProps,
  date: string
}

export interface TransactionCardProps {
  data: TransactionCardDataProps
}

const TransactionCard: React.FC<TransactionCardProps> = ({ data }) => {
  return (
    <Container>
      <CardTitle>{data.title}</CardTitle>
      <Amount type={data.type}>
        {data.type === 'negative' && '- '}
        {data.amount}
      </Amount>

      <CardFooter>
        <Category>
          <Icon name={data.category.icon} />
          <CategoryName>{data.category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </CardFooter>
    </Container>
  );
}

export default TransactionCard;