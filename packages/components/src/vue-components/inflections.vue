<template>
    <div>
        <div v-show="! isEnabled">{{messages.PLACEHOLDER_INFLECT_UNAVAILABLE}}</div>
        <div v-show="isEnabled && ! isContentAvailable">{{messages.PLACEHOLDER_INFLECT}}</div>
        <div v-show="isContentAvailable">
            <h3 class="alpheios-inflections__title">{{selectedView.title}}</h3>
            <div v-show="partsOfSpeech.length > 1">
              <label class="uk-form-label">{{messages.LABEL_INFLECT_SELECT_POFS}}</label>
              <select v-model="partOfSpeechSelector" class="uk-select alpheios-inflections__view-selector">
                <option v-for="partOfSpeech in partsOfSpeech">{{partOfSpeech}}</option>
              </select>
            </div>
              <div class="alpheios-inflections__actions">
                <div class="alpheios-inflections__forms-cont">
                    <div class="alpheios-inflections__form" v-for="form in forms">{{form}}</div>
                </div>
                <div v-show="views.length > 1">
                    <select v-model="viewSelector" class="uk-select alpheios-inflections__view-selector">
                        <option v-for="view in views" :value="view.id">{{view.name}}</option>
                    </select>
                </div>
                <div class="alpheios-inflections__control-btn-cont uk-button-group">
                  <button v-show="false"
                        class="uk-button uk-button-primary uk-button-small alpheios-inflections__control-btn"
                        @click="hideEmptyColsClick">
                    {{buttons.hideEmptyCols.text}}
                  </button>
                  <button v-if="canCollapse"
                        class="uk-button uk-button-primary uk-button-small alpheios-inflections__control-btn"
                        @click="hideNoSuffixGroupsClick">
                    {{buttons.hideNoSuffixGroups.text}}
                  </button>
                </div>
            </div>

            <template v-if="selectedView.hasComponentData">
                <widetable :data="selectedView.wideTable"></widetable>
                <widesubtables :data="selectedView.wideSubTables"></widesubtables>
            </template>
            <template v-else>
            <div :id="elementIDs.wideView" class=""></div>
                <div :id="elementIDs.footnotes" class="alpheios-inflections__footnotes">
                    <template v-for="footnote in footnotes">
                        <dt>{{footnote.index}}</dt>
                        <dd>{{footnote.text}}</dd>
                    </template>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
  // Subcomponents
  import WideTable from './inflections-table-wide.vue'
  import WideSubTables from './inflections-subtables-wide.vue'

  // Other dependencies
  import { ViewSet, L10n} from 'alpheios-inflection-tables'

  export default {
    name: 'Inflections',
    components: {
      widetable: WideTable,
      widesubtables: WideSubTables
    },

    props: {
      // This will be an InflectionData object
      data: {
        type: [Object, Boolean],
        required: true
      },
      locale: {
        type: String,
        required: true
      },
      messages: {
        type: Object,
        required: true
      }
    },

    data: function () {
      return {
        partsOfSpeech: [],
        selectedPartOfSpeech: [],
        views: [],
        selectedViewName: '',
        selectedView: {},
        renderedView: {},
        elementIDs: {
          wideView: 'alph-inflection-table-wide',
          footnotes: 'alph-inflection-footnotes'
        },
        htmlElements: {
          wideView: undefined,
        },
        buttons: {
          hideEmptyCols: {
            contentHidden: true,
            text: '',
            shownText: this.messages.LABEL_INFLECT_HIDEEMPTY,
            hiddenText: this.messages.LABEL_INFLECT_SHOWEMPTY
          },
          hideNoSuffixGroups: {
            noSuffMatchHidden: true,
            text: '',
            shownText: this.messages.LABEL_INFLECT_COLLAPSE,
            hiddenText: this.messages.LABEL_INFLECT_SHOWFULL
          }
        }
      }
    },

    computed: {
      isEnabled: function () {
        return this.data.enabled
      },
      isContentAvailable: function () {
        return this.data.enabled && Boolean(this.data.inflectionData)
      },
      inflectionData: function () {
        return this.data.inflectionData
      },
      // Need this for a watcher that will monitor a parent container visibility state
      isVisible: function () {
        return this.data.visible
      },
      partOfSpeechSelector: {
        get: function () {
          return this.selectedPartOfSpeech
        },
        set: function (newValue) {
          this.selectedPartOfSpeech = newValue
          this.views = this.viewSet.getViews(this.selectedPartOfSpeech)
          this.selectedView = this.views[0]
          if (!this.selectedView.hasComponentData) {
            // Rendering is not required for component-enabled views
            this.renderInflections().displayInflections()
          }
        }
      },
      viewSelector: {
        get: function () {
          return this.selectedView ? this.selectedView.id : ''
        },
        set: function (newValue) {
          this.selectedView = this.views.find(view => view.id === newValue)
          if (!this.selectedView.hasComponentData) {
            this.renderInflections().displayInflections()
          }
        }
      },
      inflectionTable: function () {
        return this.selectedView.id
      },
      footnotes: function () {
        let footnotes = []
        if (this.selectedView && this.selectedView.footnotes) {
          footnotes = Array.from(this.selectedView.footnotes.values())
        }
        return footnotes
      },
      forms: function () {
        let forms = []
        if (this.selectedView && this.selectedView.forms) {
          forms = Array.from(this.selectedView.forms.values())
        }
        return forms
      },
      canCollapse: function () {
        if (this.data.inflectionData && this.selectedView && this.selectedView.table) {
          return this.selectedView.table.canCollapse
        } else {
          return true
        }
      }
    },

    watch: {

      inflectionData: function (inflectionData) {
        if (inflectionData) {
          this.viewSet = new ViewSet(inflectionData, this.locale)

          this.partsOfSpeech = this.viewSet.partsOfSpeech
          if (this.partsOfSpeech.length > 0) {
            this.selectedPartOfSpeech = this.partsOfSpeech[0]
            this.views = this.viewSet.getViews(this.selectedPartOfSpeech)
          } else {
            this.selectedPartOfSpeech = []
            this.views = []
          }

          if (this.views.length > 0) {
            this.selectedView = this.views[0]
            if (!this.selectedView.hasComponentData) {
              // Rendering is not required for component-enabled views
              this.renderInflections().displayInflections()
            }
          } else {
            this.selectedView = ''
          }
        }
      },
      /*
      An inflection component needs to notify its parent of how wide an inflection table content is. Parent will
      use this information to adjust a width of a container that displays an inflection component. However, a width
      of an inflection table within an invisible parent container will always be zero. Because of that, we can determine
      an inflection table width and notify a parent component only when a parent container is visible.
      A parent component will notify us of that by setting a `visible` property. A change of that property state
      will be monitored here with the help of a `isVisible` computed property. Computed property alone will not work
      as it won't be used by anything and thus will not be calculated by Vue.
       */
      isVisible: function (visibility) {
        if (visibility) {
          // If container is become visible, update parent with its width
          this.$emit('contentwidth', this.htmlElements.wideView.offsetWidth)
        }
      },
      locale: function (locale) {
        if (this.data.inflectionData) {
          this.viewSet.setLocale(this.locale)
          if (!this.selectedView.hasComponentData) {
            // Rendering is not required for component-enabled views
            this.renderInflections().displayInflections() // Re-render inflections for a different locale
          }
        }
      }
    },

    methods: {
      clearInflections: function () {
        for (let element of Object.values(this.htmlElements)) { element.innerHTML = '' }
        return this
      },

      renderInflections: function () {
        this.clearInflections().setDefaults()
        // Hide empty columns by default
        // TODO: change inflection library to take that as an option
        this.selectedView.render().hideEmptyColumns().hideNoSuffixGroups()
        return this
      },

      displayInflections: function () {
        let popupClassName = 'alpheios-inflections__footnote-popup'
        let closeBtnClassName = 'alpheios-inflections__footnote-popup-close-btn'
        let hiddenClassName = 'hidden'
        let titleClassName = 'alpheios-inflections__footnote-popup-title'
        this.htmlElements.wideView.appendChild(this.selectedView.wideViewNodes)
        let footnoteLinks = this.htmlElements.wideView.querySelectorAll('[data-footnote]')
        if (footnoteLinks) {
          for (let footnoteLink of footnoteLinks) {
            let index = footnoteLink.dataset.footnote
            if (!index) {
              console.warn(`[data-footnote] attribute has no index value`)
              break
            }
            let indexes = index.replace(/\s*/g, '').split(',')
            let popup = document.createElement('div')
            popup.classList.add(popupClassName, hiddenClassName)
            let title = document.createElement('div')
            title.classList.add(titleClassName)
            title.innerHTML = 'Footnotes:'
            popup.appendChild(title)

            for (const index of indexes) {
              let footnote = this.selectedView.footnotes.get(index)
              if (footnote) {
                let dt = document.createElement('dt')
                dt.innerHTML = footnote.index
                popup.appendChild(dt)
                let dd = document.createElement('dd')
                dd.innerHTML = footnote.text
                popup.appendChild(dd)
              } else {
                console.warn(`Footnote "${index}" is not found`)
              }
            }
            let closeBtn = document.createElement('div')
            closeBtn.classList.add(closeBtnClassName)
            closeBtn.innerHTML =
              `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill="none" stroke-width="1.06" d="M16 16L4 4M16 4L4 16"></path>
               </svg>`
            popup.appendChild(closeBtn)
            footnoteLink.appendChild(popup)

            footnoteLink.addEventListener('click', (event) => {
              popup.classList.remove(hiddenClassName)
              event.stopPropagation()
            })

            closeBtn.addEventListener('click', (event) => {
              popup.classList.add(hiddenClassName)
              event.stopPropagation()
            })
          }
        }
        return this
      },

      setDefaults () {
        this.buttons.hideEmptyCols.contentHidden = true
        this.buttons.hideEmptyCols.text = this.buttons.hideEmptyCols.hiddenText
        this.buttons.hideNoSuffixGroups.contentHidden = true
        this.buttons.hideNoSuffixGroups.text = this.buttons.hideNoSuffixGroups.hiddenText
        return this
      },

      hideEmptyColsClick () {
        this.buttons.hideEmptyCols.contentHidden = !this.buttons.hideEmptyCols.contentHidden
        if (this.buttons.hideEmptyCols.contentHidden) {
          this.buttons.hideEmptyCols.text = this.buttons.hideEmptyCols.hiddenText
          this.selectedView.hideEmptyColumns()
        } else {
          this.buttons.hideEmptyCols.text = this.buttons.hideEmptyCols.shownText
          this.selectedView.showEmptyColumns()
        }
        this.displayInflections()
      },

      hideNoSuffixGroupsClick () {
        this.buttons.hideNoSuffixGroups.contentHidden = !this.buttons.hideNoSuffixGroups.contentHidden
        if (this.buttons.hideNoSuffixGroups.contentHidden) {
          this.buttons.hideNoSuffixGroups.text = this.buttons.hideNoSuffixGroups.hiddenText
          this.selectedView.hideNoSuffixGroups()
        } else {
          this.buttons.hideNoSuffixGroups.text = this.buttons.hideNoSuffixGroups.shownText
          this.selectedView.showNoSuffixGroups()
        }
        this.displayInflections()
      }
    },

    mounted: function () {
      this.htmlElements.wideView = this.$el.querySelector(`#${this.elementIDs.wideView}`)
    }
  }
</script>
<style lang="scss">
    @import "../styles/alpheios";

    h3.alpheios-inflections__title {
        font-size: 1.2rem;
        line-height: 1;
        margin: 0 0 0.6rem 0;
        font-weight: 700;
        text-align: center;
    }

    .#{$alpheios-uikit-namespace} .uk-select.alpheios-inflections__view-selector {
        height: auto !important;
        max-width: 220px;
        font-size: .625rem !important;
    }

    .auk .uk-button-small.alpheios-inflections__control-btn {
        line-height: 1.5;
        font-size: .625rem;
    }

    .alpheios-inflections__actions {
        display:flex;
        flex-direction: row;
        align-items: flex-end;
        justify-content: space-between;
        margin-bottom: 0.6rem;
    }

    .alpheios-inflections__form {
        font-weight: bold;
        line-height: 1.2;
        justify-content: flex-start;
    }

    // region Tables
    .infl-table {
        display: grid;
        border-left: 1px solid #111;
        border-bottom: 1px solid #111;
        margin-bottom: 1rem;
    }

    .infl-table--wide {
        /* Data flow order: number- case - declension - gender - type*/
        grid-auto-flow: row;
        grid-template-columns: repeat(21, 1fr); /* Default value, will be redefined in JS if necessary */
    }

    .infl-table--narrow {
        /* Data flow order: declension - number- case - gender - type*/
        grid-auto-flow: row;
        grid-template-columns: repeat(6, 1fr); /* Default value, will be redefined in JS if necessary */
    }

    .infl-table.hidden {
        display: none;
    }

    .infl-table-narrow-views-cont {
        display: flex;
        flex-wrap: wrap;
    }

    .infl-cell {
        font-size: 12px;
        padding: 0 2px 0 5px;
        border-right: 1px solid #111;
        border-top: 1px solid #111;
    }

    .infl-cell.hidden {
        display: none;
    }

    .infl-cell--hdr {
        font-weight: 700;
        text-transform: capitalize;
        text-align: center;
    }

    .infl-cell--hdr .infl-cell__conj-stem {
        text-transform: none;
    }

    .infl-cell--fw {
        grid-column: 1 / -1;
        font-style: italic;
        text-transform: capitalize;
    }

    .infl-cell.infl-cell--sep {
        height: 50px;
    }

    .infl-cell--sp0 {
        display: none;
    }

    @for $i from 1 through 24 {
        .infl-cell--sp#{$i} {
            grid-column-end: span #{$i};
        }
    }

    .infl-cell--hl {
        background: lightgray;
    }

    .infl-cell__conj-stem {
        text-transform: none;
    }

    .infl-suff {
        cursor: pointer;
    }

    .infl-suff--suffix-match {
        background-color: rgb(188, 230, 240);
    }

    .infl-suff--full-feature-match {
        background-color: lightgray;
    }

    .infl-suff--suffix-match.infl-suff--full-feature-match {
        background-color: rgb(255, 238, 119);
        font-weight: 700;
    }

    // endregion Tables

    // region Footnotes
    .alpheios-inflections__footnotes {
        display: none;
        grid-template-columns: 1.6rem 1fr;
        font-size: 0.875rem;
        line-height: 1.2;
        margin-bottom: 2rem;

        dt {
            font-weight: 700;
        }
    }

    [data-footnote] {
        position: relative;
        padding-left: 2px;
        vertical-align: super;
    }

    .alpheios-inflections__footnote-popup {
        display: grid;
        grid-template-columns: 20px 1fr;
        grid-row-gap: 2px;
        background: #FFF;
        color: $alpheios-headers-color;
        position: absolute;
        padding: 30px 15px 15px;
        left: 0;
        bottom: 20px;
        transform: translateX(-50%);
        z-index: 10;
        min-width: 200px;
        border: 1px solid $alpheios-toolbar-color;
    }

    .alpheios-inflections__footnote-popup.hidden {
        display: none;
    }

    .alpheios-inflections__footnote-popup-title {
        font-weight: 700;
        position: absolute;
        text-transform: uppercase;
        left: 15px;
        top: 7px;
    }

    .alpheios-inflections__footnote-popup-close-btn {
        position: absolute;
        right: 5px;
        top: 5px;
        display: block;
        width: 20px;
        height: 20px;
        margin: 0;
        cursor: pointer;
        fill: $alpheios-toolbar-color;
        stroke: $alpheios-toolbar-color;
    }

    .alpheios-inflections__footnote-popup-close-btn:hover,
    .alpheios-inflections__footnote-popup-close-btn:active {
        fill: $alpheios-link-hover-color;
        stroke: $alpheios-link-hover-color;
    }

    // endregion Footnotes
</style>
