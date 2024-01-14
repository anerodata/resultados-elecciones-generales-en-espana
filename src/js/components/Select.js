const buildHTML = new WeakMap()
const setSelectHTML = new WeakMap()
const setSelectDefaultValue = new WeakMap()
const getSelectedObj = new WeakMap()

class Select {
  constructor ({ id, value, keyValue, keyName, data }) {
    this.selectHTML = ''
    this.selectNode = document.querySelector(`#${id}`)
    this.value = value
    this.keyValue = keyValue || 'value'
    this.keyName = keyName || 'value'
    this.data = data
    buildHTML.set(this, () => {
      let html = ''
      this.data.forEach(d => {
        html += '<option value="' + d[this.keyValue] + '" >' + d[this.keyName] + '</option>'
      })
      return html
    })
    setSelectHTML.set(this, () => {
      this.selectHTML = buildHTML.get(this)()
      this.selectNode.innerHTML = this.selectHTML
    })
    setSelectDefaultValue.set(this, (value) => {
      const selectedObj = getSelectedObj.get(this)(value)
      if (selectedObj !== undefined) {
        this.selectNode.value = value
        this.value = selectedObj
      }
    })
    getSelectedObj.set(this, (value) => {
      return this.data.find(d => d[this.keyValue] === value)
    })
  }

  setupSelect () {
    setSelectHTML.get(this)()
    setSelectDefaultValue.get(this)(this.value)
  }

  onChange (callback) {
    this.selectNode.onchange = (evt) => {
      this.value = getSelectedObj.get(this)(evt.target.value)
      callback()
    }
  }
}
export default Select
