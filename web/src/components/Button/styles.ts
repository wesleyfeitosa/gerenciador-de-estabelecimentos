import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  width: 400px;
  padding: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  border-radius: 30px;
  background-color: #00bfa6;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  transition: background-color 400ms;

  &:hover {
    background-color: ${shade(0.2, '#00BFA6')};
  }
`;

export const ButtonText = styled.div`
  font-size: 18px;
  font-weight: 700;
  padding: 20px;
  color: #fff;
`;
