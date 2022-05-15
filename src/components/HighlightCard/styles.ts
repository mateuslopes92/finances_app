import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const CardContainer = styled.View`
  background-color: ${({theme}) => theme.colors.shape};
  width: ${RFValue(300)}px;
  border-radius: 5px;
  padding: 19px 23px;
  padding-bottom: ${RFValue(42)}px;
  margin-right: 16px;
`;

export const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const CardTitle = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.text_dark};
`;

export const CardIcon = styled(Feather)`
  font-size: ${RFValue(40)}px;
`;

export const CardContent = styled.View`

`;

export const Amount = styled.Text`
  font-family: ${({theme}) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;
  color: ${({theme}) => theme.colors.text_dark};
  margin-top: 38px;
`;

export const LastTransaction = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${({theme}) => theme.fonts.regular};
  color: ${({theme}) => theme.colors.text};
`;

