import React from "react"
import styled from "styled-components"
import Legend from "./Legend"
import Instructions from "./Instructions"

const Container = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  top: 0;
  padding: 20px;
`

function Help() {
  return (
    <Container>
      <Legend />
      <Instructions />
    </Container>
  )
}

export default Help
