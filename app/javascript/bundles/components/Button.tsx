import styled from "styled-components"

const Button = styled.button`
  width: 200px;
  padding: 10px;

  border: 2px solid;
  border-radius: 2px;
  background-color: ${props => props.theme.colors.main};
  border-color: ${props => props.theme.colors.mainAlt};
  color: ${props => props.theme.colors.mainAlt};

  transition: background-color, border-color, color 0.2s;

  &:hover(not[disabled]) {
    background-color: ${props => props.theme.colors.mainAlt};
    border-color: ${props => props.theme.colors.main};
    color: ${props => props.theme.colors.main};
  }

  &[disabled] {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export default Button
