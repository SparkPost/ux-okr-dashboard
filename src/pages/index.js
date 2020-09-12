import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ChangeGraph from "../components/ChangeGraph/ChangeGraph"
import ComponentGraph from "../components/ComponentGraph/ComponentGraph"
import AverageGraph from "../components/AverageGraph/AverageGraph"
import TokenizableCss from "../components/TokenizableCss/TokenizableCss"
import TokenizableJs from "../components/TokenizableJs/TokenizableJs"
import SizeGraph from "../components/SizeGraph/SizeGraph"
import BreakdownGraph from "../components/BreakdownGraph/BreakdownGraph"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <div style={{ minHeight: "60vh" }}>
        <ChangeGraph />
      </div>
      <div style={{ minHeight: "60vh" }}>
        <ComponentGraph />
      </div>
      <div style={{ minHeight: "60vh" }}>
        <AverageGraph />
      </div>
      <div style={{ minHeight: "60vh" }}>
        <TokenizableCss />
      </div>
      <div style={{ minHeight: "60vh" }}>
        <TokenizableJs />
      </div>
      <div style={{ minHeight: "60vh" }}>
        <SizeGraph />
      </div>
      <div style={{ minHeight: "60vh" }}>
        <BreakdownGraph />
      </div>
    </Layout>
  )
}

export default IndexPage
