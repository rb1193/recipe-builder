import { createSystem, defaultConfig } from "@chakra-ui/react"

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        body: { value: '"Inter", sans-serif' },
        heading: { value: '"Inter", sans-serif' },
        mono: { value: 'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace' },
      },
    },
  },
})

export default system
