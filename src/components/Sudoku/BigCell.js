import React from "react"
import SmallCell from "./SmallCell";

const BigCell = (props) => {
  return (
    <div className="big">
      {props.cells.map(smallCell => (
        <SmallCell
          getCellById={props.getCellById}
          key={smallCell.key}
          id={smallCell.number}
          active={smallCell.active}
          select={props.click}
        />
      ))}
    </div>
  )
}

export default BigCell