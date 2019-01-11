<template>
  <div id="alpheios-reskin-panel" class="alpheios-skin_panel alpheios-panel__options-item">
      <label class="uk-form-label alpheios-setting__label" v-show="showTitle">{{ messages.LABEL_RESKIN_SETTINGS.get() }}:</label>
    <ul class="alpheios-skin_properties">
        <alph-tooltip tooltipDirection="top-left" :tooltipText="messages.TOOLTIP_RESKIN_SMALLFONT.get()">
          <li class="alpheios-skin_properties_item alpheios-skin_properties_item__small_font" @click="changeStyleClass('fontSize', 'small')">A</li>
        </alph-tooltip>
        <alph-tooltip tooltipDirection="top-left" :tooltipText="messages.TOOLTIP_RESKIN_MEDIUMFONT.get()">
          <li class="alpheios-skin_properties_item alpheios-skin_properties_item__medium_font" @click="changeStyleClass('fontSize', 'medium')">A</li>
        </alph-tooltip>
        <alph-tooltip tooltipDirection="top-left" :tooltipText="messages.TOOLTIP_RESKIN_LARGEFONT.get()">
          <li class="alpheios-skin_properties_item alpheios-skin_properties_item__large_font" @click="changeStyleClass('fontSize', 'large')">A</li>
        </alph-tooltip>
        <alph-tooltip tooltipDirection="top-left" :tooltipText="messages.TOOLTIP_RESKIN_LIGHTBG.get()">
            <li class="alpheios-skin_properties_item alpheios-skin_properties_item__light_bg" @click="changeStyleClass('colorSchema', 'light')"><black-brush></black-brush></li>
        </alph-tooltip>
        <alph-tooltip tooltipDirection="top-left" :tooltipText="messages.TOOLTIP_RESKIN_DARKBG.get()">
            <li class="alpheios-skin_properties_item alpheios-skin_properties_item__dark_bg" @click="changeStyleClass('colorSchema', 'dark')"><white-brush></white-brush></li>
        </alph-tooltip>
    </ul>
  </div>
</template>
<script>
import WhiteBrush from '../../images/inline-icons/white-brush.svg'
import BlackBrush from '../../images/inline-icons/black-brush.svg'

import Tooltip from './tooltip.vue'

export default {
  name: 'ReskinFontColor',
  components: {
    whiteBrush: WhiteBrush,
    blackBrush: BlackBrush,
    alphTooltip: Tooltip
  },
  props: {
    showTitle: {
      type: Boolean,
      required: false,
      default: true
    },
    messages: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
    }
  },
  methods: {
    changeStyleClass (name, type) {
      this.$parent.$emit('changeStyleClass', name, type)
    }
  }
}
</script>
<style lang="scss">
    @import "../../styles/alpheios";

    #alpheios-reskin-panel.alpheios-skin_panel {
      display: inline-block;
    }

    ul.alpheios-skin_properties {
      margin: 0;
      padding: 0 30px 10px 10px;
      list-style: none;
      max-width: 250px;
      display: inline-block;
    }
    #alpheios-reskin-panel .alpheios-skin_properties_item {
        display: inline-block;
        vertical-align: middle;
        text-align: center;
        color: #fff;
        background: $alpheios-toolbar-color;
        cursor: pointer;
        padding: 0;
        font-family: $alpheios-font-family;
        text-indent: 0;
        list-style-type: none;
    }

    #alpheios-reskin-panel .alpheios-skin_properties_item__light_bg,
    #alpheios-reskin-panel .alpheios-skin_properties_item__dark_bg {
        border-radius: 0;
        background: transparent;
        svg {
            width: 90%;
            height: 90%;
        }
    }

    .alpheios-font_small_class #alpheios-reskin-panel  .alpheios-skin_properties_item__small_font {
        background: $alpheios-toolbar-active-color;
    }

    .alpheios-font_medium_class #alpheios-reskin-panel  .alpheios-skin_properties_item__medium_font {
        background: $alpheios-toolbar-active-color;
    }

    .alpheios-font_large_class #alpheios-reskin-panel  .alpheios-skin_properties_item__large_font {
        background: $alpheios-toolbar-active-color;
    }
</style>
