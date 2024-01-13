const buildHTML = new WeakMap()

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
  }

  setupSelect () {
    this.selectHTML = buildHTML.get(this)()
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
export default Select
