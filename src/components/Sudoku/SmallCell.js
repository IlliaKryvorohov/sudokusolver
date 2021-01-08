import React from "react"

const SmallCell = (props) => {
  const click = () => {
    props.select(props.id)
  }
  return (
    <div
      className={"small" + (props.active ? " active" : "")}
      onClick={click}
    >
      <p>{props.getCellById(props.id)}</p>
    </div>
  )
}

export default SmallCell