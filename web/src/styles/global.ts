import { createGlobalStyle } from 'styled-components';

import 'react-circular-progressbar/dist/styles.css';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    background-color: var(--back-color);
    -webkit-font-smoothing: antialiased;
  }

  *, button, input, select {
    font-family: 'Roboto', sans-serif;
  }

  button {
    cursor: pointer;
  }

  :root {
    --back-color: #ffffff;
    --primary: #CAEBF2;
    --gray: #999999;
    --gray-super-light: #e8e8e8;
    --gray-light: #d9d9d9;
    --gray-dark: #474747;
    --tertiary: #3CC47C;
    --quaternary: #292b2f;
    --quinary: #4cbd35;
    --senary: #00500f;
    --error: #c53030;
    --late: #FFF1B4;
    --late-hover: #FFE678;
    --is-time: #C0FFBB;
    --is-time-hover: #99FF90;
    --is-open: #C09600;
  }
`;
