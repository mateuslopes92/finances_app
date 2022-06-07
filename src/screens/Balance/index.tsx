import {
  Container,
  Content,
  Header,
  Title
} from './styles';
import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataListProps } from '../Dashboard';
import HistoryCard from '../../components/HistoryCard';
import { VictoryPie } from 'victory-native';
import { categories } from '../../utils/categories';

interface TotalByCategoryProps {
  key: string,
  name: string,
  total: string,
  color: string
}

const DATA_KEY = '@financesapp:transactions';

const Summary: React.FC = () => {
  const [data, setData] = useState<TotalByCategoryProps[]>([]);

  const loadData = async () => {
    const response = await AsyncStorage.getItem(DATA_KEY);
    const responseParsed = response ? JSON.parse(response) : [];

    const expensives = responseParsed
      .filter((expensive: DataListProps) => expensive.type === 'negative')

    const totalByCategory: TotalByCategoryProps[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach((expensive: DataListProps) => {
        if(expensive.category === category.key) {
          categorySum += Number(expensive.price)
        }
      })

      if(categorySum > 0){
        const total = categorySum.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        })

        totalByCategory.push({
          key: category.key,
          name: category.name,
          total,
          color: category.color
        })
      }
    });

    setData(totalByCategory);
  };

  useEffect(() => {
    loadData();
  },[]);

  return (
    <Container>
      <Header>
        <Title>Summary by categories</Title>
      </Header>

      <VictoryPie
        data={data}
        x='name'
        y='total'
      />

      <Content>
        {
          data.map(item =>
            <HistoryCard
              key={item.key}
              title={item.name}
              price={String(item.total)}
              color={item.color}
            />
          )
        }
      </Content>

    </Container>
  )
}

export default Summary;