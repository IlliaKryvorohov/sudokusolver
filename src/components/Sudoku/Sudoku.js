import React from "react"
import BigCell from "./BigCell";

class Sudoku extends React.Component {
  constructor(props) {
    super(props)

    let hash = []

    let id = 0

    for (let big = 0; big < 9; big++) {

      let bigCell = []
      for (let small = 0; small < 9; small++) {
        let yB = Math.floor(big / 3)
        let yS = Math.floor(small / 3)
        let xB = big - yB * 3
        let xS = small - yS * 3
        let smallCell = (yB * 3 + yS) * 9 + xB * 3 + xS
        bigCell.push({
          key: small,
          number: smallCell,
          active: false
        })
      }
      hash.push({
        key: big,
        cell: bigCell
      })

    }

    this.getCellFromId(hash, id).active = true

    this.state = {
      solution: [],
      hash: hash,
      selected: id
    }
  }

  getCellFromId = (hash, id) => {
    let y = Math.floor(id / 9)
    let x = id - y * 9
    let yB = Math.floor(y / 3)
    let xB = Math.floor(x / 3)
    let yS = y - yB * 3
    let xS = x - xB * 3
    let idG = yB * 3 + xB
    let idS = yS * 3 + xS
    return hash[idG].cell[idS]
  }

  selectCell = (id) => {
    this.props.getSelectedCell(id)
    let hash = this.state.hash.slice()
    this.getCellFromId(hash, this.state.selected).active = false
    this.getCellFromId(hash, id).active = true
    this.setState({
      hash: hash,
      selected: id
    })
  }

  render() {
    return (
      <div className="Sudoku">
        {this.state.hash.map(bigCell => (
          <BigCell
            key={bigCell.key}
            cells={bigCell.cell}
            click={this.selectCell}
            getCellById={this.props.getCellById}
          />
        ))}
      </div>
    )
  }
}

export default Sudoku