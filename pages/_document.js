import React from "react"
import Document, { Head, Html, Main, NextScript } from "next/document"
import { ServerStyleSheet } from "styled-components"

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      const initialProps = await Document.getInitialProps(ctx)

      // prevent stylesheets server-side rendering
      // in case we are not in production
      if (!process.env.NODE_ENV !== "production") {
        return initialProps
      }

      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        })

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            <style id="server-side-styles">{sheet.getStyleElement()}</style>
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
