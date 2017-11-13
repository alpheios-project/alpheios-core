/**
 * This module is responsible for displaying different views of an inflection table. Each view is located in a separate
 * directory under /presenter/views/view-name
 */
import * as L10n from '../l10n/l10n.js'
import viewsLatin from './views/latin'
import viewsGreek from './views/greek'
import * as Models from 'alpheios-data-models'

class Presenter {
  constructor (viewContainer, viewSelectorContainer, localeSelectorContainer, wordData, locale = 'en-US') {
    this.viewContainer = viewContainer
    this.viewSelectorContainer = viewSelectorContainer
    this.localeSelectorContainer = localeSelectorContainer
    this.wordData = wordData

        // All views registered by the Presenter
    this.views = []
    this.viewIndex = {}

    for (let view of viewsLatin) {
      this.addView(view)
    }
    for (let view of viewsGreek) {
      this.addView(view)
    }

        // Views available for parts of speech that are present in a Result Set
    this.availableViews = this.getViews(this.wordData)

    this.defaultView = this.availableViews[0]
    this.activeView = undefined

    this.locale = locale // This is a default locale
    this.l10n = new L10n.L10n(L10n.messages)

    return this
  }

  addView (view) {
       // let view =  new View.View(viewOptions);
    this.views.push(view)
    this.viewIndex[view.id] = view
  }

  setLocale (locale) {
    this.locale = locale
    this.activeView.render(this.viewContainer, this.wordData, this.l10n.messages(this.locale))
  }

  render () {
        // Show a default view
    if (this.defaultView) {
      this.defaultView.render(this.viewContainer, this.wordData, this.l10n.messages(this.locale))
      this.activeView = this.defaultView

      this.appendViewSelector(this.viewSelectorContainer)
            // this.appendLocaleSelector(this.localeSelectorContainer);
    }
    return this
  }

  appendViewSelector (targetContainer) {
    targetContainer.innerHTML = ''
    if (this.availableViews.length > 1) {
      let id = 'view-selector-list'
      let viewLabel = document.createElement('label')
      viewLabel.setAttribute('for', id)
      viewLabel.innerHTML = 'View:&nbsp;'
      let viewList = document.createElement('select')
      viewList.classList.add('alpheios-ui-form-control')
      for (const view of this.availableViews) {
        let option = document.createElement('option')
        option.value = view.id
        option.text = view.name
        viewList.appendChild(option)
      }
      viewList.addEventListener('change', this.viewSelectorEventListener.bind(this))
      targetContainer.appendChild(viewLabel)
      targetContainer.appendChild(viewList)
    }
    return this
  }

  viewSelectorEventListener (event) {
    let viewID = event.target.value
    let view = this.viewIndex[viewID]
    view.render(this.viewContainer, this.wordData, this.l10n.messages(this.locale))
    this.activeView = view
  }

  appendLocaleSelector (targetContainer) {
    let id = 'locale-selector-list'
    targetContainer.innerHTML = '' // Erase whatever was there
    let localeLabel = document.createElement('label')
    localeLabel.setAttribute('for', id)
    localeLabel.innerHTML = 'Locale:&nbsp;'
    let localeList = document.createElement('select')
    localeList.classList.add('alpheios-ui-form-control')
    localeList.id = id
    for (let locale of this.l10n.locales) {
      let option = document.createElement('option')
      option.value = locale
      option.text = locale
      localeList.appendChild(option)
    }
    localeList.addEventListener('change', this.localeSelectorEventListener.bind(this))
    targetContainer.appendChild(localeLabel)
    targetContainer.appendChild(localeList)
    return this
  }

  localeSelectorEventListener () {
    let locale = window.event.target.value
    this.setLocale(locale)
  }

  getViews (wordData) {
        // First view in a returned array will be a default one
    let views = []
    for (let view of this.views) {
      if (wordData.language === view.language && wordData[Models.Feature.types.part].includes(view.partOfSpeech)) {
        views.push(view)
      }
    }
    return views
  }
}

export { Presenter }
