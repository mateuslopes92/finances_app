import {
  ChartContainer,
  Container,
  Content,
  Header,
  LoadingContainer,
  Month,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Title
} from './styles';
import React, { useCallback, useEffect, useState } from 'react';
import { addMonths, format, subMonths } from 'date-fns';

import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataListProps } from '../Dashboard';
import HistoryCard from '../../components/HistoryCard';
import { RFValue } from 'react-native-responsive-fontsize';
import { TransactionCardDataProps } from '../../components/TransactionCard/index';
import { VictoryPie } from 'victory-native';
import { categories } from '../../utils/categories';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
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
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [data, setData] = useState<TotalByCategoryProps[]>([]);

  const handleDateChange = async (action: 'next' | 'prev') => {
    if (action === 'next'){
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  };

  const loadData = async () => {
    setIsLoading(true);
    const response = await AsyncStorage.getItem(DATA_KEY);
    const responseParsed = response ? JSON.parse(response) : [];

    const expensives = responseParsed
      .filter((expensive: DataListProps) =>
        expensive.type === 'negative' &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
      )

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
    setIsLoading(false);
  };

  useFocusEffect(useCallback(() => {
    loadData();
  },[selectedDate]));

  return (
    <Container>

      <Header>
        <Title>Summary by categories</Title>
      </Header>

      {isLoading ? (
        <LoadingContainer>
          <ActivityIndicator color={theme.colors.secondary} size='large' />
        </LoadingContainer>
      ) : (
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: useBottomTabBarHeight(),
          }}
        >

          <MonthSelect>
            <MonthSelectButton onPress={() => handleDateChange('prev')}>
              <MonthSelectIcon name="chevron-left" />
            </MonthSelectButton>

            <Month>
              {format(selectedDate, ' MMMM, yyyy')}
            </Month>

            <MonthSelectButton onPress={() => handleDateChange('next')}>
              <MonthSelectIcon name="chevron-right" />
            </MonthSelectButton>
          </MonthSelect>

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
              labelRadius={95}
              x='percent'
              y='total'
            />
          </ChartContainer>

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
      )}
    </Container>
  )
}

export default Summary;