import Head from "next/head"
import { ThemeProvider, Box, Panel } from "@sparkpost/matchbox"

export default function Home() {
  return (
    <ThemeProvider>
      <Box
        p="800"
        display="grid"
        gridGap="300"
        gridTemplateColumns="repeat(6, 1fr)"
      >
        <Box gridColumn="1/7">
          <Panel>
            <Panel.Section>test</Panel.Section>
          </Panel>
        </Box>
        <Panel>
          <Panel.Section>test</Panel.Section>
        </Panel>
        <Panel>
          <Panel.Section>test</Panel.Section>
        </Panel>
        <Panel>
          <Panel.Section>test</Panel.Section>
        </Panel>
      </Box>
    </ThemeProvider>
  )
}
