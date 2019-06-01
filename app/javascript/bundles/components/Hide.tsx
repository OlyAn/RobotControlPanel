import React from "react"
import styled from "styled-components"
import { theme } from "../../styles/theme"

export const breakpoints: { [key: string]: string } = {
  sm: `@media screen and (max-width: ${theme.breakpoints.sm}px)`,
  md: `@media screen and (min-width: ${
    theme.breakpoints.sm
  }px) and (max-width: ${theme.breakpoints.md - 1}px)`,
  mdLg: `@media screen and (min-width: ${
    theme.breakpoints.md
  }px) and (max-width: ${theme.breakpoints.lg - 1}px)`,
  lg: `@media screen and (min-width: ${theme.breakpoints.lg + 1}px)`
}

export const hidden = (key: "lg" | "md" | "sm" | "mdLg") => (props: {
  sm?: boolean
  md?: boolean
  mdLg?: boolean
  lg?: boolean
}) =>
  props[key]
    ? {
        [breakpoints[key]]: {
          display: "none"
        }
      }
    : null

export const sm = hidden("sm")
export const md = hidden("md")
export const mdLg = hidden("mdLg")
export const lg = hidden("lg")

export const Hide = styled.div`
display: inline;
${sm}
${md}
${mdLg}
${lg}
`

export const HideBlock = styled(Hide)`
  display: block;
`

export const MobileView: React.SFC<{ children: React.ReactNode }> = ({
  children
}) => (
  <Hide mdLg lg>
    {children}
  </Hide>
)

export const BrowserView: React.SFC<{ children: React.ReactNode }> = ({
  children
}) => (
  <Hide sm md>
    {children}
  </Hide>
)

export default Hide
