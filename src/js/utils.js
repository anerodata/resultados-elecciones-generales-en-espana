function createNodeWithText (element, text) {
  const node = document.createElement(element)
  const textNode = document.createTextNode(text)
  node.appendChild(textNode)
  return node
}
function getCipherInSpanishFormat (num) {
  return num.toLocaleString('es-ES')
}
export { createNodeWithText, getCipherInSpanishFormat }
