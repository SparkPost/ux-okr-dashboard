import Head from "next/head"
import { Box, Panel } from "@sparkpost/matchbox"
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
    <>
      <Head>
        <title>Matchbox Usage Tracker</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box
        p="800"
        display="grid"
        gridGap="500"
        gridTemplateColumns="repeat(6, 1fr)"
      >
        <Box as="h1" fontSize="500" gridColumn="1/7">
          Matchbox Usage Tracker
        </Box>
        <Box gridColumn="1/7">
          <Panel>
            <Panel.SubHeader>
              Component Usage – Matchbox vs. 2web2ui
            </Panel.SubHeader>
            <Panel.Section>
              <LineChart
                data={componentFormatted}
                yKey="is"
                yKey2="isNot"
                xKey="date"
                height="450"
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
            <Panel.SubHeader>SCSS Line Count</Panel.SubHeader>
            <Panel.Section>
              <LineChart
                data={sizeFormatted}
                yKey="css"
                xKey="date"
                height="250"
              />
            </Panel.Section>
          </Panel>
        </Box>
        <Box gridColumn="4/7">
          <Panel>
            <Panel.SubHeader>Styled Components Line Count</Panel.SubHeader>
            <Panel.Section>
              <LineChart
                data={styledFormatted}
                yKey="length"
                xKey="date"
                height="250"
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
                height="250"
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
                height="250"
              />
            </Panel.Section>
          </Panel>
        </Box>
      </Box>
    </>
  )
}
