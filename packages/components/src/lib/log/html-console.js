let instance = null

export default class HTMLConsole {
  constructor (selector = null, enabled = true) {
    this.selector = selector || this.constructor.defs.consoleSel
    this.enabled = enabled

    this.node = document.querySelector(this.selector)
    if (!this.node) {
      this.enabled = false
    }
  }

  static get defs () {
    return {
      consoleSel: '#alpheios-html-console',
      entryClNm: 'alpheios-html-console-entry',
      separatorClNm: 'alpheios-html-console-separator'
    }
  }

  static createInstance (selector, enabled) {
    instance = new HTMLConsole(selector, enabled)
    return instance
  }

  static get instance () {
    if (!instance) {
      instance = new HTMLConsole()
    }
    return instance
  }

  log (message) {
    if (this.enabled) {
      this.node.innerHTML += `<div class="${this.constructor.defs.entryClNm}">${message}</div>`
      this.node.scrollTop = this.node.scrollHeight // Scroll to bottom
    }
  }

  separator () {
    if (this.enabled) {
      this.node.innerHTML += `<div class="${this.constructor.defs.separatorClNm}"></div>`
      this.node.scrollTop = this.node.scrollHeight // Scroll to bottom
    }
  }

  clear () {
    const records = this.node.querySelectorAll(`.${this.constructor.defs.entryClNm}, ${this.constructor.defs.separatorClNm}`)
    for (const record of records) {
      this.node.removeChild(record)
    }
  }

  enable (enabled) {
    if (enabled) {
      this.show()
    } else {
      this.hide()
    }
  }

  show () {
    if (this.node && !this.enabled) {
      this.node.style.display = 'block'
      this.enabled = true
    }
  }

  hide () {
    if (this.node && this.enabled) {
      this.node.style.display = 'none'
      this.enabled = false
    }
  }
}
