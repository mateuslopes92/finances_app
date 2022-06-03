import {
  Container,
  Header,
  HighlightCards,
  LogoffIcon,
  LogoutButton,
  Photo,
  TransactionList,
  Transactions,
  TransactionsTitle,
  User,
  UserGreeting,
  UserInfo,
  UserName,
  UserWrapper
} from './styles';
import React, { useCallback, useEffect, useState } from 'react';
import TransactionCard, { TransactionCardDataProps } from '../../components/TransactionCard';

import AsyncStorage from '@react-native-async-storage/async-storage';
import HighlightCard from '../../components/HighlightCard';
import { useFocusEffect } from '@react-navigation/native';

export interface DataListProps extends TransactionCardDataProps {
  id: string
}

interface Highli

// interface HighLightData {
//   entries: {
//     amount: string;
//   },
//   expensives: {
//     amount: string;
//   }
//   entries: {
//     amount: string;
//   }
// }

const DATA_KEY = '@financesapp:transactions';

const Dashboard: React.FC = () => {
  const [ transactions, setTransactions ] = useState<DataListProps[]>([]);
  const [ highlightData, setHighlightData ] = useState();
  let entriesSum = 0;
  let expensiveTotal = 0;

  const loadTransaction = async () => {
    const response = await AsyncStorage.getItem(DATA_KEY);
    const transactions = response ? JSON.parse(response) : [];

    const transactionsFormated: DataListProps[] = transactions.map((item: DataListProps) => {
      if(item.type === 'positive'){
        entriesSum += Number(item.price);
      } else {
        entriesSum -= Number(item.price);
      }

      const price = Number(item.price).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      });

      const date = Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).format(new Date(item.date));
      console.log(item)

      return {
        ...item,
        price,
        date
      }
    });

    setTransactions(transactionsFormated);
  };

  useEffect(() => {
    loadTransaction();
  }, []);

  useFocusEffect(useCallback(() => {
    loadTransaction();
  },[]));

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/43526801?v=4' }} />
            <User>
              <UserGreeting>Hello, </UserGreeting>
              <UserName>Mateus</UserName>
            </User>
          </UserInfo>

          <LogoutButton onPress={() => {}}>
            <LogoffIcon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          title="Income"
          amount="$10.000"
          lastTransaction="Last incomming at day 15 of may"
          type="positive"
        />
        <HighlightCard
          title="Outcome"
          amount="$5.000"
          lastTransaction="Last outcome at day 5 of may"
          type="negative"
        />
        <HighlightCard
          title="Total"
          amount={String(entriesSum)}
          lastTransaction="01 to 16 of may"
          type="total"
        />
      </HighlightCards>

      <Transactions>
        <TransactionsTitle>List of transactions</TransactionsTitle>
        <TransactionList<any>
          data={transactions}
          keyExtractor={(item: DataListProps) => item.id}
          renderItem={({ item }: {item: TransactionCardDataProps}) => (
            <TransactionCard
              data={item}
            />
          )}
        />
      </Transactions>
    </Container>
  )
};

export default Dashboard
