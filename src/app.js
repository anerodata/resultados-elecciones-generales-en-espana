function app () {
  const $divMain = document.getElementById('main')
  const $divContent = document.getElementById('content')
  const prov = [{ Código: '28', Literal: 'Madrid', Index: '1' }, { Código: '08', Literal: 'Barcelona', Index: '2' }, { Código: '46', Literal: 'Valencia', Index: '3' }, { Código: '41', Literal: 'Sevilla', Index: '4' }, { Código: '03', Literal: 'Alicante', Index: '5' }, { Código: '29', Literal: 'Málaga', Index: '6' }, { Código: '30', Literal: 'Murcia', Index: '7' }, { Código: '11', Literal: 'Cádiz', Index: '8' }, { Código: '07', Literal: 'Baleares', Index: '9' }, { Código: '48', Literal: 'Vizcaya', Index: '10' }, { Código: '35', Literal: 'Las Palmas', Index: '11' }, { Código: '15', Literal: 'A Coruña', Index: '12' }, { Código: '38', Literal: 'Santa Cruz de Tenerife', Index: '13' }, { Código: '33', Literal: 'Asturias', Index: '14' }, { Código: '50', Literal: 'Zaragoza', Index: '15' }, { Código: '36', Literal: 'Pontevedra', Index: '16' }, { Código: '18', Literal: 'Granada', Index: '17' }, { Código: '43', Literal: 'Tarragona', Index: '18' }, { Código: '14', Literal: 'Córdoba', Index: '19' }, { Código: '17', Literal: 'Gerona', Index: '20' }, { Código: '20', Literal: 'Gipúzcoa', Index: '21' }, { Código: '04', Literal: 'Almería', Index: '22' }, { Código: '45', Literal: 'Toledo', Index: '23' }, { Código: '06', Literal: 'Badajoz', Index: '24' }, { Código: '31', Literal: 'Navarra', Index: '25' }, { Código: '23', Literal: 'Jaén', Index: '26' }, { Código: '39', Literal: 'Cantabria', Index: '27' }, { Código: '12', Literal: 'Castellón', Index: '28' }, { Código: '21', Literal: 'Huelva', Index: '29' }, { Código: '47', Literal: 'Valladolid', Index: '30' }, { Código: '13', Literal: 'Ciudad Real', Index: '31' }, { Código: '24', Literal: 'León', Index: '32' }, { Código: '25', Literal: 'Lérida', Index: '33' }, { Código: '10', Literal: 'Cáceres', Index: '34' }, { Código: '02', Literal: 'Albacete', Index: '35' }, { Código: '09', Literal: 'Burgos', Index: '36' }, { Código: '37', Literal: 'Salamanca', Index: '37' }, { Código: '27', Literal: 'Lugo', Index: '38' }, { Código: '01', Literal: 'Álava', Index: '39' }, { Código: '26', Literal: 'La Rioja', Index: '40' }, { Código: '32', Literal: 'Ourense', Index: '41' }, { Código: '19', Literal: 'Guadalajara', Index: '42' }, { Código: '22', Literal: 'Huesca', Index: '43' }, { Código: '16', Literal: 'Cuenca', Index: '44' }, { Código: '49', Literal: 'Zamora', Index: '45' }, { Código: '34', Literal: 'Palencia', Index: '46' }, { Código: '05', Literal: 'Ávila', Index: '47' }, { Código: '40', Literal: 'Segovia', Index: '48' }, { Código: '44', Literal: 'Teruel', Index: '49' }, { Código: '42', Literal: 'Soria', Index: '50' }, { Código: '51', Literal: 'Ceuta', Index: '51' }, { Código: '52', Literal: 'Melilla', Index: '52' }]
  const selectProv = prov
  let start = 0
  let limit = 5
  let count

  provTable = get_prov_table()

  const party = [
    {
      Partido: 'PP',
      Código: 38
    },
    {
      Partido: 'PSOE',
      Código: 40
    },
    {
      Partido: 'VOX',
      Código: 52
    },
    {
      Partido: 'Cs',
      Código: 10
    },
    {
      Partido: 'Unidas Podemos',
      Código: 37
    },
    {
      Partido: 'Más País',
      Código: 12578
    },

    {
      Partido: 'En Común Podem',
      Código: 14
    },

    {
      Partido: 'ERC',
      Código: 17
    },

    {
      Partido: 'JxCat',
      Código: 691
    },

    {
      Partido: 'CUP',
      Código: 508
    },

    {
      Partido: 'PNV',
      Código: 478
    },

    {
      Partido: 'Bildu',
      Código: 15
    },

    {
      Partido: 'PRC',
      Código: 115
    },

    {
      Partido: 'CC',
      Código: 4
    },

    {
      Partido: 'BNG',
      Código: 90
    },

    {
      Partido: 'Teruel Existe',
      Código: 12579
    },

    {
      Partido: 'NA+',
      Código: 692
    }

    // ERC, JUNTS, CUP  -  PNV, BILDU  -  PRC  -  CC  -  BNG  -  TERUEL EXISTE  -  NA+
  ]
  // select
  const $select = document.getElementById('select')
  const $divTooltip = document.getElementById('tooltip')
  // cuadros
  let width
  let widthSq = 3
  let sep = 3
  let dataset
  let abst
  let abstPrevious

  // dataset
  const multiple = 1000
  const colorAbst = '#767373'
  if ($divMain.clientWidth < 373) {
    width = 60
    widthSq = 1.5
    sep = 1.2
  } else if ($divMain.clientWidth < 430) {
    width = 90
    widthSq = 1.2
    sep = 1.2
  } else if ($divMain.clientWidth < 480) {
    width = 110
    widthSq = 1.7
    sep = 1.7
  } else if ($divMain.clientWidth < 640) {
    width = 150
    widthSq = 1.7
    sep = 1.7
  } else if ($divMain.clientWidth < 825) {
    widthSq = 1.7
    sep = 1.7
    width = 210
  } else if ($divMain.clientWidth < 890) {
    widthSq = 2
    sep = 2
    width = 300
  } else {
    width = 350
    widthSq = 3
    sep = 3
  }// width = 300; 825

  get_select()
  app()
  get_event_tooltip()
  get_event_btn()
  get_event_select()

  function app () {
    for (let i = 0; i < provTable.length; i++) {
      for (let j = 0; j < prov.length; j++) {
        if (prov[j]['Código'] === provTable[i]['Código']) {
          prov[j].drawn = true
        }
      }
      /* var $div = create_div_prov('01');
    dataset = get_dataset(data, '01');
    feed_table_mvl('01', 'Pepito');
    set_height() */

      const $div = create_div_prov(provTable[i]['Código'])// REMOTO
      get_data($div.id.split('_')[1], provTable[i].Literal)// REMOTO
    }
  }

  function get_event_tooltip () {
    for (var i = 0; i < document.getElementsByTagName('canvas').length; i++) {
      document.getElementsByTagName('canvas')[i].onmousemove = function (e) {
        handleMouseMove()
        const x = event.pageX
        const y = event.pageY
        $divTooltip.classList.remove('displayNone')
        $divTooltip.style.left = x + 5 + 'px'
        $divTooltip.style.top = y - 30 + 'px'
        const color = this.getAttribute('data-color')
        const votes = this.getAttribute('data-num')
        $divTooltip.style.color = color
        $divTooltip.style.fontWeight = 'bold'
        let textVar = ''
        if (this.classList.contains('canvas_abst')) {
          textVar = 'personas'
        } else {
          textVar = 'votantes'
        }

        $divTooltip.innerHTML = Math.round(votes * multiple).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' <span style="font-weight:normal;">' + textVar + '</span>'
      }

      document.getElementsByTagName('canvas')[i].onmouseout = function () {
        $divTooltip.classList.add('displayNone')
      }
    }

    for (var i = 0; i < document.getElementsByClassName('imgVar').length; i++) {
      document.getElementsByClassName('imgVar')[i].onmousemove = function (e) {
        handleMouseMove()
        const x = event.pageX
        const y = event.pageY
        $divTooltip.classList.remove('displayNone')
        $divTooltip.style.left = x + 5 + 'px'
        $divTooltip.style.top = y - 30 + 'px'
        const color = this.getAttribute('data-color')
        const votes = this.getAttribute('data-num')
        $divTooltip.style.color = color
        $divTooltip.style.fontWeight = 'bold'
        $divTooltip.innerHTML = Math.round(votes * multiple).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' <span style="font-weight:normal;">electores</span>'
      }

      document.getElementsByClassName('imgVar')[i].onmouseout = function () {
        $divTooltip.classList.add('displayNone')
      }
    }
  }

  function get_prov_table () {
    const res = []
    for (let i = start; i < limit; i++) {
      if (prov[i] !== undefined) {
        if (prov[i].drawn) {
          limit += 1
          start += 1
        } else {
          res.push(prov[i])
        }
      }
    }
    return res
    // return prov.slice(start,limit);
  }

  function get_event_btn () {
    document.getElementById('more').onclick = function () {
      start += 5
      limit += 5
      provTable = get_prov_table()
      app()
      if (provTable[provTable.length - 1] === prov[prov.length - 1]) {
        this.style = 'display:none;'
      }
    }
  }

  function get_event_select () {
    document.getElementById('select').onchange = function () {
      for (let i = 0; i < prov.length; i++) {
        if (this.value === 'prov_' + prov[i]['Código']) {
          if (prov[i].drawn === undefined) {
            console.log('no esta dibujada')
            get_data(prov[i]['Código'], prov[i].Literal, 'up')
            prov[i].drawnSelect = true
            prov[i].drawn = true
          } else {
            console.log('sí esta dibujada')
            repos_div(this.value)
          }
        }
      }
    }
  }

  function repos_div (idDiv) {
    const $divProv = document.getElementById(idDiv)
    return $divContent.insertBefore($divProv, $divContent.childNodes[2])
  }

  function create_div_prov (id) {
    const $div = document.createElement('div')
    $div.classList.add('prov')
    $div.id = 'prov_' + id
    $divContent.appendChild($div)
    return $div
  }

  function insertAndShift (arr, from, to) {
    const cutOut = arr.splice(from, 1)[0] // cut the element at index 'from'
    arr.splice(to, 0, cutOut) // insert it at index 'to'
  }

  function get_select () {
    selectProv.sort(function (a, b) {
      if (a.Literal > b.Literal) {
        return 1
      } else if (a.Literal < b.Literal) {
        return -1
      } else {
        return 0
      }
    })
    insertAndShift(selectProv, 50, 1)
    insertAndShift(selectProv, 51, 6)
    let html = '<select>'
    for (let i = 0; i < selectProv.length; i++) {
      html += '<option value="prov_' + prov[i]['Código'] + '" >' + prov[i].Literal + '</option>'
      // get_ajax(prov[i]['Código']);
    }

    selectProv.sort(function (a, b) {
      if (a.Index > b.Index) {
        return 1
      } else if (a.Index < b.Index) {
        return -1
      } else {
        return 0
      }
    })
    $select.innerHTML = html
  }

  function get_data (codigo, nombre, mode) {
    // var url = 'https://api.elconfidencial.com/service/electionsscytl/place/34/'+codigo+'/?compareTo=38';
    const url = 'https://api.elconfidencial.com/service/electionsscytl/place/84/' + codigo + '/?compareTo=38'
    const xhttp = new XMLHttpRequest()
    if (window.XMLHttpRequest) {
      // code for modern browsers
      xmlhttp = new XMLHttpRequest()
    } else {
      // code for old IE browsers
      xmlhttp = new ActiveXObject('Microsoft.XMLHTTP')
    }
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        data = JSON.parse(this.responseText)
        // var $div = create_div_prov(codigo);
        dataset = get_dataset(data, codigo)
        if (mode === 'up') {
          const $div = create_div_prov(codigo)
          repos_div('prov_' + codigo)
        }
        feed_table_mvl(codigo, nombre)
        set_height()
        get_event_tooltip()
      }
    }
    xhttp.open('GET', url, true)
    xhttp.send()
  }

  function get_dataset (data, codigo) {
    const placePrevious = data.data.placePrevious[codigo].results
    const places = data.data.places[codigo].results
    let parMetaId
    const res = []
    abst = data.data.places[codigo].participation.par_abstention / multiple
    abstPrevious = data.data.placePrevious[codigo].participation.par_abstention / multiple
    count = data.data.places[codigo].participation.par_percent_counted

    for (var i = 0; i < places.length; i++) {
      parMetaId = places[i].res_party.par_meta_id

      party.forEach(function (d) {
        if (d['Código'] === parMetaId) {
          res.push({
            nombre: places[i].res_party.par_meta_alias,
            color: places[i].res_party.par_color,
            votesNum: places[i].res_votes / multiple,
            votesPreviousNum: places[i].res_votes_previous / multiple,
            par_meta_id: d['Código'],
            dif: places[i].res_votes / multiple - places[i].res_votes_previous / multiple
          })
        }
      })
    }
    res.sort(function (a, b) {
      if (a.votesNum < b.votesNum) {
        return 1
      } else if (a.votesNum > b.votesNum) {
        return -1
      } else {
        return 0
      }
    })
    return res
  }

  function get_src (diff) {
    if (diff > 0) {
      return 'src/img/up.png'
    } else if (diff < 0) {
      return 'src/img/down.png'
    } else {
      return 'src/img/equal.png'
    }
  }

  function get_color (diff) {
    if (diff > 0) {
      return '#4DFFC7'
    } else if (diff < 0) {
      return '#FF4D7A'
    } else {
      return 'black'
    }
  }

  function set_height () {
    nHeight = document.getElementsByTagName('body')[0].clientHeight
    window.parent.postMessage({
      sentinel: 'amp',
      type: 'embed-size',
      height: nHeight + 150
    }, '*')
  }

  function feed_table_mvl (idProv, nombre) {
    const $table = document.createElement('table')
    document.getElementById('prov_' + idProv).appendChild($table)

    const $tHead = document.createElement('thead')
    $table.appendChild($tHead)

    const $tRH = document.createElement('tr')
    $tHead.appendChild($tRH)

    let $tD = document.createElement('th')
    let $tDText = document.createTextNode(nombre + ' (al ' + String(count).replace('.', ',') + '%)')
    $tD.appendChild($tDText)

    $tRH.appendChild($tD)
    $tD = document.createElement('th')
    $tDText = document.createTextNode('28-A')
    $tD.appendChild($tDText)
    $tRH.appendChild($tD)

    $tD = document.createElement('th')
    $tDText = document.createTextNode('10-N')
    $tD.appendChild($tDText)
    $tRH.appendChild($tD)

    $tD = document.createElement('th')
    $tDText = document.createTextNode('Variación')
    $tD.appendChild($tDText)
    $tRH.appendChild($tD)

    const $tbody = document.createElement('tbody')
    $table.appendChild($tbody)
    for (let i = 0; i < dataset.length; i++) {
      var $tRB = document.createElement('tr')
      $tbody.appendChild($tRB)

      var $tD0 = document.createElement('td')
      var $tD1 = document.createElement('td')
      var $tD2 = document.createElement('td')
      var $tD3 = document.createElement('td')
      $tRB.appendChild($tD0)
      $tRB.appendChild($tD1)
      $tRB.appendChild($tD2)
      $tRB.appendChild($tD3)

      var name = document.createTextNode(dataset[i].nombre)
      $tD0.appendChild(name)
      $tD0.style = 'font-weight:bold; color:' + dataset[i].color

      const $canvasPrev = document.createElement('canvas')
      $canvasPrev.classList.add('canvas_' + dataset[i].par_meta_id)
      $canvasPrev.classList.add('canvas_10n')
      $canvasPrev.setAttribute('width', width + 'px')
      $canvasPrev.setAttribute('data-color', dataset[i].color)
      $canvasPrev.setAttribute('data-num', dataset[i].votesPreviousNum)
      $tD1.appendChild($canvasPrev)
      get_chart(width, $canvasPrev, Math.round(dataset[i].votesPreviousNum), sep, widthSq, dataset[i].color)
      // $tD1.style = 'width:'+($canvasPrev.width+30)+'px';
      $tD1.style = 'width:' + ($canvasPrev.width + 30) + 'px; height:' + ($canvasPrev.height) + 'px'
      // IE
      $tD1.width = $canvasPrev.width + 30
      $tD1.height = $canvasPrev.height

      const $canvasNow = document.createElement('canvas')
      $canvasNow.classList.add('canvas_' + dataset[i].par_meta_id)
      $canvasNow.classList.add('canvas_28a')
      $canvasNow.setAttribute('width', width + 'px')
      $canvasNow.setAttribute('data-color', dataset[i].color)
      $canvasNow.setAttribute('data-num', dataset[i].votesNum)

      $tD2.appendChild($canvasNow)
      get_chart(width, $canvasNow, Math.round(dataset[i].votesNum), sep, widthSq, dataset[i].color)
      $tD2.style = 'width:' + ($canvasNow.width + 30) + 'px; height:' + ($canvasNow.height) + 'px'
      // IE
      $tD2.width = $canvasNow.width + 30
      $tD2.height = $canvasNow.height

      var $img = document.createElement('img')
      $img.src = get_src(dataset[i].dif)
      $img.classList.add('imgVar')
      $img.setAttribute('data-num', dataset[i].dif)
      $img.setAttribute('data-color', get_color(dataset[i].dif))
      $tD3.appendChild($img)
    }
    var $tRB = document.createElement('tr')
    $tbody.appendChild($tRB)

    $tD0 = document.createElement('td')
    $tD1 = document.createElement('td')
    $tD2 = document.createElement('td')
    $tD3 = document.createElement('td')
    $tRB.appendChild($tD0)
    $tRB.appendChild($tD1)
    $tRB.appendChild($tD2)
    $tRB.appendChild($tD3)

    var name = document.createTextNode('Abstención')
    $tD0.appendChild(name)

    const $canvasAbstPrev = document.createElement('canvas')
    $canvasAbstPrev.classList.add('canvas_abst')
    $canvasAbstPrev.setAttribute('width', width + 'px')
    $canvasAbstPrev.setAttribute('data-color', 'black')
    $canvasAbstPrev.setAttribute('data-num', abstPrevious)
    $tD1.appendChild($canvasAbstPrev)
    get_chart(width, $canvasAbstPrev, Math.round(abstPrevious), sep, widthSq, colorAbst)
    // $tD1.style = 'width:'+($canvasNow.width+30)+'px';
    $tD1.style = 'width:' + ($canvasAbstPrev.width + 30) + 'px; height:' + ($canvasAbstPrev.height) + 'px'
    // IE
    $tD1.width = $canvasAbstPrev.width + 30
    $tD1.height = $canvasAbstPrev.height

    const $canvasAbstNow = document.createElement('canvas')
    $canvasAbstNow.classList.add('canvas_abst')
    $canvasAbstNow.setAttribute('width', width + 'px')
    $canvasAbstNow.setAttribute('data-color', 'black')
    $canvasAbstNow.setAttribute('data-num', abst)
    $tD2.appendChild($canvasAbstNow)
    get_chart(width, $canvasAbstNow, Math.round(abst), sep, widthSq, colorAbst)
    // $tD1.style = 'width:'+($canvasNow.width+30)+'px';
    $tD2.style = 'width:' + ($canvasAbstNow.width + 30) + 'px; height:' + ($canvasAbstNow.height) + 'px'
    // IE
    $tD2.width = $canvasAbstNow.width + 30
    $tD2.height = $canvasAbstNow.height

    $img = document.createElement('img')
    $img.src = get_src(abst - abstPrevious)
    $img.classList.add('imgVar')
    $img.setAttribute('data-num', (abst - abstPrevious))
    $img.setAttribute('data-color', get_color(abst - abstPrevious))
    $tD3.appendChild($img)
  }

  function handleMouseMove (event) {
    // https://stackoverflow.com/questions/7790725/javascript-track-mouse-position
    let dot, eventDoc, doc, body, pageX, pageY
    event = event || window.event // IE-ism
    // If pageX/Y aren't available and clientX/Y
    // are, calculate pageX/Y - logic taken from jQuery
    // Calculate pageX/Y if missing and clientX/Y available
    if (event.pageX == null && event.clientX != null) {
      eventDoc = (event.target && event.target.ownerDocument) || document
      doc = eventDoc.documentElement
      body = eventDoc.body

      event.pageX = event.clientX +
        (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
        (doc && doc.clientLeft || body && body.clientLeft || 0)
      event.pageY = event.clientY +
        (doc && doc.scrollTop || body && body.scrollTop || 0) -
        (doc && doc.clientTop || body && body.clientTop || 0)
    }
  }
}

export default app
