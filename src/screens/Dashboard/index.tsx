import {
  Header,
  HighlightCards,
  LogoffIcon,
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
import TransactionCard, { TransactionCardProps } from '../../components/TransactionCard';

import Container from '../../components/Container';
import HighlightCard from '../../components/HighlightCard';
import React from 'react';
import { getBottomSpace } from 'react-native-iphone-x-helper';

const Dashboard: React.FC = () => {
  const data = [
    {
      type: 'positive',
      title: "App feature development",
      amount: "$10,000",
      category: {
        name: 'Jobs',
        icon: 'dollar-sign'
      },
      date: "10/05/2022"
    },
    {
      type: 'negative',
      title: "Lunch",
      amount: "$300",
      category: {
        name: 'Food',
        icon: 'dollar-sign'
      },
      date: "10/05/2022"
    },
    {
      type: 'negative',
      title: "Rent",
      amount: "$1,000",
      category: {
        name: 'Home',
        icon: 'dollar-sign'
      },
      date: "10/05/2022"
    },
  ];

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
          
          <LogoffIcon name="power" />
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard 
          title="Income" 
          amount="$10.000" 
          lastTransaction="Last incomming at day 15 of may"
          type="up"
        />
        <HighlightCard 
          title="Outcome" 
          amount="$5.000" 
          lastTransaction="Last outcome at day 5 of may"
          type="down"
        />
        <HighlightCard 
          title="Total" 
          amount="$5.000" 
          lastTransaction="01 to 16 of may"
          type="total"
        />
      </HighlightCards>

      <Transactions>
        <TransactionsTitle>List of transactions</TransactionsTitle>
        <TransactionList
          data={data}
          renderItem={({ item }) => (
            <TransactionCard
              data={item}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: getBottomSpace()
          }}
        />
      </Transactions>
    </Container>
  )
};

export default Dashboard
