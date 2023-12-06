let iX
let iY
let bStart
let nBlockX
let nBlockY
let countTen
let countHund
class ProvinceVisTdDotChartPosData {
  constructor (width, sep) {
    this.width = width
    this.sep = sep
    iX = 0
    iY = 0
    bStart = true
    nBlockX = 0
    nBlockY = 0
    countTen = 0
    countHund = 0
  }

  getPosition () {
    if (!bStart) {
      countTen += 1
      countHund += 1
      // nuevo renglon dentro del cuadro
      if (countTen === 10 && countHund < 100) {
        countTen = 0
        iX = nBlockX
        iY += this.sep + 1
      } else if (countHund === 100) {
        countHund = 0
        countTen = 0
        // nuevo renglon en otro cuadro debajo
        if (nBlockX + ((this.sep * 12) + 10) * 2 > this.width) {
          nBlockX = 0
          iX = 0
          nBlockY += this.sep * 12 + 10
          iY = nBlockY
          /// /nuevo renglon en otro cuadro a continuacion
        } else {
          nBlockX += this.sep * 12 + 10
          iX = nBlockX
          iY = nBlockY
        }
      } else {
        // nuevo punto a continuacion del anterior
        iX += this.sep + 1
      }
    }
    // comienzo
    bStart = false
    return { iX, iY, nBlockX, nBlockY }
  }
}
export default ProvinceVisTdDotChartPosData
