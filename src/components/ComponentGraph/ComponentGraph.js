import React from "react"
import Graph from "./Graph"
import components from "../../raw-data/component.json"

function ComponentGraph(props) {
  const [date, setDate] = React.useState("2020-08-01")

  const last = React.useMemo(() => {
    return components[date]
  }, [date])

  return (
    <>
      <h1>Component Ratio</h1>

      <Graph onClick={setDate} />

      <div style={{ textAlign: "center" }}>
        <div>Ratio: {((last.is / last.isNot) * 100).toFixed(2)}%</div>
        <div>Matchbox Components: {last.is}</div>
        <div>UI Components: {last.isNot}</div>
        <div>Date: {date}</div>
      </div>
    </>
  )
}

export default ComponentGraph
