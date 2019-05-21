import styled from "styled-components"

export const Button = styled.button`
  min-width: 200px;
  font-weight: bold;
  padding: 10px;

  border: 2px solid;
  border-radius: 2px;
  background-color: ${props => props.theme.colors.main};
  border-color: ${props => props.theme.colors.mainAlt};
  color: ${props => props.theme.colors.mainAlt};

  transition: color, border-color, background-color 0.2s;

  :hover {
    background-color: ${props => props.theme.colors.mainAlt};
    border-color: ${props => props.theme.colors.main};
    color: ${props => props.theme.colors.main};
  }
`
