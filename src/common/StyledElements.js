import styled from 'styled-components/macro'

export const FormStyled = styled.form`
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 40px;
`

export const InputStyled = styled.input`
  border-style: solid;
  border-color: var(--iceBlue);
  width: 84vw;
  height: 30px;
  padding: 0 5px;

  :focus {
    border-color: var(--plantGreen);
  }
`

export const ButtonStyled = styled.button`
  justify-self: center;
  width: 150px;
  height: 50px;
  background-color: var(--iceBlue);
  border: none;
`

//Das folgende Element ist zum Erzeugen eines Abstands zur Unterkante,
//wenn man ganz nach unten scrollt.
//Gibt es eine bessere Lösung?
export const Cushion = styled.div`
  height: 40px;
`

export const GridContainer = styled.div`
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 20px;
  justify-items: center;
`

export const LoadingMessageStyled = styled.div``

export const BackButtonStyled = styled.button`
  text-decoration: underline;
  color: var(--iceBlue);
  background: none;
  border: none;
  height: 30px;
  width: 100px;
`
