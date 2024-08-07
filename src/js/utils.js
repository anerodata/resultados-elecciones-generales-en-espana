function createNodeWithText (element, text) {
  const node = document.createElement(element)
  const textNode = document.createTextNode(text)
  node.appendChild(textNode)
  return node
}
function getCipherInSpanishFormat (num) {
  return num.toLocaleString('es-ES')
}
function getDateInSpanishFormat (date) {
  return new Date(date).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}
function setupTimeout () {
  let timeout
  return (callback, ms) => {
    clearTimeout(timeout)
    timeout = setTimeout(callback, ms)
  }
}
export { createNodeWithText, getCipherInSpanishFormat, getDateInSpanishFormat, setupTimeout }
