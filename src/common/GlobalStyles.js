import { createGlobalStyle } from 'styled-components/macro'

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  :root{
    --iceBlue: #c2d4d8;
    --skyBlue: #418ab3;
    --anorakRed: #c8232a;
    --plantGreen: #849237;
  }

  body {
    margin: 0;
    font-family: 'Chalkboard', 'Helvetica', sans-serif;
    font-size: 16px;
  }

  input, button, textarea {
    font-family: 'Chalkboard', 'Helvetica', sans-serif;
    font-size: 1em;
  }
`
