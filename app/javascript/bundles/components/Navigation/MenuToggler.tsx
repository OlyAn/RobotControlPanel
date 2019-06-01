import React from "react"
import styled from "styled-components"

const Icon = styled.span<{ opened: boolean }>`
  ::before,
  ::after {
    width: 20px;
    height: 1.5px;
    position: absolute;
    background-color: white;
    transition: transform 0.15s ease;
  }

  ::before,
  ::after {
    content: "";
    display: block;
  }

  ::before {
    top: ${props => (props.opened ? "7px" : "0px")};
    transform: rotate(${props => (props.opened ? "45deg" : "0")});
  }

  ::after {
    bottom: 0px;
    transform: rotate(${props => (props.opened ? "-45deg" : "0")});
  }
`

const Button = styled.div`
  position: absolute;
  top: 35px;
  left: 30px;
  width: 15px;
  height: 8px;
  cursor: pointer;
`

interface Props {
  opened: boolean
  onClick: () => void
}

/* Displays as a hamburger if the menu is closed, else as a ✕ */
export const MenuToggler = (props: Props) => {
  return (
    <Button onClick={props.onClick}>
      <Icon opened={props.opened} />
    </Button>
  )
}
