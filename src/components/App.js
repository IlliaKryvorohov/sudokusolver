import React from "react";
import Sudoku from "./Sudoku/Sudoku";
import Panel from "./Panel/Panel"
import SudokuSolver from "./program/SudokuSolver"

class App extends React.Component {
  constructor(props) {
    super(props)

    let Sudoku = [
      [0, 0, 5, 0, 7, 0, 2, 0, 6],
      [0, 0, 3, 0, 2, 0, 5, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 6, 0, 4, 5, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 9],
      [0, 0, 0, 1, 0, 0, 3, 7, 0],
      [7, 0, 0, 9, 0, 0, 0, 0, 0],
      [0, 8, 0, 2, 0, 0, 0, 6, 0],
      [4, 0, 0, 0, 0, 3, 0, 8, 0],
    ]

    this.state = {
      Sudoku: Sudoku,
      selectedCell: {
        x: 0,
        y: 0
      }
    }
  }

  getSelectedCell = (cell) => {
    this.setState({
      selectedCell: this.getCoordinationsFromId(cell)
    })
  }

  getCoordinationsFromId = (id) => {
    let y = Math.floor(id / 9)
    let x = id - y * 9
    return {
      x: x,
      y: y
    }
  }

  getCellById = (id) => {
    let coord = this.getCoordinationsFromId(id)
    let num = this.state.Sudoku[coord.y][coord.x]
    return num === 0 ? "" : num
  }

  setNumber = (number) => {
    let Sudoku = this.state.Sudoku.slice()
    Sudoku[this.state.selectedCell.y][this.state.selectedCell.x] = number
    this.setState({
      Sudoku: Sudoku
    })
  }

  clearSudoku = () => {
    let Sudoku = []

    for (let y = 0; y < 9; y++) {
      let row = []
      for (let x = 0; x < 9; x++) {
        row.push(0)
      }
      Sudoku.push(row)
    }
    this.setState({
      Sudoku: Sudoku
    })
  }

  solve = () => {
    let ss = new SudokuSolver()
    ss.load(this.state.Sudoku)
    ss.solve()
    let solution = ss.getSolution()
    console.log(solution)
    this.setState({
      Sudoku: solution
    })
  }
 
  render() {
    return (
      <div className="App">
        <Sudoku
          getSelectedCell={this.getSelectedCell}
          getCellById={this.getCellById}
        />
        <Panel
          setNumber={this.setNumber}
          clearSudoku={this.clearSudoku}
          solve={this.solve}
        />
      </div>
    )
  }
}

export default App;
