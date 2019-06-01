import React from "react"
import styled, { keyframes } from "styled-components"
import { Link } from "../Link"
import { User } from "../../App"

const SlideInFromRight = keyframes`
  from { transition: transformX(-100%); } to { transition: transform(0); }
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;

  padding-top: 100px;
  padding-bottom: 40px;

  position: fixed;
  top: 80px;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: ${props => props.theme.colors.main};
  font-size: 32px;
  animation: ${SlideInFromRight} 0.2s ease-in-out;
  z-index: 9;

  * {
    margin-bottom: 15px;
  }
`

interface Props {
  user: User
}
export const MobileNav: React.SFC<Props> = props => (
  <Container>
    {props.user ? (
      <>
        <Link to="/my-robots">Мои роботы</Link>
        <Link to="/control-panel">Панель управления</Link>
        <Link to="/account">Аккаунт</Link>
        <a href="/users/sign_out">Выйти</a>
      </>
    ) : (
      <Link to="/sign-up">Зарегистрироваться</Link>
    )}
  </Container>
)
