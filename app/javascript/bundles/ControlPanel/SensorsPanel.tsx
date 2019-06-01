import React from "react"
import styled from "styled-components"
import BaseButton from "../components/Button"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
  background-color: #d4dadc;
  height: 70vh;
  padding-top: 20px;
  padding-bottom: 20px;

  @media (min-width: 948px) {
    height: 500px;
  }
`

const ButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: 33% 33% 33%;
  width: fit-content;
`

const Button = styled(BaseButton)<{
  direction: "up" | "down" | "left" | "right"
}>`
  width: 50px;
  height: 50px;

  ${props => {
    let degree = 0
    let gridPosition = "grid-column: 2; grid-row: 1;"
    if (props.direction === "down") {
      degree = 180
      gridPosition = "grid-column: 2; grid-row: 2"
    } else if (props.direction === "left") {
      degree = -90
      gridPosition = "grid-column: 1; grid-row: 2"
    } else if (props.direction === "right") {
      degree = 90
      gridPosition = "grid-column: 3; grid-row: 2"
    }

    return `transform: rotate(${degree}deg); ${gridPosition}`
  }};
`

const SoundContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 20px;

  img {
    padding-left: 10px;
    width: 40px;
    height: 40px;
  }

  img:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`

const SensorsContainer = styled.div``

const SensorsPanel: React.SFC<{}> = () => {
  return (
    <Container>
      <SoundContainer>
        <select>
          <option value="attention">Привлечь внимание</option>
          <option value="low_battery">Низкий заряд аккумулятора</option>
        </select>
        <img src="volume.svg" onClick={() => console.log("Play sound")} />
      </SoundContainer>

      <ButtonsContainer>
        <Button direction="up">^</Button>
        <Button direction="left">^</Button>
        <Button direction="down">^</Button>
        <Button direction="right">^</Button>
      </ButtonsContainer>

      <SensorsContainer>
        <div>Показание левого датчика расстояния: 10см</div>
        <div>Показание правого датчика расстояния: 10см</div>
      </SensorsContainer>
    </Container>
  )
}

export default SensorsPanel
