import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { s, vs } from 'react-native-size-matters';
import { rp } from '../../utils';

export const Container = styled(RectButton)`
  width: 100%;
  height: ${vs(48)}px;
  border-radius: ${s(30)}px;
  background-color: #00bfa6;
  padding: ${vs(12)}px ${s(5)}px;
  margin: ${vs(12)}px 0;

  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-family: 'RobotoRegular';
  color: #ffffff;
  font-size: ${rp(s(16), 24)}px;
  font-weight: bold;
  text-align: center;
`;
