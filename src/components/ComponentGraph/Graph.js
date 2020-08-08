import React from "react"
import { Bar, LinePath } from "@vx/shape"
import { Group } from "@vx/group"
import { scaleBand, scaleLinear } from "@vx/scale"
import { getBgFill } from "../getBgFill"
import _ from "lodash"
import { tokens } from "@sparkpost/design-tokens"
import data from "../../raw-data/component.json"
import { curveBasis } from "@vx/curve"

function Graph({ onClick }) {
  const dataMap = _.sortBy(
    Object.keys(data).reduce((acc, key) => {
      acc.push({ date: key, ...data[key] })
      return acc
    }, []),
    ["date"]
  )

  const x = d => d.date
  const y = d => d.is
  const y2 = d => d.isNot
  const ratioY = d => (d.is / (d.is + d.isNot)) * 5500

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

  const componentMax = Math.max(...dataMap.map(y2))

  const yScale = scaleLinear({
    rangeRound: [yMax, yMin],
    domain: [0, componentMax],
  })

  return (
    <svg width={width} height={height}>
      <Group top={40}>
        {dataMap.map((d, i) => {
          const letter = x(d)
          const barWidth = xScale.bandwidth()
          const barHeight = yMax - yScale(y(d))
          const bar2Height = yMax - yScale(y2(d))

          const barX = xScale(letter)
          const barY = yMax - barHeight
          const bar2Y = yMax - bar2Height

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
                y={bar2Y}
                width={barWidth}
                height={Math.abs(bar2Height)}
                fill={tokens.color_purple_400}
                style={{ pointerEvents: "none" }}
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
        <LinePath
          data={dataMap}
          curve={curveBasis}
          x={d => xScale(d.date.valueOf()) + xScale.bandwidth() / 2}
          y={d => yScale(ratioY(d))}
          stroke={tokens.color_gray_900}
          strokeWidth={2}
          strokeOpacity={0.5}
        />
      </Group>
      <Group left={20} top={yMax + 60}>
        <rect fill={tokens.color_purple_400} width={12} height={12} />
        <text dx={20} dy={12}>
          2web2ui Components
        </text>
        <rect x={200} fill={tokens.color_purple_700} width={12} height={12} />
        <text dx={220} dy={12}>
          Matchbox Components
        </text>
      </Group>
    </svg>
  )
}

export default Graph
