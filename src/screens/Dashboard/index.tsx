import {
  Container,
  Header,
  HighlightCards,
  LoadingContainer,
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

import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HighlightCard from '../../components/HighlightCard';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';

export interface DataListProps extends TransactionCardDataProps {
  id: string
}

interface HighlightProps {
  amount: string
}

interface HighLightData {
  entries: HighlightProps,
  expensives: HighlightProps,
  total: HighlightProps
}

const DATA_KEY = '@financesapp:transactions';

const Dashboard: React.FC = () => {
  const [ loading, setLoading ] = useState(false);
  const [ transactions, setTransactions ] = useState<DataListProps[]>([]);
  const [ highlightData, setHighlightData ] = useState<HighLightData>({} as HighLightData);
  const theme = useTheme();

  const loadTransaction = async () => {
    setLoading(true);
    const response = await AsyncStorage.getItem(DATA_KEY);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormated: DataListProps[] = transactions.map((item: DataListProps) => {
      if(item.type === 'positive'){
        entriesTotal += Number(item.price);
      } else {
        expensiveTotal -= Number(item.price);
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

      return {
        ...item,
        price,
        date
      }
    });

    setTransactions(transactionsFormated);

    const total = entriesTotal + expensiveTotal;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('en-US',{
          style: 'currency',
          currency: 'USD'
        })
      },
      expensives: {
        amount: expensiveTotal.toLocaleString('en-US',{
          style: 'currency',
          currency: 'USD'
        })
      },
      total: {
        amount: total.toLocaleString('en-US',{
          style: 'currency',
          currency: 'USD'
        })
      }
    });

    setLoading(false);
  };

  useEffect(() => {
    loadTransaction();
  }, []);

  useFocusEffect(useCallback(() => {
    loadTransaction();
  },[]));

  return (
    <Container>
      {
        loading ? (
          <LoadingContainer>
            <ActivityIndicator color={theme.colors.secondary} size='large' />
          </LoadingContainer>
        ) : (
          <>
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
                amount={highlightData?.entries?.amount}
                lastTransaction="Last incomming at day 15 of may"
                type="positive"
              />
              <HighlightCard
                title="Outcome"
                amount={highlightData?.expensives?.amount}
                lastTransaction="Last outcome at day 5 of may"
                type="negative"
              />
              <HighlightCard
                title="Total"
                amount={highlightData?.total?.amount}
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
          </>
        )
      }
    </Container>
  )
};

export default Dashboard
