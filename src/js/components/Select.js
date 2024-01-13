const buildHTML = new WeakMap()
const getSelectedProvinceObj = new WeakMap()

class Select {
  constructor ({ id, value, data }) {
    this.selectHTML = ''
    this.selectNode = document.querySelector(`#${id}`)
    this.value = value
    this.data = data
    buildHTML.set(this, () => {
      let html = ''
      this.data.forEach(d => {
        html += '<option value="' + d.code + '" >' + d.name + '</option>'
      })
      return html
    })
    getSelectedProvinceObj.set(this, () => {
      return this.data.find(d => d.code === this.value)
    })
  }

  setupSelect () {
    this.selectHTML = buildHTML.get(this)()
    this.selectNode.innerHTML = this.selectHTML
    this.selectNode.value = this.value
  }

  onChange (callback) {
    this.selectNode.onchange = (evt) => {
      this.value = evt.target.value
      const selectedProvinceObj = getSelectedProvinceObj.get(this)()
      callback(selectedProvinceObj)
    }
  }
}
export default Select
