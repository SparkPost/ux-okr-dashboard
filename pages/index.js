import Head from "next/head"
import { ThemeProvider, Box, Panel } from "@sparkpost/matchbox"
import LineChart from "../components/LineChart"
import tokenCountData from "../data/token-count-raw.json"
import styledData from "../data/styled-component.json"
import sizeData from "../data/size.json"
import componentData from "../data/component.json"
import styled from "styled-components"

function formatData(d) {
  return Object.keys(d).map(key => ({ date: key, ...d[key] }))
}

const tokenCountFormatted = formatData(tokenCountData)
const styledFormatted = formatData(styledData)
const componentFormatted = formatData(componentData)
const sizeFormatted = formatData(sizeData)

export default function Home() {
  return (
    <ThemeProvider>
      <Box
        p="800"
        display="grid"
        gridGap="500"
        gridTemplateColumns="repeat(6, 1fr)"
        maxWidth="1500px"
        my="800"
        mx="auto"
      >
        <Box gridColumn="1/7">
          <Panel>
            <Panel.SubHeader>Component Breakdown</Panel.SubHeader>
            <Panel.Section>
              <LineChart
                data={componentFormatted}
                yKey="is"
                yKey2="isNot"
                xKey="date"
                height="300"
                labelMap={{
                  isNot: "2web2ui",
                  is: "matchbox",
                }}
                labelCalc={d => (
                  <Box fontWeight="medium" mt="200">
                    {((d.is / (d.is + d.isNot)) * 100).toFixed(3)}%
                  </Box>
                )}
              />
            </Panel.Section>
          </Panel>
        </Box>
        <Box gridColumn="1/4">
          <Panel>
            <Panel.SubHeader>CSS Size</Panel.SubHeader>
            <Panel.Section>
              <LineChart
                data={sizeFormatted}
                yKey="css"
                xKey="date"
                height="300"
              />
            </Panel.Section>
          </Panel>
        </Box>
        <Box gridColumn="4/7">
          <Panel>
            <Panel.SubHeader>Style Components Size</Panel.SubHeader>
            <Panel.Section>
              <LineChart
                data={styledFormatted}
                yKey="length"
                xKey="date"
                height="300"
              />
            </Panel.Section>
          </Panel>
        </Box>
        <Box gridColumn="1/4">
          <Panel>
            <Panel.SubHeader>CSS Tokenizables</Panel.SubHeader>
            <Panel.Section>
              <LineChart
                data={tokenCountFormatted}
                yKey="css"
                xKey="date"
                height="300"
              />
            </Panel.Section>
          </Panel>
        </Box>
        <Box gridColumn="4/7">
          <Panel>
            <Panel.SubHeader>JS Tokenizables</Panel.SubHeader>
            <Panel.Section>
              <LineChart
                data={tokenCountFormatted}
                yKey="js"
                xKey="date"
                height="300"
              />
            </Panel.Section>
          </Panel>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
