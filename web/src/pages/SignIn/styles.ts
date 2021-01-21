import styled from 'styled-components';
import { Link } from 'react-router-dom';

import signInBackgroundImg from '../../assets/signin-image.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  width: 50vw;
  height: 100vh;
  padding-left: 180px;

  display: flex;
  align-items: center;
`;

export const FormContainer = styled.div`
  max-width: 400px;
`;

export const Title = styled.div`
  margin-top: 30px;
  margin-bottom: 60px;
  color: var(--quaternary);
  font-size: 1.8em;
  font-weight: 700;
  align-self: center;
`;

export const InputField = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px 0;
  text-align: start;

  > span {
    color: var(--gray-dark);
    font-weight: 700;
  }
`;

export const ToSignUpContainer = styled.div`
  margin-top: 16px;
`;

export const ToSignUpText = styled.span``;

export const LinkToSignUp = styled(Link)``;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: 90%;
  background-position: 90%;
`;
