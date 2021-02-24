import React from "react"
import { Group } from "@visx/group"
import { useTooltip, useTooltipInPortal } from "@visx/tooltip"
import { localPoint } from "@visx/event"
import { GridColumns } from "@visx/grid"
import { AxisLeft, AxisTop } from "@visx/axis"
import { Bar, BarRounded } from "@visx/shape"
import { scaleBand, scaleLinear } from "@visx/scale"
import { withParentSize } from "@visx/responsive"
import { max } from "d3-array"
import _ from "lodash"

const margin = { top: 40, bottom: 10, left: 80, right: 0 }
const xAxisHeight = 20

function BarChart(props) {
  const { data, yKey, xKey, parentWidth = 800, height = 400 } = props
  const [hovered, setHovered] = React.useState()

  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip()

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    // use TooltipWithBounds
    detectBounds: true,
    // when tooltip containers are scrolled, this will correctly update the Tooltip position
    scroll: true,
  })

  const sorted = _.orderBy(data, [xKey], ["desc"])

  const xMax = parentWidth - margin.left - margin.right
  const yMax = height - margin.top - margin.bottom - xAxisHeight

  const x = d => d[xKey]
  const y = d => d[yKey]

  const yScale = scaleBand({
    range: [0, yMax],
    domain: sorted.map(y),
    padding: 0.1,
  })

  const xDataMax = max(data, x)

  const xScale = scaleLinear({
    range: [0, xMax],
    domain: [0, xDataMax || 0],
  })

  const handleTooltip = (event, datum, barY) => {
    const coords = localPoint(event.target.ownerSVGElement, event)
    setHovered(datum.key)
    showTooltip({
      tooltipData: datum,
      tooltipLeft: coords.x,
      tooltipTop: barY + margin.top + 30,
    })
  }

  const handleHide = () => {
    hideTooltip()
    setHovered(null)
  }

  return (
    <svg width={parentWidth} height={height} ref={containerRef}>
      <Group left={margin.left} top={margin.top}>
        <AxisLeft
          scale={yScale}
          stroke="#d9e0e6"
          numTicks={100}
          hideTicks
          tickLabelProps={() => ({
            fill: "#555",
            fontSize: 10,
            dx: "0.3em",
            dy: "0.3em",
            textAnchor: "end",
            angle: "-35",
          })}
        />
      </Group>
      <Group left={margin.left} top={margin.top}>
        <GridColumns
          scale={xScale}
          width={xMax}
          height={yMax}
          stroke="#d9e0e6"
          numTicks={3}
        />
        <AxisTop
          top={0}
          scale={xScale}
          numTicks={5}
          stroke="#d9e0e6"
          tickStroke="#d9e0e6"
          tickLabelProps={() => ({
            fill: "#555",
            fontSize: 10,
            dx: "0",
            dy: "-3px",
            textAnchor: "middle",
          })}
        />
        {sorted.map((d, i) => {
          const component = y(d)
          const barY = yScale(component)
          const barWidth = xScale(x(d))
          const barHeight = yScale.bandwidth()

          return (
            <Group key={`fbar-${component}`}>
              <BarRounded
                x={0}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill={component === hovered ? "#ff5760" : "#8c40ff"}
                style={{ pointerEvents: "none" }}
                radius={3}
                bottomRight
                topRight
              />
              <Bar
                x={0}
                y={barY}
                width={parentWidth}
                height={barHeight}
                fill="transparent"
                onMouseEnter={e => handleTooltip(e, d, barY)}
                onMouseLeave={handleHide}
              />
            </Group>
          )
        })}

        {tooltipOpen && (
          <TooltipInPortal
            // set this to random so it correctly updates with parent bounds
            key={Math.random()}
            top={tooltipTop}
            left={tooltipLeft}
          >
            {tooltipData.key} – <strong>{tooltipData.value}</strong>
          </TooltipInPortal>
        )}
      </Group>
    </svg>
  )
}

export default withParentSize(BarChart)
