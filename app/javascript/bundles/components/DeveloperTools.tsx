import React from "react"
import styled from "styled-components"

const Icon = styled.img`
  position: absolute;
  top: 70px;
  right: 90px;
  width: 70px;
`

export function DeveloperTools() {
  const hostname = new URL(document.location.href).hostname
  const linkToTerminal = `http://${hostname}:3001/wetty`

  return (
    <a target="_blank" href={linkToTerminal}>
      <Icon src="terminal-icon.png" />
    </a>
  )
}
