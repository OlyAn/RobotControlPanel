import React from "react"
import styled from "styled-components"
import { Cell } from "./Matrix"

const Container = styled.div`
  padding: 0 15px;
  border: 2px solid ${props => props.theme.colors.gunmetal};
  border-radius: 5px;
  background-color: white;

  @media screen and (min-width: 500px) {
    & {
      right: 10%;
    }
  }
`

export const Title = styled.h3`
  text-align: center;
  margin: 5px;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px;
`

const Label = styled.span`
  margin-left: 5px;
`

type State = {
  showLegend?: boolean
}

class Legend extends React.Component<{}, State> {
  state: State = {}

  render() {
    return (
      <Container>
        <Title
          onMouseEnter={() => this.setState({ showLegend: true })}
          onMouseLeave={() => this.setState({ showLegend: false })}
        >
          Легенда ▼
        </Title>
        {this.state.showLegend && (
          <>
            <LegendItem>
              <Cell />
              <Label>Свообдная</Label>
            </LegendItem>
            <LegendItem>
              <Cell visited />
              <Label>Посещенная</Label>
            </LegendItem>
            <LegendItem>
              <Cell obstacle />
              <Label>Препятствие</Label>
            </LegendItem>
            <LegendItem>
              <Cell>S</Cell>
              <Label>Старт</Label>
            </LegendItem>
            <LegendItem>
              <Cell>T</Cell>
              <Label>Финиш</Label>
            </LegendItem>
            <LegendItem>
              <Cell inPath />
              <Label>Путь</Label>
            </LegendItem>
          </>
        )}
      </Container>
    )
  }
}

export default Legend
