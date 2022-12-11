import dotChart from './dotChart.js'
function dotTable (nombre, dataset, idDivMain, idTable) {
  function getSrc (diff) {
    if (diff > 0) {
      return 'src/img/up.png'
    } else if (diff < 0) {
      return 'src/img/down.png'
    } else {
      return 'src/img/equal.png'
    }
  }
  function getChartDimensions () {
    const chartDimensions = { widthSq: 3, sep: 3 }
    if (divMain.clientWidth < 880) {
      chartDimensions.widthSq = 2
      chartDimensions.sep = 2
    }
    return chartDimensions
  }
  function getColor (diff) {
    if (diff > 0) {
      return '#4DFFC7'
    } else if (diff < 0) {
      return '#FF4D7A'
    } else {
      return 'black'
    }
  }
  function setEventTooltip () {
    const multiple = 1000
    const divTooltip = document.getElementById('tooltip')
    for (let i = 0; i < document.getElementsByTagName('canvas').length; i++) {
      document.getElementsByTagName('canvas')[i].onmousemove = function (e) {
        handleMouseMove()
        const x = event.pageX
        const y = event.pageY
        divTooltip.classList.remove('displayNone')
        divTooltip.style.left = x + 5 + 'px'
        divTooltip.style.top = y - 30 + 'px'
        const color = this.getAttribute('data-color')
        const votes = this.getAttribute('data-num')
        divTooltip.style.color = color
        divTooltip.style.fontWeight = 'bold'
        let textVar = ''
        if (this.classList.contains('canvas_abst')) {
          textVar = 'personas'
        } else {
          textVar = 'votantes'
        }
        divTooltip.innerHTML = Math.round(votes * multiple).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' <span style="font-weight:normal;">' + textVar + '</span>'
      }
      document.getElementsByTagName('canvas')[i].onmouseout = function () {
        divTooltip.classList.add('displayNone')
      }
    }

    for (let i = 0; i < document.getElementsByClassName('imgVar').length; i++) {
      document.getElementsByClassName('imgVar')[i].onmousemove = function (e) {
        handleMouseMove()
        const x = event.pageX
        const y = event.pageY
        divTooltip.classList.remove('displayNone')
        divTooltip.style.left = x + 5 + 'px'
        divTooltip.style.top = y - 30 + 'px'
        const color = this.getAttribute('data-color')
        const votes = this.getAttribute('data-num')
        divTooltip.style.color = color
        divTooltip.style.fontWeight = 'bold'
        divTooltip.innerHTML = Math.round(votes * multiple).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' <span style="font-weight:normal;">electores</span>'
      }
      document.getElementsByClassName('imgVar')[i].onmouseout = function () {
        divTooltip.classList.add('displayNone')
      }
    }
    function handleMouseMove (event) {
      // https://stackoverflow.com/questions/7790725/javascript-track-mouse-position
      let eventDoc, doc, body
      event = event || window.event
      if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document
        doc = eventDoc.documentElement
        body = eventDoc.body

        event.pageX = event.clientX +
          ((doc && doc.scrollLeft) || ((body && body.scrollLeft) || 0)) -
          ((doc && doc.clientLeft) || ((body && body.clientLeft) || 0))
        event.pageY = event.clientY +
          ((doc && doc.scrollTop) || ((body && body.scrollTop) || 0)) -
          ((doc && doc.clientTop) || ((body && body.clientTop) || 0))
      }
    }
  }
  const divMain = document.getElementById(idDivMain)
  const tableContainer = document.getElementById(idTable)
  const maxTableWidth = 480
  const noVizRowsWidth = 120
  const dotChartWidth = divMain.clientWidth > maxTableWidth
    ? divMain.clientWidth / 2 - noVizRowsWidth
    : maxTableWidth / 2 - noVizRowsWidth
  const chartDimensions = getChartDimensions()
  let abst
  let abstPrevious
  const colorAbst = '#767373'
  const table = document.createElement('table')
  tableContainer.textContent = ''
  tableContainer.appendChild(table)

  const tHead = document.createElement('thead')
  table.appendChild(tHead)

  const tRH = document.createElement('tr')
  tHead.appendChild(tRH)

  let tD = document.createElement('th')
  let tDText = document.createTextNode(nombre)
  tD.appendChild(tDText)

  tRH.appendChild(tD)
  tD = document.createElement('th')
  tDText = document.createTextNode('28-A')
  tD.appendChild(tDText)
  tRH.appendChild(tD)

  tD = document.createElement('th')
  tDText = document.createTextNode('10-N')
  tD.appendChild(tDText)
  tRH.appendChild(tD)

  tD = document.createElement('th')
  tDText = document.createTextNode('Variación')
  tD.appendChild(tDText)
  tRH.appendChild(tD)

  const tbody = document.createElement('tbody')
  table.appendChild(tbody)
  for (let i = 0; i < dataset.length; i++) {
    const tRB = document.createElement('tr')
    tbody.appendChild(tRB)

    const tD0 = document.createElement('td')
    const tD1 = document.createElement('td')
    const tD2 = document.createElement('td')
    const tD3 = document.createElement('td')
    tRB.appendChild(tD0)
    tRB.appendChild(tD1)
    tRB.appendChild(tD2)
    tRB.appendChild(tD3)

    const name = document.createTextNode(dataset[i].nombre)
    tD0.appendChild(name)
    tD0.style = 'font-weight:bold; color:' + dataset[i].color

    const canvasPrev = document.createElement('canvas')
    canvasPrev.classList.add('canvas_' + dataset[i].par_meta_id)
    canvasPrev.classList.add('canvas_10n')
    canvasPrev.setAttribute('width', dotChartWidth + 'px')
    canvasPrev.setAttribute('data-color', 'red')
    canvasPrev.setAttribute('data-num', dataset[i].votesPreviousNum)
    tD1.appendChild(canvasPrev)
    dotChart(dotChartWidth, canvasPrev, Math.round(dataset[i].votesPreviousNum), chartDimensions.sep, chartDimensions.widthSq, dataset[i].color)
    setEventTooltip()
    // tD1.style = 'width:'+(canvasPrev.width+30)+'px';
    tD1.style = 'width:' + (canvasPrev.width + 30) + 'px; height:' + (canvasPrev.height) + 'px'
    // IE
    tD1.width = canvasPrev.width + 30
    tD1.height = canvasPrev.height

    const canvasNow = document.createElement('canvas')
    canvasNow.classList.add('canvas_' + dataset[i].par_meta_id)
    canvasNow.classList.add('canvas_28a')
    canvasNow.setAttribute('width', dotChartWidth + 'px')
    canvasNow.setAttribute('data-color', 'red')
    canvasNow.setAttribute('data-num', dataset[i].votesNum)

    tD2.appendChild(canvasNow)
    dotChart(dotChartWidth, canvasNow, Math.round(dataset[i].votesNum), chartDimensions.sep, chartDimensions.widthSq, dataset[i].color)
    tD2.style = 'width:' + (canvasNow.width + 30) + 'px; height:' + (canvasNow.height) + 'px'
    // IE
    tD2.width = canvasNow.width + 30
    tD2.height = canvasNow.height

    const img = document.createElement('img')
    img.src = getSrc(dataset[i].dif)
    img.classList.add('imgVar')
    img.setAttribute('data-num', dataset[i].dif)
    img.setAttribute('data-color', getColor(dataset[i].dif))
    tD3.appendChild(img)
  }
  const tRB = document.createElement('tr')
  tbody.appendChild(tRB)

  const tD0 = document.createElement('td')
  const tD1 = document.createElement('td')
  const tD2 = document.createElement('td')
  const tD3 = document.createElement('td')
  tRB.appendChild(tD0)
  tRB.appendChild(tD1)
  tRB.appendChild(tD2)
  tRB.appendChild(tD3)

  const name = document.createTextNode('Abstención')
  tD0.appendChild(name)

  const canvasAbstPrev = document.createElement('canvas')
  canvasAbstPrev.classList.add('canvas_abst')
  canvasAbstPrev.setAttribute('width', dotChartWidth + 'px')
  canvasAbstPrev.setAttribute('data-color', 'black')
  canvasAbstPrev.setAttribute('data-num', abstPrevious)
  tD1.appendChild(canvasAbstPrev)
  dotChart(dotChartWidth, canvasAbstPrev, Math.round(abstPrevious), chartDimensions.sep, chartDimensions.widthSq, colorAbst)
  // tD1.style = 'width:'+(canvasNow.width+30)+'px';
  tD1.style = 'width:' + (canvasAbstPrev.width + 30) + 'px; height:' + (canvasAbstPrev.height) + 'px'
  // IE
  tD1.width = canvasAbstPrev.width + 30
  tD1.height = canvasAbstPrev.height

  const canvasAbstNow = document.createElement('canvas')
  canvasAbstNow.classList.add('canvas_abst')
  canvasAbstNow.setAttribute('width', dotChartWidth + 'px')
  canvasAbstNow.setAttribute('data-color', 'black')
  canvasAbstNow.setAttribute('data-num', abst)
  tD2.appendChild(canvasAbstNow)
  dotChart(dotChartWidth, canvasAbstNow, Math.round(abst), chartDimensions.sep, chartDimensions.widthSq, colorAbst)
  // tD1.style = 'width:'+(canvasNow.width+30)+'px';
  tD2.style = 'width:' + (canvasAbstNow.width + 30) + 'px; height:' + (canvasAbstNow.height) + 'px'
  // IE
  tD2.width = canvasAbstNow.width + 30
  tD2.height = canvasAbstNow.height

  const img = document.createElement('img')
  img.src = getSrc(abst - abstPrevious)
  img.classList.add('imgVar')
  img.setAttribute('data-num', (abst - abstPrevious))
  img.setAttribute('data-color', getColor(abst - abstPrevious))
  tD3.appendChild(img)
}
export { dotTable }
