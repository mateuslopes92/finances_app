import {
  ChartContainer,
  Container,
  Content,
  Header,
  Title
} from './styles';
import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataListProps } from '../Dashboard';
import HistoryCard from '../../components/HistoryCard';
import { RFValue } from 'react-native-responsive-fontsize';
import { TransactionCardDataProps } from '../../components/TransactionCard/index';
import { VictoryPie } from 'victory-native';
import { categories } from '../../utils/categories';
import { useTheme } from 'styled-components';

interface TotalByCategoryProps {
  key: string,
  name: string,
  total: number,
  totalFormatted: string,
  color: string,
  percent: string;
}

const DATA_KEY = '@financesapp:transactions';

const Summary: React.FC = () => {
  const theme = useTheme();
  const [data, setData] = useState<TotalByCategoryProps[]>([]);

  const loadData = async () => {
    const response = await AsyncStorage.getItem(DATA_KEY);
    const responseParsed = response ? JSON.parse(response) : [];

    const expensives = responseParsed
      .filter((expensive: DataListProps) => expensive.type === 'negative')

    const expensiveTotal = expensives
      .reduce((acc: number, expensive: TransactionCardDataProps) => {
          return acc + Number(expensive.price);
    }, 0);

    const totalByCategory: TotalByCategoryProps[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach((expensive: DataListProps) => {
        if(expensive.category === category.key) {
          categorySum += Number(expensive.price)
        }
      })

      if(categorySum > 0){
        const totalFormatted = categorySum.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        });

        const total = categorySum;

        const percent = `${(categorySum / expensiveTotal * 100).toFixed(0)}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          total,
          totalFormatted,
          color: category.color,
          percent
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

      <ChartContainer>
        <VictoryPie
          data={data}
          colorScale={data.map(category => category.color)}
          style={{
            labels: {
              fontSize: RFValue(18),
              fontWeight: 'bold',
              fill: theme.colors.shape
            }
          }}
          labelRadius={100}
          x='percent'
          y='total'
        />
      </ChartContainer>

      <Content>
        {
          data.map(item =>
            <HistoryCard
              key={item.key}
              title={item.name}
              price={String(item.totalFormatted)}
              color={item.color}
            />
          )
        }
      </Content>

    </Container>
  )
}

export default Summary;