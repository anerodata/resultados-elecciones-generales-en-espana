import { provinces } from './../constants.js'
import dotTable from './dotTable/dotTable.js'
function votesProvincesTable (idDivMain, idTable) {
  buildSelect()
  init()
  window.onresize = function () {
    init()
  }
  function init () {
    const dataset = getData('02')
    dotTable(provinces[0].name, dataset, idDivMain, idTable)
    setEventSelect()
  }
  function setEventSelect () {
    document.getElementById('select').onchange = function () {
      const selectedProvince = provinces.find(d => d.code === this.value)
      const dataset = getData(selectedProvince.code)// REMOTO
      dotTable(selectedProvince.name, dataset, idDivMain, idTable)
    }
  }

  function buildSelect () {
    const select = document.getElementById('select')
    let html = ''
    provinces.forEach(d => {
      html += '<option value="' + d.code + '" >' + d.name + '</option>'
    })
    select.innerHTML = html
  }

  function getData (codigo) {
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
}
export default votesProvincesTable
