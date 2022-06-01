import {
  Container,
  Title
} from './styles';

import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

interface ButtonProps extends RectButtonProps {
  title: string
}

const Button: React.FC<ButtonProps> = ({ title, ...props }) => {
  return (
    <Container {...props}>
      <Title>{title}</Title>
    </Container>
  );
}

export default Button;