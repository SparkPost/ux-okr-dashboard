import { ThemeProvider, Box } from "@sparkpost/matchbox"
import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  
  svg path {
    
    transition: 0.3s;
  }
`

function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Box maxWidth="1200px" my="800" mx="auto">
        <Component {...pageProps} />
      </Box>
    </ThemeProvider>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// App.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default App
