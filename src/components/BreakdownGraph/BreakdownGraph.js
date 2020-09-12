import React from "react"
import { Bar } from "@vx/shape"
import { Group } from "@vx/group"
import { scaleBand, scaleLinear } from "@vx/scale"
import { tokens } from "@sparkpost/design-tokens"

import data from "../../raw-data/component-breakdown.json"

const formatted = Object.keys(data)
  .map(key => {
    return { key, value: data[key] }
  })
  .sort((a, b) => {
    return a.value > b.value ? -1 : a.value < b.value ? 1 : 0
  })

function BreakdownGraph() {
  const y = d => d.key
  const x = d => d.value
  const width = 600
  const height = 1500

  const yMax = height
  const xMax = width - 180
  const xMin = 0

  // scales
  const yScale = scaleBand({
    rangeRound: [0, yMax],
    domain: formatted.map(y),
    padding: 0.06,
  })

  const componentMax = Math.max(...formatted.map(x))

  const xScale = scaleLinear({
    rangeRound: [xMax, xMin],
    domain: [0, componentMax],
  })

  return (
    <>
      <h1>Component Usage</h1>
      <svg width={width} height={height}>
        <Group top={0} left={0}>
          {formatted.map((d, i) => {
            const letter = y(d)
            const barWidth = yScale.bandwidth()
            const barHeight = xMax - xScale(x(d))

            const barX = yScale(letter)
            return (
              <>
                <Group key={`fbar-${letter}`}>
                  <rect
                    x={0}
                    y={barX}
                    width={width}
                    height={barWidth}
                    fill={tokens.color_gray_200}
                  />
                  <Bar
                    x={0}
                    y={barX}
                    width={barHeight}
                    height={barWidth}
                    fill={tokens.color_purple_700}
                    style={{ pointerEvents: "none" }}
                  />
                </Group>
                <text
                  y={barX + 18}
                  x={barHeight + 5}
                  style={{ textAlign: "right", fontSize: "12px" }}
                >
                  {d.value} {d.key}
                </text>
              </>
            )
          })}
        </Group>
      </svg>
    </>
  )
}

export default BreakdownGraph
