import React, { useState, useEffect } from "react"
import { withRouter, RouteComponentProps } from "react-router-dom"
import styled from "styled-components"

import { BrowserView, MobileView } from "../Hide"
import { Link } from "../Link"
import { MobileNav } from "./MobileNavigation"
import { MenuToggler } from "./MenuToggler"
import { User } from "../../App"

const Container = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
  height: 80px;

  padding-left: 70px;
  padding-right: 70px;
  background-color: ${props => props.theme.colors.main};

  a {
    padding-left: 10px;
  }

  @media (max-width: 948px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`

const Relative = styled.div<{ position: string }>`
  position: absolute;
  top: 30px;
  ${props => props.position};
`

const Logo = styled.img`
  height: 80px;
  width: 100%;
  svg {
    fill: red;
  }
`

interface Props {
  user: User
}
function Navigation(props: Props & RouteComponentProps) {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false)

  useEffect(
    () => {
      if (isMobileMenuOpened) {
        setIsMobileMenuOpened(false)
      }
    },
    [props.location]
  )

  return (
    <Container>
      <BrowserView>
        <Relative position="left: 50px">
          {props.user && (
            <>
              <Link to="/my-robots">Мои роботы</Link>
              <Link to="/control-panel">Панель управления</Link>
            </>
          )}
        </Relative>
        <Logo src="/logo.svg" />
        <Relative position="right: 50px">
          {props.user ? (
            <>
              <Link to="/account">Аккаунт</Link>
              <a href="/users/sign_out">Выйти</a>
            </>
          ) : (
            <Link to="/sign-up">Зарегистрироваться</Link>
          )}
        </Relative>
      </BrowserView>
      <MobileView>
        <MenuToggler
          onClick={() => setIsMobileMenuOpened(!isMobileMenuOpened)}
          opened={isMobileMenuOpened}
        />
        {isMobileMenuOpened && <MobileNav user={props.user} />}
      </MobileView>
    </Container>
  )
}

export default withRouter(Navigation)
