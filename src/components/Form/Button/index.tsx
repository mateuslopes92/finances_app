import {
  Container,
  Title
} from './styles';

import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

interface ButtonProps extends RectButtonProps {
  title: string,
  onPress: () => void
}

const Button: React.FC<ButtonProps> = ({ title, onPress, ...props }) => {
  return (
    <Container {...props} onPress={onPress}>
      <Title>{title}</Title>
    </Container>
  );
}

export default Button;