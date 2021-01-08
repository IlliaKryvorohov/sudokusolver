import React from "react"

const Button = (props) => {
  const click = () => {
    props.click(props.number)
  }

  return (
    <div className="button" onClick={click}>
      <p>{props.number}</p>
    </div>
  )
}

const Clear = (props) => {
  const click = () => {
    props.clearSudoku()
  }

  return (
    <div className="button" onClick={click}>
      <p>C</p>
    </div>
  )
}

const Solve = (props) => {
  const click = () => {
    props.clearSudoku()
  }

  return (
    <div className="button" onClick={click}>
      <p>S</p>
    </div>
  )
}

const Panel = (props) => (
  <div className="panel">
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(num => (
      <Button
        number={num}
        key={num}
        click={props.setNumber}
      />
    ))}
    <Clear
      clearSudoku={props.clearSudoku}
    />
    <Solve
      clearSudoku={props.solve}
    />
  </div>
)

export default Panel