import { provinces } from './constants.js'
import buildChart from './chart.js'
function app () {
  buildSelect()
  const divMain = document.getElementById('main')
  const maxTableWidth = 480
  const noVizRowsWidth = 120
  init()
  window.onresize = function () {
    document.getElementById('prov_02').innerHTML = ''
    init()
  }
  function init () {
    const chartDimensions = getChartDimensions()
    const width = divMain.clientWidth > maxTableWidth
      ? divMain.clientWidth / 2 - noVizRowsWidth
      : maxTableWidth / 2 - noVizRowsWidth
    const dataset = getData('02', provinces[0].name, width, chartDimensions.widthSq, chartDimensions.sep)
    buildTable('02', provinces[0].name, width, chartDimensions.widthSq, chartDimensions.sep, dataset)
    setEventTooltip()
    setEventSelect('02', provinces[0].name, width, chartDimensions.widthSq, chartDimensions.sep)
  }
  function getChartDimensions () {
    const chartDimensions = { widthSq: 3, sep: 3 }
    if (divMain.clientWidth < 880) {
      chartDimensions.widthSq = 2
      chartDimensions.sep = 2
    }
    return chartDimensions
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
      event = event || window.event // IE-ism
      // If pageX/Y aren't available and clientX/Y
      // are, calculate pageX/Y - logic taken from jQuery
      // Calculate pageX/Y if missing and clientX/Y available
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

  function setEventSelect (codigo, nombre, width, widthSq, sep) {
    document.getElementById('select').onchange = function (el) {
      for (let i = 0; i < provinces.length; i++) {
        if (this.value.split('prov_')[1] === provinces[i].code) {
          document.getElementById('prov_02').innerHTML = ''
          const dataset = getData(codigo, provinces[i].name, width, widthSq, sep)// REMOTO
          buildTable(codigo, provinces[i].name, width, widthSq, sep, dataset)
          setEventTooltip()
        }
      }
    }
  }

  function buildSelect () {
    const select = document.getElementById('select')
    let html = ''
    provinces.forEach(d => {
      html += '<option value="prov_' + d.code + '" >' + d.name + '</option>'
    })
    select.innerHTML = html
  }

  function getData (codigo, nombre, width, widthSq, sep) {
    const dataset = [
      {
        nombre: 'Unidas Podemos',
        color: 'red',
        votesNum: 2000,
        votesPreviousNum: 31.346,
        par_meta_id: 37,
        dif: 20.480999999999998
      },
      {
        nombre: 'PP',
        color: '#C6A15B',
        votesNum: 34.276,
        votesPreviousNum: 24.304,
        par_meta_id: 38,
        dif: 9.972000000000005
      },
      {
        nombre: 'PSOE',
        color: '#C6A15B',
        votesNum: 26.381,
        votesPreviousNum: 39.595,
        par_meta_id: 40,
        dif: -13.213999999999999
      },
      {
        nombre: 'EH Bildu',
        color: '#C6A15B',
        votesNum: 15.858,
        votesPreviousNum: 24.687,
        par_meta_id: 15,
        dif: -8.829
      },
      {
        nombre: 'Cs',
        color: '#C6A15B',
        votesNum: 8.372,
        votesPreviousNum: 7.039,
        par_meta_id: 10,
        dif: 1.3330000000000002
      },
      {
        nombre: 'Vox',
        color: '#C6A15B',
        votesNum: 0.306,
        votesPreviousNum: 5.587,
        par_meta_id: 52,
        dif: -5.281
      }
    ]
    return dataset
  }

  function buildTable (idProv, nombre, width, widthSq, sep, dataset) {
    let abst
    let abstPrevious
    // dataset
    const colorAbst = '#767373'
    function getSrc (diff) {
      if (diff > 0) {
        return 'src/img/up.png'
      } else if (diff < 0) {
        return 'src/img/down.png'
      } else {
        return 'src/img/equal.png'
      }
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
    const table = document.createElement('table')
    document.getElementById('prov_' + idProv).appendChild(table)

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
      canvasPrev.setAttribute('width', width + 'px')
      canvasPrev.setAttribute('data-color', 'red')
      canvasPrev.setAttribute('data-num', dataset[i].votesPreviousNum)
      tD1.appendChild(canvasPrev)
      buildChart(width, canvasPrev, Math.round(dataset[i].votesPreviousNum), sep, widthSq, dataset[i].color)
      // tD1.style = 'width:'+(canvasPrev.width+30)+'px';
      tD1.style = 'width:' + (canvasPrev.width + 30) + 'px; height:' + (canvasPrev.height) + 'px'
      // IE
      tD1.width = canvasPrev.width + 30
      tD1.height = canvasPrev.height

      const canvasNow = document.createElement('canvas')
      canvasNow.classList.add('canvas_' + dataset[i].par_meta_id)
      canvasNow.classList.add('canvas_28a')
      canvasNow.setAttribute('width', width + 'px')
      canvasNow.setAttribute('data-color', 'red')
      canvasNow.setAttribute('data-num', dataset[i].votesNum)

      tD2.appendChild(canvasNow)
      buildChart(width, canvasNow, Math.round(dataset[i].votesNum), sep, widthSq, dataset[i].color)
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
    canvasAbstPrev.setAttribute('width', width + 'px')
    canvasAbstPrev.setAttribute('data-color', 'black')
    canvasAbstPrev.setAttribute('data-num', abstPrevious)
    tD1.appendChild(canvasAbstPrev)
    buildChart(width, canvasAbstPrev, Math.round(abstPrevious), sep, widthSq, colorAbst)
    // tD1.style = 'width:'+(canvasNow.width+30)+'px';
    tD1.style = 'width:' + (canvasAbstPrev.width + 30) + 'px; height:' + (canvasAbstPrev.height) + 'px'
    // IE
    tD1.width = canvasAbstPrev.width + 30
    tD1.height = canvasAbstPrev.height

    const canvasAbstNow = document.createElement('canvas')
    canvasAbstNow.classList.add('canvas_abst')
    canvasAbstNow.setAttribute('width', width + 'px')
    canvasAbstNow.setAttribute('data-color', 'black')
    canvasAbstNow.setAttribute('data-num', abst)
    tD2.appendChild(canvasAbstNow)
    buildChart(width, canvasAbstNow, Math.round(abst), sep, widthSq, colorAbst)
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
}

export default app
