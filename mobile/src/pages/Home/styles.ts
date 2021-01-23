import { RectButton } from 'react-native-gesture-handler';
import { s, vs } from 'react-native-size-matters';
import styled from 'styled-components/native';
import { rp } from '../../utils';

export const Container = styled.View``;

export const HeaderContainer = styled.View`
  background-color: #00bfa6;
  padding: ${vs(20)}px ${s(24)}px;

  flex-direction: row;
  justify-content: space-between;
`;

export const HeaderTitle = styled.Text`
  color: #ffffff;
  font-size: ${rp(s(18), 24)}px;
  font-weight: bold;
`;

export const Content = styled.View``;

export const SearchContainer = styled.View`
  padding: 16px;
`;

export const SearchButtonContainer = styled.View`
  padding: 0 82px;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  padding: 16px;
  height: 90px;
`;

export const ButtonActions = styled(RectButton)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ButtonContent = styled.View`
  flex: 1;
  margin: 0 4px;
  border-width: 0.7px;
  border-color: #00bfa6;
  border-radius: 30px;
  overflow: hidden;
`;

export const ButtonActionsText = styled.Text`
  padding: 18px 20px;
  text-align: center;
`;

export const TableAdvice = styled.Text`
  font-size: 12px;
  margin: 0 16px;
  text-align: right;
`;
