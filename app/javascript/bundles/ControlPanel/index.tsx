import React, { useState } from "react"
import styled from "styled-components"
import { default as BaseSlider } from "react-slick"

import { BrowserView, MobileView } from "../components/Hide"
import Button from "../components/Button"
import CameraStream from "./CameraStream"
import SensorsPanel from "./SensorsPanel"
import DeveloperTools from "./DeveloperTools"
import Map from "./Map"
import { Robot, Twist } from "../App"

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

const MapContainer = styled.div`
  position: absolute;
  top: 10%;
  left: 15%;
  z-index: 11;
  width: 70%;
  background-color: ${props => props.theme.colors.silver};
  border: 5px solid ${props => props.theme.colors.gunmetal};
`

const GreyedOutBackground = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0.25;
  background-color: ${props => props.theme.colors.main};
  z-index: 10;
`

interface Props {
  robot: Robot
  ride: (value: Twist) => void
}

function ControlPanel(props: Props) {
  const [isMapOpen, setIsMapOpen] = useState(false)
  const ROBOT_IP = props.robot.ip
  const sliderSettings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  }

  const src = `http://${ROBOT_IP}:8080/stream?topic=/raspicam_node/image`

  return (
    <>
      {isMapOpen && (
        <>
          <GreyedOutBackground />
          <MapContainer>
            <Map close={() => setIsMapOpen(false)} />
          </MapContainer>
        </>
      )}

      <MobileView>
        <Slider {...sliderSettings}>
          <LeftPanel>
            <CameraStream src={src} />
          </LeftPanel>
          <SensorsPanel ride={props.ride} />
          <Map close={() => {}} />
          <DeveloperTools />
        </Slider>
      </MobileView>

      <BrowserView>
        <Grid>
          <LeftPanel>
            <CameraStream src={src} />
            <ButtonContainer>
              <Button onClick={() => setIsMapOpen(true)}>Открыть карту</Button>
            </ButtonContainer>
          </LeftPanel>

          <SensorsPanel ride={props.ride} />
          <DeveloperTools />
        </Grid>
      </BrowserView>
    </>
  )
}

export default ControlPanel
