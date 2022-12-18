import { provinces, colors } from './../constants.js'
import provinceTable from './provinceTable/provinceTable.js'
import votesPerProvince from './../mockup-data.js'
console.log(votesPerProvince, colors[1])
function votesProvincesTable (idDivMain, idTable, multiple) {
  const selectContent = buildSelect()
  const select = document.getElementById('select')
  select.innerHTML = selectContent
  init()
  window.onresize = function () {
    init()
  }
  function init () {
    const dataset = getData(select.value, votesPerProvince)
    provinceTable(provinces[0].name, dataset, idDivMain, idTable)
    setEventSelect()
  }
  function setEventSelect () {
    document.getElementById('select').onchange = function () {
      const selectedProvince = provinces.find(d => d.code === this.value)
      const dataset = getData(selectedProvince.code, votesPerProvince)// REMOTO
      provinceTable(selectedProvince.name, dataset, idDivMain, idTable)
    }
  }

  function buildSelect () {
    let html = ''
    provinces.forEach(d => {
      html += '<option value="' + d.code + '" >' + d.name + '</option>'
    })
    return html
  }

  function getData (codigo, votesPerProvince) {
    const province = votesPerProvince.filter(d => d['Código de Provincia'] === codigo)
    console.log(province)
    const dataset = [
      {
        nombre: 'Unidas Podemos',
        color: 'red',
        // Entre 100
        votesNum: 1100000 / multiple,
        votesPreviousNum: 30000 / multiple,
        par_meta_id: 37,
        dif: 20.480999999999998
      },
      {
        nombre: 'PP',
        color: '#C6A15B',
        votesNum: 100000 / multiple,
        votesPreviousNum: 240304 / multiple,
        par_meta_id: 38,
        dif: 9.972000000000005
      },
      {
        nombre: 'PSOE',
        color: '#C6A15B',
        votesNum: 26381 / multiple,
        votesPreviousNum: 39595 / multiple,
        par_meta_id: 40,
        dif: -13.213999999999999
      },
      {
        nombre: 'EH Bildu',
        color: '#C6A15B',
        votesNum: 15858 / multiple,
        votesPreviousNum: 24687 / multiple,
        par_meta_id: 15,
        dif: -8.829
      },
      {
        nombre: 'Cs',
        color: '#C6A15B',
        votesNum: 8372 / multiple,
        votesPreviousNum: 7039 / multiple,
        par_meta_id: 10,
        dif: 1.3330000000000002
      },
      {
        nombre: 'Vox',
        color: '#C6A15B',
        votesNum: 0.306 / multiple,
        votesPreviousNum: 5.587 / multiple,
        par_meta_id: 52,
        dif: -5.281
      }
    ]
    return dataset
  }
}
export default votesProvincesTable
