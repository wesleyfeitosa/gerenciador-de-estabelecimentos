import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const Content = styled.div`
  flex: 1;
  max-width: 1300px;
  width: 90vw;
`;

export const FormContainer = styled.div`
  margin: 20px;

  form {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const InputsContainer = styled.div`
  width: 48%;
`;

export const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 33px 0;
`;

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  align-self: center;

  img {
    width: 190px;
    height: 190px;
    border-radius: 50%;
    background-color: #d9d9d9;
    border: 0.7px solid #00bfa6;
  }

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    background: #00bfa6;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    border: 0;
    cursor: pointer;
    transition: background-color 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;

    input {
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;
      color: #ffffff;
    }

    &:hover {
      background: ${shade(0.2, '#00bfa6')};
    }
  }
`;

export const TitlePage = styled.h3`
  margin-top: 24px;
  color: #222222;
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

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 90px;
`;
