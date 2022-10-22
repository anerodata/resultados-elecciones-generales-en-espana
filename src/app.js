import * as d3 from 'd3'
function get_chart (width, $canvas, numNodes, sep, widthSq, color) {
  var width = width
  let height = 0
  var sep = sep
  var color = color
  var $canvas = $canvas
  let customBase
  let custom

  customBase = document.createElement('custom')
  customBase.id = 'custom'
  get_model(d3.select(customBase))
  draw($canvas, d3.select(customBase))
  function get_model (custom) {
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

function app () {
  const $divMain = document.getElementById('main')
  const $divContent = document.getElementById('content')
  const prov = [{ Código: '28', Literal: 'Madrid', Index: '1' }]
  const selectProv = prov
  let start = 0
  let limit = 5
  let count

  let provTable = get_prov_table()

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
    console.log(selectProv)
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
    // var $div = create_div_prov(codigo);
    const data = {
      status: true,
      message: null,
      time: 1572897053,
      format: 'json',
      options: [],
      callback: null,
      trace: null,
      data: {
        places: {
          28: {
            pla_encode_name: 'pais-vascoaraba-alava',
            pla_url: 'https://www.elconfidencial.dev/elecciones-generales/resultado-34/pais-vasco/araba-alava/',
            pla_name: 'Araba/Álava',
            pla_typ_id: 3,
            pla_ele_id: 34,
            pla_id: '28',
            pla_parent_id: 'CA16',
            total_members: 4,
            participation: {
              par_pla_id: 1,
              par_abstention: 85248,
              par_percent_abstention: 33.49,
              par_blank_votes: 1078,
              par_percent_blank_votes: 0.64,
              par_null_votes: 1691,
              par_percent_null_votes: 1,
              par_total_votes: 169331,
              par_percent_total_votes: 66.51,
              par_percent_counted: 100
            },
            results: [
              {
                res_par_ele_id: 34,
                res_par_id: 54,
                res_pla_id: 1,
                res_votes: 51827,
                res_percent_votes: 30.92,
                res_members: 1,
                res_party: {
                  par_id: 54,
                  par_parent_id: 59,
                  par_ele_id: 34,
                  par_name: 'Unidos Podemos ',
                  par_alias: 'Unidos Podemos ',
                  par_color: '#C6A15B',
                  par_img: null,
                  par_data: null,
                  par_superparty_id: 59,
                  par_superparty_name: 'Unidos Podemos',
                  par_superparty_alias: 'Unidos Podemos',
                  par_meta_id: 37,
                  par_meta_name: 'Unidas Podemos',
                  par_meta_alias: 'Unidas Podemos'
                },
                res_votes_previous: 31346,
                res_percent_votes_previous: 17.73,
                res_members_previous: 1
              },
              {
                res_par_ele_id: 34,
                res_par_id: 68,
                res_pla_id: 1,
                res_votes: 34276,
                res_percent_votes: 20.45,
                res_members: 1,
                res_party: {
                  par_id: 68,
                  par_parent_id: null,
                  par_ele_id: 34,
                  par_name: 'Partido Popular',
                  par_alias: 'PP',
                  par_color: '#C6A15B',
                  par_img: null,
                  par_data: null,
                  par_superparty_id: 68,
                  par_superparty_name: 'Partido Popular',
                  par_superparty_alias: 'PP',
                  par_meta_id: 38,
                  par_meta_name: 'Partido Popular',
                  par_meta_alias: 'PP'
                },
                res_votes_previous: 24304,
                res_percent_votes_previous: 13.75,
                res_members_previous: 0
              },
              {
                res_par_ele_id: 34,
                res_par_id: 16,
                res_pla_id: 1,
                res_votes: 26703,
                res_percent_votes: 15.93,
                res_members: 1,
                res_party: {
                  par_id: 16,
                  par_parent_id: null,
                  par_ele_id: 34,
                  par_name: 'Partido Nacionalista Vasco',
                  par_alias: 'PNV',
                  par_color: '#C6A15B',
                  par_img: null,
                  par_data: null,
                  par_superparty_id: 16,
                  par_superparty_name: 'Partido Nacionalista Vasco',
                  par_superparty_alias: 'PNV',
                  par_meta_id: 11,
                  par_meta_name: 'Partido Nacionalista Vasco',
                  par_meta_alias: 'PNV'
                },
                res_votes_previous: 40199,
                res_percent_votes_previous: 22.74,
                res_members_previous: 1
              },
              {
                res_par_ele_id: 34,
                res_par_id: 76,
                res_pla_id: 1,
                res_votes: 26381,
                res_percent_votes: 15.74,
                res_members: 1,
                res_party: {
                  par_id: 76,
                  par_parent_id: 77,
                  par_ele_id: 34,
                  par_name: 'Partido Socialista de Euskadi ',
                  par_alias: 'PSE-PSOE',
                  par_color: '#C6A15B',
                  par_img: null,
                  par_data: null,
                  par_superparty_id: 77,
                  par_superparty_name: 'Partido Socialista Obrero Español',
                  par_superparty_alias: 'PSOE',
                  par_meta_id: 40,
                  par_meta_name: 'Partido Socialista Obrero Español',
                  par_meta_alias: 'PSOE'
                },
                res_votes_previous: 39595,
                res_percent_votes_previous: 22.4,
                res_members_previous: 1
              },
              {
                res_par_ele_id: 34,
                res_par_id: 23,
                res_pla_id: 1,
                res_votes: 15858,
                res_percent_votes: 9.46,
                res_members: 0,
                res_party: {
                  par_id: 23,
                  par_parent_id: null,
                  par_ele_id: 34,
                  par_name: 'Euskal Herria Bildu',
                  par_alias: 'EH Bildu',
                  par_color: '#C6A15B',
                  par_img: null,
                  par_data: null,
                  par_superparty_id: 23,
                  par_superparty_name: 'Euskal Herria Bildu',
                  par_superparty_alias: 'EH Bildu',
                  par_meta_id: 15,
                  par_meta_name: 'Euskal Herria Bildu',
                  par_meta_alias: 'EH Bildu'
                },
                res_votes_previous: 24687,
                res_percent_votes_previous: 13.96,
                res_members_previous: 1
              },
              {
                res_par_ele_id: 34,
                res_par_id: 13,
                res_pla_id: 1,
                res_votes: 8372,
                res_percent_votes: 4.99,
                res_members: 0,
                res_party: {
                  par_id: 13,
                  par_parent_id: null,
                  par_ele_id: 34,
                  par_name: 'Ciudadanos ',
                  par_alias: 'Cs',
                  par_color: '#C6A15B',
                  par_img: null,
                  par_data: null,
                  par_superparty_id: 13,
                  par_superparty_name: 'Ciudadanos ',
                  par_superparty_alias: 'Cs',
                  par_meta_id: 10,
                  par_meta_name: 'Ciudadanos ',
                  par_meta_alias: 'Cs'
                },
                res_votes_previous: 7039,
                res_percent_votes_previous: 3.98,
                res_members_previous: 0
              },
              {
                res_par_ele_id: 34,
                res_par_id: 41,
                res_pla_id: 1,
                res_votes: 1657,
                res_percent_votes: 0.99,
                res_members: 0,
                res_party: {
                  par_id: 41,
                  par_parent_id: null,
                  par_ele_id: 34,
                  par_name: 'Partido Animalista Contra el Maltrato Animal',
                  par_alias: 'PACMA',
                  par_color: '#C6A15B',
                  par_img: null,
                  par_data: null,
                  par_superparty_id: 41,
                  par_superparty_name: 'Partido Animalista Contra el Maltrato Animal',
                  par_superparty_alias: 'PACMA',
                  par_meta_id: 29,
                  par_meta_name: 'Partido Animalista Contra el Maltrato Animal',
                  par_meta_alias: 'PACMA'
                },
                res_votes_previous: 1863,
                res_percent_votes_previous: 1.05,
                res_members_previous: 0
              },
              {
                res_par_ele_id: 34,
                res_par_id: 81,
                res_pla_id: 1,
                res_votes: 599,
                res_percent_votes: 0.36,
                res_members: 0,
                res_party: {
                  par_id: 81,
                  par_parent_id: null,
                  par_ele_id: 34,
                  par_name: 'Recortes Cero - Grupo Verde',
                  par_alias: 'Recortes Cero - Grupo Verde',
                  par_color: '#C6A15B',
                  par_img: null,
                  par_data: null,
                  par_superparty_id: 81,
                  par_superparty_name: 'Recortes Cero - Grupo Verde',
                  par_superparty_alias: 'Recortes Cero - Grupo Verde',
                  par_meta_id: 43,
                  par_meta_name: 'Recortes Cero - Grupo Verde',
                  par_meta_alias: 'Recortes Cero - Grupo Verde'
                },
                res_votes_previous: 533,
                res_percent_votes_previous: 0.3,
                res_members_previous: 0
              },
              {
                res_par_ele_id: 34,
                res_par_id: 94,
                res_pla_id: 1,
                res_votes: 306,
                res_percent_votes: 0.18,
                res_members: 0,
                res_party: {
                  par_id: 94,
                  par_parent_id: null,
                  par_ele_id: 34,
                  par_name: 'Vox',
                  par_alias: 'Vox',
                  par_color: '#C6A15B',
                  par_img: null,
                  par_data: null,
                  par_superparty_id: 94,
                  par_superparty_name: 'Vox',
                  par_superparty_alias: 'Vox',
                  par_meta_id: 52,
                  par_meta_name: 'Vox',
                  par_meta_alias: 'Vox'
                },
                res_votes_previous: 5587,
                res_percent_votes_previous: 3.16,
                res_members_previous: 0
              },
              {
                res_par_ele_id: 34,
                res_par_id: 93,
                res_pla_id: 1,
                res_votes: 298,
                res_percent_votes: 0.18,
                res_members: 0,
                res_party: {
                  par_id: 93,
                  par_parent_id: null,
                  par_ele_id: 34,
                  par_name: 'Unión Progreso y Democracia',
                  par_alias: 'UPYD',
                  par_color: '#C6A15B',
                  par_img: null,
                  par_data: null,
                  par_superparty_id: 93,
                  par_superparty_name: 'Unión Progreso y Democracia',
                  par_superparty_alias: 'UPYD',
                  par_meta_id: 51,
                  par_meta_name: 'Unión Progreso y Democracia',
                  par_meta_alias: 'UPYD'
                },
                res_votes_previous: 0,
                res_percent_votes_previous: 0,
                res_members_previous: 0
              },
              {
                res_par_ele_id: 34,
                res_par_id: 49,
                res_pla_id: 1,
                res_votes: 211,
                res_percent_votes: 0.13,
                res_members: 0,
                res_party: {
                  par_id: 49,
                  par_parent_id: null,
                  par_ele_id: 34,
                  par_name: 'Partido Comunista de los Pueblos de España',
                  par_alias: 'PCPE',
                  par_color: '#C6A15B',
                  par_img: null,
                  par_data: null,
                  par_superparty_id: 49,
                  par_superparty_name: 'Partido Comunista de los Pueblos de España',
                  par_superparty_alias: 'PCPE',
                  par_meta_id: 31,
                  par_meta_name: 'Partido Comunista de los Pueblos de España',
                  par_meta_alias: 'PCPE'
                },
                res_votes_previous: 0,
                res_percent_votes_previous: 0,
                res_members_previous: 0
              },
              {
                res_par_ele_id: 34,
                res_par_id: 38,
                res_pla_id: 1,
                res_votes: 74,
                res_percent_votes: 0.04,
                res_members: 0,
                res_party: {
                  par_id: 38,
                  par_parent_id: null,
                  par_ele_id: 34,
                  par_name: 'Libertad Navarra ',
                  par_alias: 'LN',
                  par_color: '#C6A15B',
                  par_img: null,
                  par_data: null,
                  par_superparty_id: 38,
                  par_superparty_name: 'Libertad Navarra ',
                  par_superparty_alias: 'LN',
                  par_meta_id: 27,
                  par_meta_name: 'Libertad Navarra ',
                  par_meta_alias: 'LN'
                },
                res_votes_previous: 0,
                res_percent_votes_previous: 0,
                res_members_previous: 0
              }
            ]
          }
        },
        placePrevious: {
          28: {
            pla_encode_name: 'pais-vascoaraba-alava',
            pla_url: 'https://www.elconfidencial.dev/elecciones-generales/resultado-38/pais-vasco/araba-alava/',
            pla_name: 'Araba/Álava',
            pla_typ_id: 3,
            pla_ele_id: 38,
            pla_id: 28,
            pla_parent_id: 'CA16',
            total_members: 4,
            participation: {
              par_pla_id: 1,
              par_abstention: 72295,
              par_percent_abstention: 28.81,
              par_blank_votes: 1064,
              par_percent_blank_votes: 0.6,
              par_null_votes: 1828,
              par_percent_null_votes: 1.02,
              par_total_votes: 178613,
              par_percent_total_votes: 71.19,
              par_percent_counted: 100
            },
            results: [
              {
                res_par_ele_id: 38,
                res_par_id: 27,
                res_pla_id: 1,
                res_votes: 40199,
                res_percent_votes: 22.74,
                res_members: 1,
                res_party: {
                  par_id: 27,
                  par_parent_id: null,
                  par_ele_id: 38,
                  par_name: 'Partido Nacionalista Vasco',
                  par_alias: 'PNV',
                  par_color: '#C6A15B',
                  par_img: null,
                  par_data: null,
                  par_superparty_id: 27,
                  par_superparty_name: 'Partido Nacionalista Vasco',
                  par_superparty_alias: 'PNV',
                  par_meta_id: 11,
                  par_meta_name: 'Partido Nacionalista Vasco',
                  par_meta_alias: 'PNV'
                }
              },
              {
                res_par_ele_id: 38,
                res_par_id: 94,
                res_pla_id: 1,
                res_votes: 39595,
                res_percent_votes: 22.4,
                res_members: 1,
                res_party: {
                  par_id: 94,
                  par_parent_id: 96,
                  par_ele_id: 38,
                  par_name: 'Partido Socialista de Euskadi ',
                  par_alias: 'PSE-PSOE',
                  par_color: '#C6A15B',
                  par_img: null,
                  par_data: null,
                  par_superparty_id: 96,
                  par_superparty_name: 'Partido Socialista Obrero Español',
                  par_superparty_alias: 'PSOE',
                  par_meta_id: 40,
                  par_meta_name: 'Partido Socialista Obrero Español',
                  par_meta_alias: 'PSOE'
                }
              },
              {
                res_par_ele_id: 38,
                res_par_id: 80,
                res_pla_id: 1,
                res_votes: 31346,
                res_percent_votes: 17.73,
                res_members: 1,
                res_party: {
                  par_id: 80,
                  par_parent_id: 77,
                  par_ele_id: 38,
                  par_name: 'Unidas Podemos',
                  par_alias: 'Unidas Podemos',
                  par_color: '#C6A15B',
                  par_img: null,
                  par_data: null,
                  par_superparty_id: 77,
                  par_superparty_name: 'Unidas Podemos',
                  par_superparty_alias: 'Unidas Podemos',
                  par_meta_id: 37,
                  par_meta_name: 'Unidas Podemos',
                  par_meta_alias: 'Unidas Podemos'
                }
              },
              {
                res_par_ele_id: 38,
                res_par_id: 33,
                res_pla_id: 1,
                res_votes: 24687,
                res_percent_votes: 13.96,
                res_members: 1,
                res_party: {
                  par_id: 33,
                  par_parent_id: null,
                  par_ele_id: 38,
                  par_name: 'Euskal Herria Bildu',
                  par_alias: 'EH Bildu',
                  par_color: '#C6A15B',
                  par_img: null,
                  par_data: null,
                  par_superparty_id: 33,
                  par_superparty_name: 'Euskal Herria Bildu',
                  par_superparty_alias: 'EH Bildu',
                  par_meta_id: 15,
                  par_meta_name: 'Euskal Herria Bildu',
                  par_meta_alias: 'EH Bildu'
                }
              },
              {
                res_par_ele_id: 38,
                res_par_id: 83,
                res_pla_id: 1,
                res_votes: 24304,
                res_percent_votes: 13.75,
                res_members: 0,
                res_party: {
                  par_id: 83,
                  par_parent_id: null,
                  par_ele_id: 38,
                  par_name: 'Partido Popular',
                  par_alias: 'PP',
                  par_color: '#C6A15B',
                  par_img: null,
                  par_data: null,
                  par_superparty_id: 83,
                  par_superparty_name: 'Partido Popular',
                  par_superparty_alias: 'PP',
                  par_meta_id: 38,
                  par_meta_name: 'Partido Popular',
                  par_meta_alias: 'PP'
                }
              },
              {
                res_par_ele_id: 38,
                res_par_id: 22,
                res_pla_id: 1,
                res_votes: 7039,
                res_percent_votes: 3.98,
                res_members: 0,
                res_party: {
                  par_id: 22,
                  par_parent_id: null,
                  par_ele_id: 38,
                  par_name: 'Ciudadanos',
                  par_alias: 'Cs',
                  par_color: '#C6A15B',
                  par_img: null,
                  par_data: null,
                  par_superparty_id: 22,
                  par_superparty_name: 'Ciudadanos',
                  par_superparty_alias: 'Cs',
                  par_meta_id: 10,
                  par_meta_name: 'Ciudadanos ',
                  par_meta_alias: 'Cs'
                }
              },
              {
                res_par_ele_id: 38,
                res_par_id: 117,
                res_pla_id: 1,
                res_votes: 5587,
                res_percent_votes: 3.16,
                res_members: 0,
                res_party: {
                  par_id: 117,
                  par_parent_id: null,
                  par_ele_id: 38,
                  par_name: 'Vox',
                  par_alias: 'Vox',
                  par_color: '#C6A15B',
                  par_img: null,
                  par_data: null,
                  par_superparty_id: 117,
                  par_superparty_name: 'Vox',
                  par_superparty_alias: 'Vox',
                  par_meta_id: 52,
                  par_meta_name: 'Vox',
                  par_meta_alias: 'Vox'
                }
              },
              {
                res_par_ele_id: 38,
                res_par_id: 54,
                res_pla_id: 1,
                res_votes: 1863,
                res_percent_votes: 1.05,
                res_members: 0,
                res_party: {
                  par_id: 54,
                  par_parent_id: null,
                  par_ele_id: 38,
                  par_name: 'Partido Animalista Contra el Maltrato Animal',
                  par_alias: 'PACMA',
                  par_color: '#C6A15B',
                  par_img: null,
                  par_data: null,
                  par_superparty_id: 54,
                  par_superparty_name: 'Partido Animalista Contra el Maltrato Animal',
                  par_superparty_alias: 'PACMA',
                  par_meta_id: 29,
                  par_meta_name: 'Partido Animalista Contra el Maltrato Animal',
                  par_meta_alias: 'PACMA'
                }
              },
              {
                res_par_ele_id: 38,
                res_par_id: 104,
                res_pla_id: 1,
                res_votes: 533,
                res_percent_votes: 0.3,
                res_members: 0,
                res_party: {
                  par_id: 104,
                  par_parent_id: null,
                  par_ele_id: 38,
                  par_name: 'Recortes Cero - Grupo Verde',
                  par_alias: 'Recortes Cero - Grupo Verde',
                  par_color: '#C6A15B',
                  par_img: null,
                  par_data: null,
                  par_superparty_id: 104,
                  par_superparty_name: 'Recortes Cero - Grupo Verde',
                  par_superparty_alias: 'Recortes Cero - Grupo Verde',
                  par_meta_id: 43,
                  par_meta_name: 'Recortes Cero - Grupo Verde',
                  par_meta_alias: 'Recortes Cero - Grupo Verde'
                }
              },
              {
                res_par_ele_id: 38,
                res_par_id: 101,
                res_pla_id: 1,
                res_votes: 335,
                res_percent_votes: 0.19,
                res_members: 0,
                res_party: {
                  par_id: 101,
                  par_parent_id: 100,
                  par_ele_id: 38,
                  par_name: 'Por Un Mundo Más Justo',
                  par_alias: 'PUM+J',
                  par_color: '#C6A15B',
                  par_img: null,
                  par_data: null,
                  par_superparty_id: 100,
                  par_superparty_name: 'Por Un Mundo Más Justo',
                  par_superparty_alias: 'PUM+J',
                  par_meta_id: 65,
                  par_meta_name: 'Por Un Mundo Más Justo',
                  par_meta_alias: 'PUM+J'
                }
              },
              {
                res_par_ele_id: 38,
                res_par_id: 67,
                res_pla_id: 1,
                res_votes: 233,
                res_percent_votes: 0.13,
                res_members: 0,
                res_party: {
                  par_id: 67,
                  par_parent_id: 66,
                  par_ele_id: 38,
                  par_name: 'Partido Comunista de los Trabajadores de Euskadi',
                  par_alias: 'PCTE',
                  par_color: '#C6A15B',
                  par_img: null,
                  par_data: null,
                  par_superparty_id: 66,
                  par_superparty_name: 'Partido Comunista de los Trabajadores de España',
                  par_superparty_alias: 'PCTE',
                  par_meta_id: 472,
                  par_meta_name: 'Partido Comunista de los Trabajadores',
                  par_meta_alias: 'PCTE'
                }
              }
            ]
          }
        }
      }
    }

    console.log(data, codigo, mode)
    dataset = get_dataset(data, codigo)
    if (mode === 'up') {
      const $div = create_div_prov(codigo)
      repos_div('prov_' + codigo)
    }
    feed_table_mvl(codigo, nombre)
    set_height()
    get_event_tooltip()
  }

  function get_dataset (data, codigo) {
    const placePrevious = data.data.placePrevious[codigo].results
    console.log(placePrevious)
    const places = data.data.places[codigo].results
    let parMetaId
    const res = []
    abst = data.data.places[codigo].participation.par_abstention / multiple
    abstPrevious = data.data.placePrevious[codigo].participation.par_abstention / multiple
    count = data.data.places[codigo].participation.par_percent_counted

    console.log(places)
    for (var i = 0; i < places.length; i++) {
      parMetaId = places[i].res_party.par_meta_id

      console.log(party)
      party.forEach(function (d) {
        console.log(d)
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
    const nHeight = document.getElementsByTagName('body')[0].clientHeight
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
