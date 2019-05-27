import React from "react"
import styled from "styled-components"

const Container = styled.div``

const Icon = styled.img`
  position: absolute;
  top: 150px;
  right: 90px;
  width: 70px;

  @media (max-width: 380px) {
  }
`

function DeveloperTools() {
  const hostname = new URL(document.location.href).hostname
  const linkToTerminal = `http://${hostname}:3001/wetty`

  return (
    <Container>
      <a target="_blank" href={linkToTerminal}>
        <Icon src="terminal-icon.png" />
      </a>
    </Container>
  )
}

export default DeveloperTools
