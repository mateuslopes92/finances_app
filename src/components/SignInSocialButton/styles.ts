import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Button = styled(RectButton)`
  background-color: ${({ theme }) => theme.colors.shape};
  height: ${RFValue(56)}px;
  border-radius: 5px;
  align-items: center;
  flex-direction: row;
  margin-bottom: 16px;
`;

export const ImageContainer = styled.View`
  height: 100%;
  padding: ${RFValue(16)}px;
  justify-content: center;
  align-items: center;
  border-color: ${({ theme }) => theme.colors.background};
  border-right-width: 1.5px;
`;

export const Title = styled.Text`
  flex: 1;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
`;
