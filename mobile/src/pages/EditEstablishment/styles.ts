import { vs, s } from 'react-native-size-matters';
import styled from 'styled-components/native';
import { rp } from '../../utils';

export const Container = styled.View``;

export const Header = styled.View`
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

export const Content = styled.View`
  max-width: 450px;
  padding: ${vs(24)}px ${s(16)}px;
  margin-bottom: 100px;

  flex: 1;
  justify-content: center;
`;

export const Title = styled.Text`
  color: #222222;
  margin-bottom: ${vs(36)}px;
  font-size: ${rp(s(16), 24)}px;
  font-weight: 400;
`;

export const TitleInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${vs(10)}px;
`;

export const TitleInputText = styled.Text`
  width: 100%;
  color: #222222;
  font-size: ${rp(s(13), 18)}px;
  font-weight: 400;
  margin-left: ${s(8)}px;
`;

export const EstablishmentAvatarButton = styled.TouchableOpacity``;

export const EstablishmentAvatar = styled.Image`
  width: 156px;
  height: 156px;
  border-radius: 98px;
  align-self: center;
`;
