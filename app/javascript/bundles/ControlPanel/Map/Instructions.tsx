import React from "react"
import styled from "styled-components"
import { Title } from "./Legend"

const Container = styled.div`
  position: absolute;
  width: 350px;
  padding: 20px;
  border: 3px solid ${props => props.theme.colors.rustyRed};
  background-color: white;
  z-index: 1;
  top: 55px;
  right: 0;
`

const InstructionsContainer = styled.div`
  position: sticky;
`

const Section = styled.div<{ italic?: boolean }>`
  text-align: center;
  font-style: ${props => (props.italic ? "italic" : "normal")};
  margin-top: 5px;
`

const Icon = styled.img`
  width: 40px;
  height: 40px;
  padding: 0 10px;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`

type State = {
  showInstructions?: boolean
}

class Instructions extends React.Component<{}, State> {
  state: State = {}

  render() {
    return (
      <InstructionsContainer>
        <Icon
          src="question_mark.png"
          onMouseEnter={() => this.setState({ showInstructions: true })}
          onMouseLeave={() => this.setState({ showInstructions: false })}
        />
        {this.state.showInstructions && (
          <Container>
            <Title>Инструкции</Title>
            <Section>
              1. Нажмите на ячейку поля для выбора стартовой ячейки.
            </Section>
            <Section>
              2. Нажмите на ячейку поля для выбора финишной ячейки.
            </Section>
            <Section>
              3. Нажмите на кнопку "Найти путь" чтобы отправить робота в
              желаемое место.
            </Section>

            {/*<Section italic>
              <strong>NOTE: </strong>
              You can change map dimension at any time, but this will reset the
              start and finish cells and the algorithm.
            </Section>*/}
          </Container>
        )}
      </InstructionsContainer>
    )
  }
}

export default Instructions
