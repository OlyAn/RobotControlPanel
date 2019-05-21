import React from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 500px;

  @media (max-width: 756px) {
    height: 95vh;
  }
`

export const Image = styled.img`
  background-color: #eee;
  width: 100%;

  @media (max-width: 756px) {
    max-width: 400px;
  }
`

export const CameraStream: React.SFC<{ src: string }> = ({ src }) => {
  return (
    <Container>
      <Image src={src} />
    </Container>
  )
}
