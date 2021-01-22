import styled, { css } from 'styled-components/native';
import { s, vs } from 'react-native-size-matters';
import { rp } from '../../utils';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
  isFilled: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: ${vs(40)}px;
  color: #222222;
  font-size: ${s(16)}px;
  margin-top: ${vs(5)}px;
  margin-bottom: ${vs(5)}px;
  border-bottom-width: 1px;
  border-bottom-color: #a1a1a150;

  ${props =>
    props.isFilled &&
    css`
      border-bottom-color: #a1a1a150;
    `}

  ${props =>
    props.isErrored &&
    css`
      border-bottom-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-bottom-color: #00bfa6;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #222222;
  font-size: ${rp(s(14), 20)}px;
  font-family: 'RobotoRegular';
`;
