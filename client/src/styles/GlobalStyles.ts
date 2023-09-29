import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    border: 0;
    box-sizing: border-box;
    font-family: ${({ theme }) => theme.fonts.family.avenirRoman};
  }

  body {
    background-color: ${({ theme }) => theme.colors.secondary.sky};
  }
`

export default GlobalStyles
