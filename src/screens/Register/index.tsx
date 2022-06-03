import * as Yup from 'yup';

import {
  Alert,
  Keyboard,
  Modal,
  TouchableWithoutFeedback
} from 'react-native';
import {
  Container,
  Fields,
  Form,
  Header,
  Title,
  TransactionsType
} from './styles';
import React, { useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../components/Form/Button';
import CategorySelect from '../CategorySelect';
import CategorySelectButton from '../../components/Form/CategorySelectButton';
import InputForm from '../../components/Form/InputForm';
import TransactionTypeButton from '../../components/Form/TransactionTypeButton';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import uuid from 'react-native-uuid';
import { yupResolver } from '@hookform/resolvers/yup';

interface FormData {
  name: string,
  price: string
}

const schema = Yup.object().shape({
  name: Yup
    .string()
    .required('Name is required'),
  price: Yup.
    number()
    .typeError('Please input a numeric value')
    .positive('The value cannot be negative')
    .required('The price is required')
})

const DATA_KEY = '@financesapp:transactions';

const Register: React.FC = () => {
  const { colors} = useTheme();
  const navigation = useNavigation();
  const [transactionType, setTransactionType] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Category'
  });
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });


  const handleTransactionTypeSelect = (type: 'positive' | 'negative') => {
    setTransactionType(type);
  };

  const handleOpenSelectModalCategory = () => {
    setModalOpen(true);
  }

  const handleCloseSelectModalCategory = () => {
    setModalOpen(false);
  }

  const handleRegister = async (data: FormData) => {
    if(!transactionType){
      return Alert.alert('Select the type of transaction');
    }
    if(category.key === 'category'){
      return Alert.alert('Select the category');
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: data.name,
      price: data.price,
      category: category.key,
      type: transactionType,
      date: new Date()
    };

    try {
      const dataStored = await AsyncStorage.getItem(DATA_KEY);
      const dataStoredParsed = dataStored ? JSON.parse(dataStored) : [];

      const dataList = [
        ...dataStoredParsed,
        newTransaction
      ];

      await AsyncStorage.setItem(DATA_KEY, JSON.stringify(dataList));

      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'Category'
      });
      reset();

      navigation.navigate('List');

    } catch (error) {
      console.log(error);
      Alert.alert('An error occurred saving the entry')
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name='name'
              control={control}
              placeholder='Name'
              placeholderTextColor={colors.text}
              autoCapitalize='sentences'
              autoCorrect={false}
              error={errors.name && errors.name.message}
              />
            <InputForm
              name='price'
              control={control}
              placeholder='Price'
              placeholderTextColor={colors.text}
              keyboardType='numeric'
              error={errors.price && errors.price.message}
            />
            <TransactionsType>
              <TransactionTypeButton
                type='positive'
                title='Income'
                isActive={transactionType === 'positive'}
                onPress={() => handleTransactionTypeSelect('positive')}
                />
              <TransactionTypeButton
                type='negative'
                title='Outcome'
                isActive={transactionType === 'negative'}
                onPress={() => handleTransactionTypeSelect('negative')}
              />
            </TransactionsType>
            <CategorySelectButton
              category={category.name}
              onPress={handleOpenSelectModalCategory}
            />
          </Fields>
          <Button title='Send' onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal visible={modalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectModalCategory}
          />
        </Modal>

      </Container>
    </TouchableWithoutFeedback>
  );
}

export default Register;