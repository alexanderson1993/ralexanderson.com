import merge from "lodash.merge"
import { base } from "@theme-ui/presets"
import typography from "./typography"
import colors from "./colors"
import styles from "./styles"
import prism from "./prism"

export default merge(base, typography, {
  initialColorMode: `light`,
  colors,
  fonts: {
    heading: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`,
    monospace: `Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace`,
  },
  sizes: {
    container: 672,
  },
  styles,
  prism,
  footer: {
    listItem: {
      position: "relative",
      display: "inline-block",
      px: 1,
      "::after": {
        content: '"•"',
        position: "absolute",
        right: "-3px",
      },
    },
  },
})
