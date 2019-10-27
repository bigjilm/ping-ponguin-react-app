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

    /* desktop styles */
    @media (min-width: 900px) {
      width: 375px;
      height: 667px;
      border: 30px solid black;
      border-width: 60px 20px;
      border-radius: 20px;
      box-shadow: 30px 40px 30px #2264;
      margin: 40px auto;
    }
  }

  input, button, textarea {
    font-family: 'Chalkboard', 'Helvetica', sans-serif;
    font-size: 1em;
  }
`
