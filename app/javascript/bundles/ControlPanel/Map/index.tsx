import React, { Component } from "react"
import { isMobile } from "react-device-detect"
import styled from "styled-components"

import Matrix, { cellsEqual } from "./Matrix"
import Button from "../../components/Button"
import Help from "./Help"

const Content = styled.div`
  padding: 20px 50px 10px;
`

const Icon = styled.img`
  width: 30px;
  height: 30px;
  position: absolute;
  left: 0;
  top: 0;
  padding: 20px;
`

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center
  margin: 0 auto;
  max-width: 500px;
  padding: 20px;
`

interface State {
  dimension: number
  startCell?: number[]
  finishCell?: number[]
  currentPosition?: number[]
  path?: number[][]
  trajectory?: number[][]
  visited: boolean[][]
  scores: number[][]
  pathDoesntExist: boolean
}

interface Props {
  close: () => void
}

const DIMENSION = isMobile ? 10 : 13

class App extends Component<Props, State> {
  state: State = {
    dimension: DIMENSION,
    pathDoesntExist: false,
    visited: Array.from(Array(DIMENSION), _ => Array(DIMENSION).fill(false)),
    scores: Array.from(Array(DIMENSION), _ => Array(DIMENSION).fill(0)),
    path: [],
    trajectory: []
  }

  reset = (value?: number) => {
    const D = value || this.state.dimension
    this.setState({
      dimension: D,
      startCell: undefined,
      finishCell: undefined,
      pathDoesntExist: false,
      visited: Array.from(Array(D), _ => Array(D).fill(false)),
      scores: Array.from(Array(D), _ => Array(D).fill(0)),
      path: [],
      trajectory: []
    })
    this.obstacles = this.generateObstacles(value)
  }

  generateObstacles(dimension?: number) {
    dimension = dimension || this.state.dimension || 0

    const obstacles: boolean[][] = Array.from(Array(dimension), _ =>
      Array(dimension).fill(false)
    )

    for (let k = 0; k < dimension ** 2 / 3; k++) {
      const i = Math.floor(Math.random() * Math.floor(dimension))
      const j = Math.floor(Math.random() * Math.floor(dimension))
      obstacles[i][j] === true ? (k -= 1) : (obstacles[i][j] = true)
    }

    return obstacles
  }

  obstacles: boolean[][] = this.generateObstacles()

  selectCell = (i: number, j: number) => {
    if (this.state.startCell) {
      this.setState({ finishCell: [i, j] })
    } else {
      this.setState({ startCell: [i, j], currentPosition: [i, j] })
    }
  }

  visitCells = (cells: number[][], currentScore: number) => {
    const newVisited = this.state.visited
    const newScores = this.state.scores
    cells.forEach((cell: number[]) => {
      newVisited[cell[0]][cell[1]] = true
      newScores[cell[0]][cell[1]] = currentScore + 1
    })

    this.setState({ visited: newVisited })
  }

  startMapExploration = async () => {
    const { startCell, finishCell } = this.state
    let finished: boolean = false
    const stack: number[][] = []
    stack.push(startCell!)
    this.visitCells([startCell!], -1)

    let goOn: boolean = false
    let x: number, y: number
    let temp: number[] | false

    while (!finished) {
      ;[x, y] = stack.pop()!
      goOn = false
      do {
        if (!this.state.visited[x][y]) {
          this.visitCells([[x, y]], 1)
          stack.push([x, y])
        } else {
          temp = this.findNeighbor(x, y)
          if (temp) {
            ;[x, y] = temp
            goOn = true
          }
        }
      } while (!this.state.visited[x][y] || !goOn)

      if (this.state.visited[finishCell![0]][finishCell![1]]) {
        finished = true
      } else if (!goOn) {
        temp = stack.pop()!
        if (temp && !cellsEqual(finishCell!, temp)) {
          console.log("noop")
          return
        }
      }
    }
  }

  findNeighbor(x: number, y: number) {
    if (this.isWalkable(x + 1, y)) return [x + 1, y]
    if (this.isWalkable(x - 1, y)) return [x - 1, y]
    if (this.isWalkable(x, y + 1)) return [x, y + 1]
    if (this.isWalkable(x, y - 1)) return [x, y - 1]
    return false
  }

  startLeeAlgorithm = async () => {
    const { scores, startCell, finishCell } = this.state
    if (cellsEqual(startCell!, finishCell!)) return
    const toVisit = [[startCell![0], startCell![1]]]

    let x: number, y: number
    ;[x, y] = [startCell![0], startCell![1]]

    this.visitCells([[x, y]], -1)
    let visitedOnIteration: number[][]

    while (toVisit.length) {
      ;[x, y] = [toVisit[0][0], toVisit[0][1]]
      const currentScore = scores[x][y]
      toVisit.shift()

      visitedOnIteration = []

      // this.setState({ currentPosition: [x, y] })
      await new Promise(resolve => setTimeout(resolve, 5))

      /* Visiting all adjacent cells */
      for (const cell of [[x, y - 1], [x + 1, y], [x, y + 1], [x - 1, y]]) {
        if (this.isWalkable(cell[0], cell[1])) {
          toVisit.push(cell)
          visitedOnIteration.push(cell)
          if (this.haveReachedFinish(cell[0], cell[1])) {
            this.visitCells([finishCell!], currentScore)
            this.backtrace()
            return
          }
        }
      }

      /* Mark cells as visited and increment scores after visiting all adjacent cells
         to make visualisation smoother
      */
      this.visitCells(visitedOnIteration, currentScore)
    }
    this.setState({ pathDoesntExist: true })
  }

  haveReachedFinish = (x: number, y: number) => {
    if (cellsEqual([x, y], this.state.finishCell!)) {
      console.log("found!", x, y)
      return true
    }
    return false
  }

  backtrace = () => {
    const { finishCell, startCell, scores } = this.state
    let x: number, y: number
    ;[x, y] = finishCell!
    this.addToPath(y, x)
    let currentScore = scores[x][y]

    let [trajectoryX, trajectoryY] = [0, 0]

    while (!cellsEqual([x, y], startCell!)) {
      if (this.shouldIncludeInPath(x - 1, y, currentScore)) {
        x = x - 1
        trajectoryX = -1
      } else if (this.shouldIncludeInPath(x + 1, y, currentScore)) {
        x = x + 1
        trajectoryX = 1
      } else if (this.shouldIncludeInPath(x, y - 1, currentScore)) {
        y = y - 1
        trajectoryY = -1
      } else if (this.shouldIncludeInPath(x, y + 1, currentScore)) {
        y = y + 1
        trajectoryY = 1
      }
      this.addToPath(y, x)
      this.addToTrajectory(trajectoryY, trajectoryX)

      currentScore = scores[x][y]
    }
    console.log(this.state.path)
    console.log(this.state.trajectory)
  }

  shouldIncludeInPath(x: number, y: number, currentScore: number) {
    const { dimension, scores } = this.state

    return (
      x >= 0 &&
      y >= 0 &&
      x < dimension &&
      y < dimension &&
      !this.obstacles[x][y] &&
      scores[x][y] === currentScore - 1
    )
  }

  isWalkable(x: number, y: number) {
    const { dimension, visited } = this.state

    const isInsideGrid = x >= 0 && y >= 0 && x < dimension && y < dimension
    return isInsideGrid && !this.obstacles[x][y] && !visited[x][y]
  }

  addToPath = (x: number, y: number) => {
    this.setState({
      path: [...this.state.path!, [x, y]]
    })
  }

  addToTrajectory = (x: number, y: number) => {
    this.setState({
      trajectory: [...this.state.trajectory!, [x, y]]
    })
  }

  render() {
    const {
      dimension,
      startCell,
      finishCell,
      currentPosition,
      path,
      visited,
      pathDoesntExist
    } = this.state

    return (
      <Content>
        <Icon src="close.svg" onClick={this.props.close} />
        <Help />
        <Matrix
          dimension={dimension}
          startCell={startCell}
          finishCell={finishCell}
          currentPosition={currentPosition}
          obstacles={this.obstacles}
          onCellSelected={(i: number, j: number) => this.selectCell(i, j)}
          pathDoesntExist={pathDoesntExist}
          path={path}
          visited={visited}
        />
        <ButtonsContainer>
          {/* <Icon src="reset.png" onClick={() => this.reset()} /> */}
          <Button
            onClick={this.startLeeAlgorithm}
            disabled={!this.state.startCell || !this.state.finishCell}
          >
            Найти путь
          </Button>
        </ButtonsContainer>
      </Content>
    )
  }
}

export default App
