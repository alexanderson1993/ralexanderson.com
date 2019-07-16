import React from "react"

// Adapted from https://medium.com/the-non-traditional-developer/how-to-use-an-intersectionobserver-in-a-react-hook-9fb061ac6cb5
export const useIntersect = ({ root = null, rootMargin, threshold = 0 }) => {
  const [entry, updateEntry] = React.useState({})
  const [node, setNode] = React.useState(null)

  const observer = React.useRef(null)

  React.useEffect(() => {
    if (typeof window === "undefined" || !window.IntersectionObserver) return
    if (observer.current) observer.current.disconnect()

    observer.current = new window.IntersectionObserver(
      ([entry]) => updateEntry(entry),
      {
        root,
        rootMargin,
        threshold,
      }
    )

    const { current: currentObserver } = observer

    if (node) currentObserver.observe(node)

    return () => currentObserver.disconnect()
  }, [node, root, rootMargin, threshold])

  return [setNode, entry]
}
