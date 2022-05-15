import {
  Amount,
  CardContainer,
  CardContent,
  CardHeader,
  CardIcon,
  CardTitle,
  LastTransaction
} from './styles';

import React from 'react';

export type HighlightCardProps = {
  title: string,
  amount: string,
  lastTransaction: string,
  type: 'up' | 'down' | 'total'
}

const icon = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
  total: 'dollar-sign'
}

const HighlightCard: React.FC<HighlightCardProps> = ({ 
  title,
  amount,
  lastTransaction,
  type
 }) => {
  return (
    <CardContainer>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardIcon name={icon[type]} />
      </CardHeader>

      <CardContent>
        <Amount>{amount}</Amount>
        <LastTransaction>
          {lastTransaction}
        </LastTransaction>
      </CardContent>
    </CardContainer>
  );
}

export default HighlightCard;