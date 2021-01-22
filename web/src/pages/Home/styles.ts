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

export const EstablishmentTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px;
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
