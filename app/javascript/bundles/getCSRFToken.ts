export const getCSRFToken = (): string => {
  const element = document.querySelector("meta[name=csrf-token]")
  if (element) {
    return element.getAttribute("content") || ""
  } else {
    return ""
  }
}
