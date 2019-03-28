<template>
  <div class="alpheios-skin_panel alpheios-panel__options-item" id="alpheios-reskin-panel">
    <label class="alpheios-setting__label" v-show="showTitle">{{ l10n.getMsg('LABEL_RESKIN_SETTINGS')
      }}:</label>
    <ul class="alpheios-skin_properties">
      <alph-tooltip :tooltipText="l10n.getMsg('TOOLTIP_RESKIN_SMALLFONT')" tooltipDirection="top-left">
        <li @click="changeStyleClass('fontSize', 'small')"
            class="alpheios-skin_properties_item alpheios-skin_properties_item__small_font">A
        </li>
      </alph-tooltip>
      <alph-tooltip :tooltipText="l10n.getMsg('TOOLTIP_RESKIN_MEDIUMFONT')" tooltipDirection="top-left">
        <li @click="changeStyleClass('fontSize', 'medium')"
            class="alpheios-skin_properties_item alpheios-skin_properties_item__medium_font">A
        </li>
      </alph-tooltip>
      <alph-tooltip :tooltipText="l10n.getMsg('TOOLTIP_RESKIN_LARGEFONT')" tooltipDirection="top-left">
        <li @click="changeStyleClass('fontSize', 'large')"
            class="alpheios-skin_properties_item alpheios-skin_properties_item__large_font">A
        </li>
      </alph-tooltip>
      <alph-tooltip :tooltipText="l10n.getMsg('TOOLTIP_RESKIN_LIGHTBG')" tooltipDirection="top-left">
        <li @click="changeStyleClass('colorSchema', 'light')"
            class="alpheios-skin_properties_item alpheios-skin_properties_item__light_bg">
          <black-brush></black-brush>
        </li>
      </alph-tooltip>
      <alph-tooltip :tooltipText="l10n.getMsg('TOOLTIP_RESKIN_DARKBG')" tooltipDirection="top-left">
        <li @click="changeStyleClass('colorSchema', 'dark')"
            class="alpheios-skin_properties_item alpheios-skin_properties_item__dark_bg">
          <white-brush></white-brush>
        </li>
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
  inject: ['ui', 'l10n'],
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
    }
  },
  data () {
    return {}
  },
  methods: {
    changeStyleClass (name, type) {
      this.ui.optionChange(name, type)
    }
  }
}
</script>
<style lang="scss">
  @import "../../styles/variables";

  .alpheios-skin_properties_item {
    font-family: $alpheios-font-family;
    background-color: $alpheios-toolbar-color;
    color: $alpheios-toolbar-text-color;
    list-style-type: none;
    vertical-align: middle;

    font-size: $alpheios-base-font-size;
    width: $alpheios-base-font-size * 1.75;
    height: $alpheios-base-font-size * 1.75;
    line-height: $alpheios-base-font-size * 1.75;
  }

  .alpheios-skin_properties_item__small_font {
    font-size: $alpheios-base-font-size * 0.8;
    width: $alpheios-base-font-size * 1.4;
    height: $alpheios-base-font-size * 1.4;
    line-height: $alpheios-base-font-size * 1.4;
    border-radius: $alpheios-base-font-size * 0.7;
  }

  .alpheios-skin_properties_item__medium_font {
    font-size: $alpheios-base-font-size;
    width: $alpheios-base-font-size * 1.75;
    height: $alpheios-base-font-size * 1.75;
    line-height: $alpheios-base-font-size * 1.75;
    border-radius: $alpheios-base-font-size * 0.9;
  }

  .alpheios-skin_properties_item__large_font {
    font-size: $alpheios-base-font-size * 1.2;
    width: $alpheios-base-font-size * 2.1;
    height: $alpheios-base-font-size * 2.1;
    line-height: $alpheios-base-font-size * 2.1;
    border-radius: $alpheios-base-font-size * 1.1;
  }

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

  .alpheios-font_small_class #alpheios-reskin-panel .alpheios-skin_properties_item__small_font {
    background: $alpheios-toolbar-active-color;
  }

  .alpheios-font_medium_class #alpheios-reskin-panel .alpheios-skin_properties_item__medium_font {
    background: $alpheios-toolbar-active-color;
  }

  .alpheios-font_large_class #alpheios-reskin-panel .alpheios-skin_properties_item__large_font {
    background: $alpheios-toolbar-active-color;
  }
</style>
