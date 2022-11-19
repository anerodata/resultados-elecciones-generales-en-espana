import * as d3 from 'd3'
function buildChart (width, canvas, numNodes, sep, widthSq, color) {
  let height = 0
  const customBase = document.createElement('custom')
  customBase.id = 'custom'
  buildModel(d3.select(customBase))
  draw(canvas, d3.select(customBase))
  function buildModel (custom) {
    let iX = 0
    let iY = 0
    let bStart = true

    let nBlockX = 0
    let nBlockY = 0

    let countTen = 0
    let countHund = 0

    for (let i = 0; i < numNodes; i++) {
      custom.append('custom')
        .attr('class', 'square')
        .attr('width', widthSq)
        .attr('height', widthSq)
        .attr('x', function () {
          if (!bStart) {
            countTen += 1
            countHund += 1
            // nuevo renglon dentro del cuadro
            if (countTen === 10 && countHund < 100) {
              countTen = 0
              iX = nBlockX
              iY += sep + 1
            } else if (countHund === 100) {
              countHund = 0
              countTen = 0
              // nuevo renglon en otro cuadro debajo
              if (nBlockX + ((sep * 12) + 10) * 2 > width) {
                nBlockX = 0
                iX = 0
                nBlockY += sep * 12 + 10
                iY = nBlockY
                /// /nuevo renglon en otro cuadro a continuacion
              } else {
                nBlockX += sep * 12 + 10
                iX = nBlockX
                iY = nBlockY
              }
            } else {
              // nuevo punto a continuacion del anterior
              iX += sep + 1
            }
          }
          // comienzo
          bStart = false
          return iX
        })
        .attr('y', function (d) {
          return iY
        })
        .attr('fillStyle', color)
    }
    height = nBlockY + widthSq + sep * 12 + 10 + 3
  }

  function draw (id, custom) {
    const canvas = d3.select(id)
      .attr('width', width)
      .attr('height', height)

    const context = canvas.node().getContext('2d')
    context.clearRect(0, 0, width, height)
    const elements = custom.selectAll('custom.square')
    elements.each(function (d, i) {
      const node = d3.select(this)
      context.fillStyle = node.attr('fillStyle')
      context.fillRect(node.attr('x'), node.attr('y'), node.attr('width'), node.attr('height'))
    })
  }
}
export default buildChart
