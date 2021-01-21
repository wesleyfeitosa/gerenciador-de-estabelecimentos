import styled from 'styled-components';
import { Link } from 'react-router-dom';

import signUpBackgroundImg from '../../assets/signup-image.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  width: 50vw;
  height: 100vh;
  padding: 180px;

  display: flex;
  align-items: center;
  justify-content: flex-end;
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

export const ToSignInContainer = styled.div`
  margin-top: 16px;
`;

export const ToSignInText = styled.span``;

export const LinkToSignIn = styled(Link)``;

export const Background = styled.div`
  flex: 1;
  background: url(${signUpBackgroundImg}) no-repeat center;
  background-size: 90%;
  background-position: -20%;
`;
