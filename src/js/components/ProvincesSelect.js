import { provinces } from './../constants.js'

function buildHTML () {
  let html = ''
  provinces.forEach(d => {
    html += '<option value="' + d.code + '" >' + d.name + '</option>'
  })
  return html
}
class ProvincesSelect {
  constructor (id, value) {
    this.selectHTML = ''
    this.selectNode = document.querySelector(`#${id}`)
    this.value = value
  }

  setupSelect () {
    this.selectHTML = buildHTML()
    this.selectNode.innerHTML = this.selectHTML
    this.selectNode.value = this.value
  }

  onChange (callback) {
    this.selectNode.onchange = (evt) => {
      this.value = evt.target.value
      callback(this.value)
    }
  }
}
export default ProvincesSelect
