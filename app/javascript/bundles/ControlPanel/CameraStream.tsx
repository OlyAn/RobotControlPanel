import React from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: -webkit-fill-available;
`

const Image = styled.img`
  background-color: #eee;
  max-height: 70vh;
  width: auto;
  font-size: 24px;
  text-align: center;
  color: ${props => props.theme.colors.orange};

  @media (min-width: 948px) {
    max-height: 500px;
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
