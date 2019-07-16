import React from "react"
let timeout
function timeoutThrottlerHandler(delay, handler) {
  if (!timeout) {
    timeout = setTimeout(() => {
      timeout = null
      handler()
    }, delay)
  }
}

export default function useWindowSize() {
  const [windowSize, setWindowSize] = React.useState({
    width: typeof window === "undefined" ? 1920 : window.innerWidth,
    height: typeof window === "undefined" ? 1080 : window.innerHeight,
  })
  React.useEffect(() => {
    if (typeof window === "undefined") return () => {}
    window.addEventListener("resize", resizeHandler)
    return () => {
      window.removeEventListener("resize", resizeHandler)
    }
  })
  const resizeHandler = timeoutThrottlerHandler(100, () => {
    setWindowSize({
      width: typeof window === "undefined" ? 1920 : window.innerWidth,
      height: typeof window === "undefined" ? 1080 : window.innerHeight,
    })
  })
  return windowSize
}
