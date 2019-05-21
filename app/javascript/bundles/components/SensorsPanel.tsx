import React from "react"
import styled from "styled-components"

const Container = styled.div`
  background-color: #ee33;
  height: 500px;

  @media (max-width: 756px) {
    height: 95vh;
  }
`
export const SensorsPanel: React.SFC<{}> = () => {
  return <Container />
}
