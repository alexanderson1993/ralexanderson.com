import React from "react"
import themeLight from "./theme-light.json"
import themeDark from "./theme-dark.json"
import useDarkMode from "../hooks/useDarkMode"

const ThemeContext = React.createContext(themeLight)

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useDarkMode()
  const theme = darkMode ? themeDark : themeLight
  const value = React.useMemo(() => ({ ...theme, darkMode, setDarkMode }), [
    theme,
  ])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export default ThemeProvider

export function useTheme() {
  return React.useContext(ThemeContext)
}

export function withTheme(WrappedComponent) {
  return React.forwardRef((props, ref) => {
    const theme = React.useContext(ThemeContext)
    return <WrappedComponent ref={ref} {...theme} {...props} />
  })
}
