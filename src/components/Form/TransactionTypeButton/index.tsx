import {
  Container,
  Icon,
  Title
} from './styles';

import React from 'react';
import { TouchableOpacityProps } from 'react-native';

const icon = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle'
}

interface TransactionTypeButton extends TouchableOpacityProps {
  title: string,
  type: 'up' | 'down',
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