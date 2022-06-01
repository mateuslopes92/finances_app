import {
  Container,
  Error
} from './styles';
import { Control, Controller } from 'react-hook-form';

import Input from '../Input';
import React from 'react';
import { TextInputProps } from 'react-native';

interface InputFormProps extends TextInputProps {
  control: Control,
  name: string,
  error: string
}

const InputForm: React.FC<InputFormProps> = ({ control, name, error, ...props }) => {
  return (
    <Container>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            {...props}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
}

export default InputForm;