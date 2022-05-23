import {
  Container,
  Fields,
  Form,
  Header,
  Title,
  TransactionsType
} from './styles';
import React, { useState } from 'react';

import Button from '../../components/Form/Button';
import CategorySelect from '../../components/Form/CategorySelect';
import Input from '../../components/Form/Input';
import TransactionTypeButton from '../../components/Form/TransactionTypeButton';
import { useTheme } from 'styled-components';

const Register: React.FC = () => {
  const { colors} = useTheme();
  const [transactionType, setTransactionType] = useState('');
  
  const handleTransactionTypeSelect = (type: 'up' | 'down') => {
    setTransactionType(type);
  };

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder='Name' placeholderTextColor={colors.text} />
          <Input placeholder='Price' placeholderTextColor={colors.text} />
          <TransactionsType>
            <TransactionTypeButton 
              type='up' 
              title='Income' 
              isActive={transactionType === 'up'}
              onPress={() => handleTransactionTypeSelect('up')}
              />
            <TransactionTypeButton 
              type='down' 
              title='Outcome' 
              isActive={transactionType === 'down'}
              onPress={() => handleTransactionTypeSelect('down')}
            />
          </TransactionsType>
          <CategorySelect category='Category' />
        </Fields>
        <Button title='Send' />
      </Form>
      
    </Container>
  );
}

export default Register;