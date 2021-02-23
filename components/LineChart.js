import React from "react"
import { Group } from "@visx/group"
import { useTooltip, useTooltipInPortal } from "@visx/tooltip"
import { localPoint } from "@visx/event"
import { GridRows } from "@visx/grid"
import { AxisLeft, AxisBottom } from "@visx/axis"
import { LinePath, Bar, Line } from "@visx/shape"
import { scaleTime, scaleLinear } from "@visx/scale"
import { withParentSize } from "@visx/responsive"
import { max, extent, bisector } from "d3-array"
import _ from "lodash"

const margin = { top: 5, bottom: 20, left: 30, right: 0 }
const xAxisHeight = 20

function LineChart(props) {
  const {
    data,
    yKey,
    xKey,
    yKey2,
    parentWidth = 800,
    height = 400,
    labelMap,
    labelCalc,
  } = props
  const sorted = _.sortBy(data, ["date"])

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

  const xMax = parentWidth - margin.left - margin.right
  const yMax = height - margin.top - margin.bottom - xAxisHeight

  const x = d => new Date(d[xKey])
  const y = d => d[yKey]
  const y2 = d => d[yKey2]

  const bisectDate = bisector(d => new Date(d.date)).left

  const xScale = scaleTime({
    range: [0, xMax],
    domain: extent(data, x),
  })

  const yDataMax = max(data, y)
  const y2DataMax = y2 ? max(data, y2) : 0
  const yScaleDomainMax = y2DataMax > yDataMax ? y2DataMax : yDataMax

  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [0, yScaleDomainMax || 0],
    nice: true,
  })

  const handleTooltip = event => {
    const coords = localPoint(event.target.ownerSVGElement, event)
    const x0 = xScale.invert(coords.x - margin.left)
    const index = bisectDate(sorted, x0, 1)
    const d0 = sorted[index - 1]
    const d1 = sorted[index]
    let d = d0
    const getDate = dt => new Date(dt.date)
    if (d1 && getDate(d1)) {
      d =
        x0.valueOf() - getDate(d0).valueOf() >
        getDate(d1).valueOf() - x0.valueOf()
          ? d1
          : d0
    }

    showTooltip({
      tooltipData: { ...d, y2TooltipTop: yScale(y2(d)) + margin.top },
      tooltipLeft: coords.x,
      tooltipTop: yScale(y(d)) + margin.top,
    })
  }

  return (
    <svg width={parentWidth} height={height} ref={containerRef}>
      <Group left={margin.left} top={margin.top}>
        <AxisLeft
          scale={yScale}
          stroke="#e0e0e0"
          numTicks={5}
          hideTicks
          tickLabelProps={() => ({
            fill: "#555",
            fontSize: 10,
            dx: "0em",
            dy: "0.3em",
            textAnchor: "end",
          })}
        />
      </Group>
      <Group left={margin.left} top={margin.top}>
        <GridRows
          scale={yScale}
          width={xMax}
          height={yMax}
          stroke="#e0e0e0"
          numTicks={5}
        />
        <AxisBottom
          top={yMax}
          scale={xScale}
          numTicks={4}
          stroke="#e0e0e0"
          tickStroke="#e0e0e0"
          tickLabelProps={() => ({
            fill: "#555",
            fontSize: 11,
            dx: "0",
            dy: "0",
            textAnchor: "middle",
          })}
        />
        <LinePath
          data={sorted}
          x={d => xScale(x(d))}
          y={d => yScale(y(d))}
          stroke="#8c40ff"
          strokeWidth={2}
        />
        {yKey2 && (
          <LinePath
            data={sorted}
            x={d => xScale(x(d))}
            y={d => yScale(y2(d))}
            stroke="#ff5760"
            strokeWidth={2}
          />
        )}
        <Bar
          width={parentWidth}
          height={height}
          fill="transparent"
          onMouseMove={handleTooltip}
          onMouseEnter={handleTooltip}
          onMouseLeave={hideTooltip}
        />
      </Group>

      {tooltipOpen && (
        <TooltipInPortal
          // set this to random so it correctly updates with parent bounds
          key={Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
        >
          <div>
            {labelMap ? labelMap[xKey] : xKey}{" "}
            <strong>{tooltipData[xKey]}</strong>
          </div>
          <div>
            {labelMap ? labelMap[yKey] : yKey}{" "}
            <strong>{tooltipData[yKey]}</strong>
          </div>
          {yKey2 && (
            <div>
              {labelMap ? labelMap[yKey2] : yKey2}{" "}
              <strong>{tooltipData[yKey2]}</strong>
            </div>
          )}
          <div>{labelCalc && labelCalc(tooltipData)}</div>
        </TooltipInPortal>
      )}
      {tooltipOpen && (
        <>
          <Line
            from={{ x: tooltipLeft, y: margin.top }}
            to={{ x: tooltipLeft, y: height - margin.bottom }}
            stroke="#d0d0d0"
            strokeWidth={1}
            pointerEvents="none"
          />
          <circle
            cx={tooltipLeft}
            cy={tooltipTop}
            r={4}
            fill="#8c40ff"
            stroke="#8c40ff"
            strokeOpacity={0.3}
            strokeWidth={10}
            pointerEvents="none"
          />
          {yKey2 && (
            <circle
              cx={tooltipLeft}
              cy={tooltipData.y2TooltipTop}
              r={4}
              fill="#ff5760"
              stroke="#ff5760"
              strokeOpacity={0.3}
              strokeWidth={10}
              pointerEvents="none"
            />
          )}
        </>
      )}
    </svg>
  )
}

export default withParentSize(LineChart)
