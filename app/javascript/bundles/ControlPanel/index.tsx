import React from "react"
import styled from "styled-components"
import { default as BaseSlider } from "react-slick"

import { BrowserView, MobileView } from "../components/Hide"
import Button from "../components/Button"
import CameraStream from "./CameraStream"
import SensorsPanel from "./SensorsPanel"
import DeveloperTools from "./DeveloperTools"
import { Robot } from "../App"

const Slider = styled(BaseSlider)`
  .slick-dots {
    color: violet;
    bottom: -65px;

    li {
      width: 60px;

      button:before {
        font-size: 45px;
      }
    }
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 40% 40%;
  grid-column-gap: 100px;

  padding: 80px 120px;
`

const LeftPanel = styled.div`
  height: 70vh;

  @media (min-width: 948px) {
    height: 500px;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10%;
`

interface Props {
  robot: Robot
}

function ControlPanel(props: Props) {
  const ROBOT_IP = props.robot.ip
  const sliderSettings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  }

  const src = `http://${ROBOT_IP}:8080/stream?topic=/usb_cam/image_raw`

  return (
    <>
      <MobileView>
        <Slider {...sliderSettings}>
          <LeftPanel>
            <CameraStream src={src} />
          </LeftPanel>
          <SensorsPanel />
          <DeveloperTools />
        </Slider>
      </MobileView>

      <BrowserView>
        <Grid>
          <LeftPanel>
            <CameraStream src={src} />
            <ButtonContainer>
              <Button>Открыть карту</Button>
            </ButtonContainer>
          </LeftPanel>

          <SensorsPanel />
          <DeveloperTools />
        </Grid>
      </BrowserView>
    </>
  )
}

export default ControlPanel
