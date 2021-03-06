import { extendTheme } from "@chakra-ui/react"
// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  fonts: {
      body: '"Inter", sans-serif',
      heading: '"Inter", sans-serif',
      mono: `SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace`,
  },
})

export default theme
