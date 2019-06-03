import React, { useEffect } from "react"
import styled from "styled-components"
import BaseButton from "../components/Button"
import { Twist } from "../App"

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

const KEYCODES = {
  UP_ARROW: 38,
  DOWN_ARROW: 40,
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39
}

const UP = {
  linear: {
    x: 0.1,
    y: 0,
    z: 0
  },
  angular: { x: 0, y: 0, z: 0 }
}
const DOWN = {
  linear: {
    x: -0.1,
    y: 0,
    z: 0
  },
  angular: { x: 0, y: 0, z: 0 }
}
const LEFT = {
  linear: { x: 0, y: 0, z: 0 },
  angular: {
    x: 0,
    y: 0,
    z: -0.5
  }
}
const RIGHT = {
  linear: { x: 0, y: 0, z: 0 },
  angular: {
    x: 0,
    y: 0,
    z: 0.5
  }
}

interface Props {
  ride: (value: Twist) => void
}

const SensorsPanel: React.SFC<Props> = props => {
  const left = React.createRef<HTMLButtonElement>()
  const right = React.createRef<HTMLButtonElement>()
  const down = React.createRef<HTMLButtonElement>()
  const up = React.createRef<HTMLButtonElement>()

  useEffect(
    () => {
      let timer: number | null = null

      const ride = (direction: Twist) => () => {
        timer = setInterval(() => props.ride(direction), 20)
      }

      const clearTimer = () => clearTimeout(timer!)

      const rideUp = ride(UP)
      const rideDown = ride(DOWN)
      const rideLeft = ride(LEFT)
      const rideRight = ride(RIGHT)

      if (
        up &&
        up.current &&
        down &&
        down.current &&
        right &&
        right.current &&
        left &&
        left.current
      ) {
        up.current.addEventListener("mousedown", rideUp)
        down.current.addEventListener("mousedown", rideDown)
        left.current.addEventListener("mousedown", rideLeft)
        right.current.addEventListener("mousedown", rideRight)

        for (const button of [up, down, left, right]) {
          button!.current!.addEventListener("mouseup", clearTimer)
        }
      }

      return () => {
        if (
          up &&
          up.current &&
          down &&
          down.current &&
          right &&
          right.current &&
          left &&
          left.current
        ) {
          for (const button of [up, down, left, right]) {
            button!.current!.removeEventListener("mouseup", clearTimer)
          }

          up.current.removeEventListener("mousedown", rideUp)
          down.current.removeEventListener("mousedown", rideDown)
          left.current.removeEventListener("mousedown", rideLeft)
          right.current.removeEventListener("mousedown", rideRight)
        }
      }
    },
    [up, down, left, right]
  )

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.keyCode === KEYCODES.UP_ARROW) {
        props.ride(UP)
      } else if (event.keyCode === KEYCODES.DOWN_ARROW) {
        props.ride(DOWN)
      } else if (event.keyCode === KEYCODES.LEFT_ARROW) {
        props.ride(LEFT)
      } else if (event.keyCode === KEYCODES.RIGHT_ARROW) {
        props.ride(RIGHT)
      }
    }

    document.addEventListener("keydown", handleKeyPress)

    return () => {
      document.removeEventListener("keydown", handleKeyPress)
    }
  }, [])

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
        <Button ref={up} direction="up">
          ^
        </Button>
        <Button ref={left} direction="left">
          ^
        </Button>
        <Button ref={down} direction="down">
          ^
        </Button>
        <Button ref={right} direction="right">
          ^
        </Button>
      </ButtonsContainer>

      <div>
        <div>Показание левого датчика расстояния: 10см</div>
        <div>Показание правого датчика расстояния: 10см</div>
      </div>
    </Container>
  )
}

export default SensorsPanel
