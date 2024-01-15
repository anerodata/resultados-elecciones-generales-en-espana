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
  return new Date(date).toLocaleDateString('es-ES')
}
export { createNodeWithText, getCipherInSpanishFormat, getDateInSpanishFormat }
