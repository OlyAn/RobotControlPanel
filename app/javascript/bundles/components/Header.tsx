import React from "react"
import { Link as BaseLink } from "react-router-dom"
import styled from "styled-components"

const Container = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-left: 70px;
  padding-right: 70px;
  background-color: ${props => props.theme.colors.main};

  a {
    padding-left: 10px;
  }
`

const Link = styled(BaseLink)`
  color: ${props => props.theme.colors.mainAlt};

  :hover {
    color: ${props => props.theme.colors.outline};
  }
`

const Logo = styled.img`
  height: 80px;
  svg {
    fill: red;
  }
`

function Navigation() {
  return (
    <Container>
      <Link to="/my-robots">My Robots</Link>
      <Logo src="logo.svg" />
      <div>
        <Link to="/account">Account</Link>
        <Link to="/sign-out">Sign Out</Link>
      </div>
    </Container>
  )
}

export default Navigation
