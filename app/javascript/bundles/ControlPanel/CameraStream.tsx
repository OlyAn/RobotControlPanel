import React from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  align-items: center;
  max-height: 70vh;
  width: -webkit-fill-available;

  @media (min-width: 948px) {
    max-height: 500px;
  }
`

const Image = styled.img`
  background-color: #eee;
  width: 100%;
  font-size: 24px;
  max-width: 400px;
  text-align: center;
  color: ${props => props.theme.colors.orange};

  @media (min-width: 948px) {
    max-width: unset;
  }
`

const CameraStream: React.SFC<{ src: string }> = ({ src }) => {
  return (
    <Container>
      <Image
        src={src}
        alt="Что-то пошло не так. Проверьте, что на мобильном роботе запущен web_video_server."
      />
    </Container>
  )
}

export default CameraStream
