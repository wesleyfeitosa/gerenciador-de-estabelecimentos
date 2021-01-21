import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
  widthInput?: number | null;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  border-bottom: 1px solid var(--gray-light);
  color: var(--gray-dark);
  margin-top: 5px;

  display: flex;
  align-items: center;

  ${(props) =>
    props.widthInput &&
    css`
      width: ${props.widthInput}px;
    `}

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
      color: #c53030;
    `}

  ${(props) =>
    props.isFilled &&
    !props.isErrored &&
    css`
      color: var(--quinary);
      border-color: var(--quinary);
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: var(--quinary);
      border-color: var(--quinary);
    `}

  input {
    line-height: 24px;
    background: transparent;
    flex: 1;
    border: 0;
    font-size: 16px;
    padding: 5px 0;

    &::placeholder {
      color: var(--gray);
      font-size: 15px;
    }
  }

  svg {
    margin-right: 10px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }

  span {
    background-color: var(--error);
    color: var(--back-color);

    &::before {
      border-color: var(--error) transparent;
    }
  }
`;
