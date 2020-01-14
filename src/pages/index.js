import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ChangeGraph from "../components/ChangeGraph/ChangeGraph"
import AverageGraph from "../components/AverageGraph/AverageGraph"
import TokenizableCss from "../components/TokenizableCss/TokenizableCss"
import TokenizableJs from "../components/TokenizableJs/TokenizableJs"
import SizeGraph from "../components/SizeGraph/SizeGraph"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <div style={{ minHeight: "65vh" }}>
        <ChangeGraph />
      </div>
      <div style={{ minHeight: "65vh" }}>
        <AverageGraph />
      </div>
      <div style={{ minHeight: "65vh" }}>
        <TokenizableCss />
      </div>
      <div style={{ minHeight: "65vh" }}>
        <TokenizableJs />
      </div>
      <div style={{ minHeight: "65vh" }}>
        <SizeGraph />
      </div>
    </Layout>
  )
}

export default IndexPage
