import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  background-color: #00bfa6;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  max-width: 1300px;
  width: 90vw;

  div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

export const HeaderOption = styled.nav`
  font-size: 18px;
  font-weight: 700;
  padding: 20px;
  color: #fff;
  cursor: pointer;
`;

export const HeaderLink = styled(Link)`
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  text-decoration: none;
`;
