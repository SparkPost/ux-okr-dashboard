import React from "react"
import { Bar } from "@vx/shape"
import { Group } from "@vx/group"
import { scaleBand, scaleLinear } from "@vx/scale"
import { getBgFill } from "../getBgFill"
import _ from "lodash"
import { tokens } from "@sparkpost/design-tokens"
import data from "../../raw-data/size.json"

function Graph({ onClick }) {
  const dataMap = _.sortBy(
    Object.keys(data).reduce((acc, key) => {
      acc.push({ date: key, ...data[key] })
      return acc
    }, []),
    ["date"]
  )

  const x = d => d.date
  const y = d => d.css / d.js

  const width = 800
  const height = 300

  const xMax = width
  const yMax = height - 90
  const yMin = 0

  // scales
  const xScale = scaleBand({
    rangeRound: [0, xMax],
    domain: dataMap.map(x),
    padding: 0.06,
  })

  const cssMax = Math.max(...dataMap.map(y))

  const yScale = scaleLinear({
    rangeRound: [yMax, yMin],
    domain: [0, cssMax],
  })

  return (
    <svg width={width} height={height}>
      <Group top={40}>
        {dataMap.map((d, i) => {
          const letter = x(d)
          const barWidth = xScale.bandwidth()
          const barHeight = yMax - yScale(y(d))

          const barX = xScale(letter)
          const barY = yMax - barHeight

          return (
            <Group
              key={`fbar-${letter}`}
              onClick={() => onClick(d.date)}
              style={{
                cursor: "pointer",
              }}
            >
              <rect
                x={barX}
                y={yMax - height}
                width={barWidth}
                height={height}
                fill={getBgFill(d.date)}
              />
              <Bar
                x={barX}
                y={barY}
                width={barWidth}
                height={Math.abs(barHeight)}
                fill={tokens.color_purple_700}
                style={{ pointerEvents: "none" }}
              />
            </Group>
          )
        })}
      </Group>
    </svg>
  )
}

export default Graph
