import { Container } from './styles';
import React from 'react';
import { TextInputProps } from 'react-native';

type InputProps = TextInputProps;

const Input: React.FC<InputProps> = (props) => {
  return (
    <Container {...props} />
  );
}

export default Input;