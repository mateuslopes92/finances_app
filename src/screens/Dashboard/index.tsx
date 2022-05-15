import {
  Header,
  HighlightCards,
  LogoffIcon,
  Photo,
  User,
  UserGreeting,
  UserInfo,
  UserName,
  UserWrapper
} from './styles';

import Container from '../../components/Container';
import HighlightCard from '../../components/HighlightCard';
import React from 'react';

const Dashboard: React.FC = () => {
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
    </Container>
  )
};

export default Dashboard
