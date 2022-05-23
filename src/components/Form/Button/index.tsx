import {
  Container,
  Title
} from './styles';

import React from 'react';
import { TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string
}

const Button: React.FC<ButtonProps> = ({ title }) => {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
}

export default Button;