import React, { Component } from "react"
import styled from "styled-components"

const Container = styled.div`
  margin: 0 auto;
  padding-top: 60px;
  width: 80%;
`

const MatrixContainer = styled.div`
  display: flex;
  justify-content: center;
`

const Row = styled.div``

export const Cell = styled.div<{
  obstacle?: boolean
  inPath?: boolean
  start?: boolean
  visited?: boolean
  finish?: boolean
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 30px;
  height: 30px;
  margin: 2px;
  background-color: ${({ theme: { colors }, ...props }) =>
    props.obstacle
      ? colors.silverDarker
      : props.inPath
        ? colors.yellowLight
        : props.visited
          ? colors.lightblue
          : colors.silver};
  border: 1.1px solid;
  border-color: ${props => props.theme.colors.silverDarker};
  border-radius: 2px;
`

export const Circle = styled.div`
  width: 80%;
  height: 80%;
  background-color: ${props => props.theme.colors.green};
  border-radius: 10px;
`
export const Triangle = styled.div`
  width: 60%;
  height: 60%;
  background-color: ${props => props.theme.colors.purple};
  transform: rotate(45deg);
`

const Alert = styled.div`
  margin-top: 5px;
  text-align: center;
  color: ${props => props.theme.colors.rustyRed};
`

export function cellsEqual(a: number[], b: number[]) {
  return a[0] === b[0] && a[1] === b[1]
}

interface Props {
  dimension: number
  startCell?: number[]
  finishCell?: number[]
  currentPosition?: number[]
  onCellSelected: (i: number, j: number) => void
  obstacles: boolean[][]
  inPath?: boolean[]
  path?: number[][]
  visited: boolean[][]
  pathDoesntExist: boolean
}

class Matrix extends Component<Props> {
  renderRows = () => {
    const {
      dimension,
      obstacles,
      path,
      startCell,
      finishCell,
      /*currentPosition,*/ visited
    } = this.props
    const rows: JSX.Element[] = []

    for (let i = 0; i < dimension; i++) {
      const cell: JSX.Element[] = []

      for (let j = 0; j < dimension; j++) {
        const isStart = startCell && cellsEqual([i, j], startCell)
        const isFinish = finishCell && cellsEqual([i, j], finishCell)
        const inPath =
          path && !!path.find((c: number[]) => cellsEqual([j, i], c))

        cell.push(
          <Cell
            key={`cell[${i}][${j}]`}
            id={`cell[${i}][${j}]`}
            start={isStart}
            finish={isFinish}
            obstacle={obstacles[i][j]}
            visited={visited[i][j]}
            onClick={() =>
              obstacles[i][j] ? {} : this.props.onCellSelected(i, j)
            }
            inPath={inPath}
          >
            {isStart && <span>S</span>}
            {isFinish && <span>T</span>}
          </Cell>
        )
      }
      rows.push(
        <Row key={i} id={`row[${i}]`}>
          {cell}
        </Row>
      )
    }

    return rows
  }

  render() {
    return (
      <Container>
        {this.props.pathDoesntExist && (
          <Alert>Выбранное положение недостижимо!</Alert>
        )}
        <MatrixContainer>{this.renderRows()}</MatrixContainer>
      </Container>
    )
  }
}

export default Matrix
