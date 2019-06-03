import { Link as BaseLink } from "react-router-dom"
import styled from "styled-components"

export const Link = styled(BaseLink)`
  color: ${props => props.theme.colors.mainAlt};
  :hover {
    color: white;
  }
`
