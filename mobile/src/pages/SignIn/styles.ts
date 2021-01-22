import styled from 'styled-components/native';
import { s, vs } from 'react-native-size-matters';
import { rp } from '../../utils';

interface TextKeyboardProps {
  isKeyboardVisible: boolean;
}

export const Container = styled.View`
  flex: 1;
  padding: ${vs(16)}px ${s(8)}px 0px;
`;

export const Content = styled.View`
  max-width: 450px;
  padding: 0 ${s(16)}px;

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

export const ForgotPasswordText = styled.Text<TextKeyboardProps>`
  ${props => props.isKeyboardVisible && 'display: none'};
  align-self: center;
  color: #222222;
  font-size: ${rp(s(14), 18)}px;
  font-weight: 400;
  padding-top: ${vs(8)}px;
  padding-bottom: ${vs(58)}px;
`;

export const Loading = styled.ActivityIndicator.attrs(props => ({
  size: rp(s(20), 28),
  color: '#00bfa6',
}))`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  flex: 1;
  align-self: center;
`;

export const CreateAccountText = styled.Text`
  color: #0645ad;
  text-decoration: underline;
`;
