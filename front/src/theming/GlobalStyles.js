import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.background.primary};
    color: ${({ theme }) => theme.text.primary};
    font-family: ${({ theme }) => theme.global.font.family};
  }

  a {
    color: ${({ theme }) => theme.link.unvisited};
    cursor: ${({ theme }) => theme.global.link.cursor};
  }

  button {
    margin: ${({ theme }) => theme.global.space.margin.m};
    outline: none;
    border: 0;
    background-color: ${({ theme }) => theme.button.inactive};
    background-repeat: no-repeat;
    cursor: ${({ theme }) => theme.global.button.cursor};
    color: ${({ theme }) => theme.text.primary};
  }

  span {
    color: ${({ theme }) => theme.text.primary};
  }
`;

export default GlobalStyles;
