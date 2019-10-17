import styled from 'styled-components/macro'

export const FormStyled = styled.form`
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 50px;
  padding: 50px 30px;
  overflow: auto;
`

export const ButtonStyled = styled.button`
  justify-self: center;
  width: 150px;
  height: 50px;
  background-color: #c2d4d8;
  border: none;
`

//Das folgende Element ist zum Erzeugen eines Abstands zur Unterkante,
//wenn man ganz nach unten scrollt.
//Gibt es eine bessere Lösung?
export const Cushion = styled.div`
  height: 40px;
`

export const LoadingMessageStyled = styled.div``
