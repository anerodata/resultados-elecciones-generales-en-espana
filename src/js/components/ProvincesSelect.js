import { provinces } from './../constants.js'

function buildHTML () {
  let html = ''
  provinces.forEach(d => {
    html += '<option value="' + d.code + '" >' + d.name + '</option>'
  })
  return html
}
class ProvincesSelect {
  constructor (id) {
    this.selectHTML = ''
    this.selectNode = document.querySelector(`#${id}`)
  }

  setupSelect () {
    this.selectHTML = buildHTML()
    this.selectNode.innerHTML = this.selectHTML
  }

  onChange (callback) {
    this.selectNode.onchange = function () {
      callback(this.value)
    }
  }
}
export default ProvincesSelect
