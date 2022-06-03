import {
  Container,
  Icon,
  Title
} from './styles';

import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

const icon = {
  positive: 'arrow-up-circle',
  negative: 'arrow-down-circle'
}

interface TransactionTypeButton extends RectButtonProps {
  title: string,
  type: 'positive' | 'negative',
  isActive: boolean
}

const TransactionTypeButton: React.FC<TransactionTypeButton> = ({ title, type, isActive, ...props }) => {
  return (
    <Container {...props} type={type} isActive={isActive}>
      <Icon
        name={icon[type]}
        type={type}
      />
      <Title>{title}</Title>
    </Container>
  );
}

export default TransactionTypeButton;