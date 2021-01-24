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

  @media (max-width: 700px) {
    width: 100%;
  }
`;

export const SearchContainer = styled.div`
  margin-top: 16px;

  display: flex;
  justify-content: flex-end;

  select {
    margin-right: 12px;
  }

  button {
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;
    border-radius: 30px;
    background-color: #00bfa6;
    color: #ffffff;
  }

  @media (max-width: 430px) {
    flex-direction: column;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;

    select {
      margin: 2px;
    }

    button {
      margin: 2px;
    }
  }
`;

export const EstablishmentTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;

  @media (max-width: 700px) {
    width: 200%;
  }
`;

export const TableHeaderLine = styled.tr`
  text-align: left;
  transition: 400ms;
  background-color: #00bfa630;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;

  th {
    padding: 8px;
    text-align: center;
  }
`;

export const TableLine = styled.tr`
  text-align: left;
  transition: 400ms;
  background-color: #00bfa610;
  border-bottom: 1px solid #d9d9d9;

  td {
    padding: 8px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }

  &:hover {
    background-color: #e8e8e8;
  }
`;
