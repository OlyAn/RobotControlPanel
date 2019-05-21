import React, { useState, useEffect } from "react"
import styled, { ThemeProvider } from "styled-components"
import { isMobile } from "react-device-detect"

import { default as BaseSlider } from "react-slick"

import { theme } from "../styles/theme"
import { Normalize } from "../styles/normalize"

import { Button } from "./components/Button"
import { CameraStream } from "./components/CameraStream"
import { SensorsPanel } from "./components/SensorsPanel"
import { DeveloperTools } from "./components/DeveloperTools"
import ROSLIB from "roslib"

const Slider = styled(BaseSlider)`
  min-height: 95vh;

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
  height: 95vh;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10%;
`

const ROBOT_IP = "192.168.0.102"

export default class App extends React.Component {
  ros: any = null

  componentDidMount() {
    this.ros = new ROSLIB.Ros({
      url: `ws://${ROBOT_IP}:9090`
    })

    this.ros.on("connection", () => console.log("Connected"))
    this.ros.on("error", (error: any) => console.log("Error:", error))

    // const myTopic = new ROSLIB.Topic({
    //   ros: this.ros,
    //   name: '/left_encoder',
    //   messageType: 'std_msgs/Int32'
    // })

    // const myMessage = new ROSLIB.Message({
    //   data: "Hello"
    // })

    // myTopic.subscribe((value: any) => console.log(value));
  }

  render() {
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
        <Normalize />
        <ThemeProvider theme={theme}>
          {isMobile ? (
            <Slider {...sliderSettings}>
              <LeftPanel>
                <CameraStream src={src} />
              </LeftPanel>
              <SensorsPanel />
              <CameraStream src={src} />
            </Slider>
          ) : (
            <Grid>
              <LeftPanel>
                <CameraStream src={src} />
                <ButtonContainer>
                  <Button>Open map</Button>
                </ButtonContainer>
              </LeftPanel>

              <SensorsPanel />
              <DeveloperTools />
            </Grid>
          )}
        </ThemeProvider>
      </>
    )
  }
}
