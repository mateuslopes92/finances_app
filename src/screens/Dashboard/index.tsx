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
import { useAuth } from '../../hooks/Auth';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HighlightCard from '../../components/HighlightCard';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';

export interface DataListProps extends TransactionCardDataProps {
  id: string
}

interface HighlightProps {
  amount: string,
  lastTransaction: string
}

interface HighLightData {
  entries: HighlightProps,
  expensives: HighlightProps,
  total: HighlightProps
}

const DATA_KEY = '@financesapp:transactions_user';

const Dashboard: React.FC = () => {
  const [ loading, setLoading ] = useState(false);
  const [ transactions, setTransactions ] = useState<DataListProps[]>([]);
  const [ highlightData, setHighlightData ] = useState<HighLightData>({} as HighLightData);
  const { signOut, user } = useAuth();
  const theme = useTheme();

  const getLastTransactionDate = (
    collection: DataListProps[],
    type: 'positive' | 'negative'
    ) => {
    const collectionFilttered = collection.filter(transaction => transaction.type === type);

    if(collectionFilttered.length === 0)
      return 0;

    const lastTransaction = new Date(Math.max.apply(Math, collectionFilttered
      .map(transaction => new Date(transaction.date).getTime())));

    return `${lastTransaction.getDate()} of ${lastTransaction.toLocaleDateString('en-US', {
      month: 'short'
    })}`;
  }

  const loadTransaction = async () => {
    setLoading(true);
    const response = await AsyncStorage.getItem(`${DATA_KEY}:${user.id}`);
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

    const lastTransactionEntries = getLastTransactionDate(transactions, 'positive');

    const lastTransactionExpensives = getLastTransactionDate(transactions, 'negative');

    const totalInterval = lastTransactionExpensives
      ? `1 to ${lastTransactionExpensives}`
      : `No transactions`

    const total = entriesTotal + expensiveTotal;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('en-US',{
          style: 'currency',
          currency: 'USD'
        }),
        lastTransaction: lastTransactionEntries 
          ? `Last income day ${lastTransactionEntries}`
          : `No transactions`
      },
      expensives: {
        amount: expensiveTotal.toLocaleString('en-US',{
          style: 'currency',
          currency: 'USD'
        }),
        lastTransaction: lastTransactionExpensives 
          ? `Last outcome day ${lastTransactionExpensives}`
          : `No transactions`
      },
      total: {
        amount: total.toLocaleString('en-US',{
          style: 'currency',
          currency: 'USD'
        }),
        lastTransaction: totalInterval
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
                  <Photo source={{ uri: user.photo }} />
                  <User>
                    <UserGreeting>Hello, </UserGreeting>
                    <UserName>{user?.name || ''}</UserName>
                  </User>
                </UserInfo>

                <LogoutButton onPress={signOut}>
                  <LogoffIcon name="power" />
                </LogoutButton>
              </UserWrapper>
            </Header>
            <HighlightCards>
              <HighlightCard
                title="Income`s"
                amount={highlightData?.entries?.amount}
                lastTransaction={highlightData?.entries?.lastTransaction}
                type="positive"
              />
              <HighlightCard
                title="Outcome`s"
                amount={highlightData?.expensives?.amount}
                lastTransaction={highlightData?.expensives?.lastTransaction}
                type="negative"
              />
              <HighlightCard
                title="Total"
                amount={highlightData?.total?.amount}
                lastTransaction={highlightData?.total?.lastTransaction}
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
