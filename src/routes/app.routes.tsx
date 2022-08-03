import Balance from '../screens/Balance/index';
import Dashboard from '../screens/Dashboard';
import { MaterialIcons } from '@expo/vector-icons'
import { Platform } from 'react-native';
import React from 'react';
import Register from '../screens/Register/index';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';

const { Navigator, Screen } = createBottomTabNavigator();

const AppRoutes: React.FC = () => {
  const { colors } = useTheme();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
          height: 88,
          paddingVertical: Platform.OS === 'ios' ? 10 : 0
        }
      }}
    >
      <Screen
        name='List'
        component={Dashboard}
        options={{
          tabBarIcon: (({ size, color }) =>
            <MaterialIcons
              name='format-list-bulleted'
              color={color}
              size={size}
            />
          )
        }}
      />
      <Screen
        name='Register'
        component={Register}
        options={{
          tabBarIcon: (({ size, color }) =>
            <MaterialIcons
              name='attach-money'
              color={color}
              size={size}
            />
          )
        }}
      />
      <Screen
        name='Balance'
        component={Balance}
        options={{
          tabBarIcon: (({ size, color }) =>
            <MaterialIcons
              name='pie-chart'
              color={color}
              size={size}
            />
          )
        }}
      />
    </Navigator>
  );
}

export default AppRoutes;