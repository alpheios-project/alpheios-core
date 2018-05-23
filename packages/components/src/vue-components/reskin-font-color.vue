<template>
	<div class="alpheios-skin_panel">
      <label class="uk-form-label" v-show="showTitle">{{ messages.LABEL_RESKIN_SETTINGS }}:</label>
	  <ul class="alpheios-skin_properties">
        <alph-tooltip tooltipDirection="top-left" :tooltipText="messages.TOOLTIP_RESKIN_SMALLFONT">
	  	    <li class="alpheios-skin_properties_item alpheios-skin_properties_item__small_font" @click="changeStyleClass('fontSize', 'small')">A</li>
        </alph-tooltip>
        <alph-tooltip tooltipDirection="top-left" :tooltipText="messages.TOOLTIP_RESKIN_MEDIUMFONT">
	  	    <li class="alpheios-skin_properties_item alpheios-skin_properties_item__medium_font" @click="changeStyleClass('fontSize', 'medium')">A</li>
        </alph-tooltip>
        <alph-tooltip tooltipDirection="top-left" :tooltipText="messages.TOOLTIP_RESKIN_LARGEFONT">
	  	    <li class="alpheios-skin_properties_item alpheios-skin_properties_item__large_font" @click="changeStyleClass('fontSize', 'large')">A</li>
        </alph-tooltip>
        <alph-tooltip tooltipDirection="top-left" :tooltipText="messages.TOOLTIP_RESKIN_LIGHTBG">
            <li class="alpheios-skin_properties_item alpheios-skin_properties_item__light_bg" @click="changeStyleClass('colorSchema', 'light')"><black-brush></black-brush></li>
        </alph-tooltip>
        <alph-tooltip tooltipDirection="top-left" :tooltipText="messages.TOOLTIP_RESKIN_DARKBG">
            <li class="alpheios-skin_properties_item alpheios-skin_properties_item__dark_bg" @click="changeStyleClass('colorSchema', 'dark')"><white-brush></white-brush></li>
        </alph-tooltip>
	  </ul>
	</div>
</template>
<script>
  import WhiteBrush from '../images/inline-icons/white-brush.svg';
  import BlackBrush from '../images/inline-icons/black-brush.svg';

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
    @import "../styles/alpheios";

    .alpheios-skin_panel {
    	display: inline-block;
    }

    $baseSize: $alpheios-base-font-size + 12px;

    ul.alpheios-skin_properties {
    	margin: 0;
    	padding: 0 30px 10px 0;
    	list-style: none;
    }
    .alpheios-skin_properties_item {
        display: inline-block;
        vertical-align: middle;
        font-size: $alpheios-base-font-size;

        width: $baseSize;
        height: $baseSize;
        text-align: center;
        line-height: $baseSize;

        color: #fff;
        background: $alpheios-toolbar-color;
        border-radius: $baseSize/2;

        cursor: pointer;        
    }

    .alpheios-skin_properties_item__small_font {
		font-size: $alpheios-base-font-size * 0.8;
        width: $baseSize * 0.8;
        height: $baseSize * 0.8;
        line-height: $baseSize * 0.8;
        border-radius: $baseSize * 0.8 * 0.5;
	}

    .alpheios-skin_properties_item__large_font {
		font-size:$alpheios-base-font-size * 1.2;
        width: $baseSize * 1.2;
        height: $baseSize * 1.2;
        line-height: $baseSize * 1.2;
        border-radius: $baseSize * 1.2;
	}

    .alpheios-skin_properties_item__light_bg,
    .alpheios-skin_properties_item__dark_bg {
        border-radius: 0;
        background: transparent;
        svg {
            width: 90%;
            height: 90%;
        }
    }


    .alpheios-font_small_class .alpheios-skin_properties_item__small_font {
        background: $alpheios-toolbar-active-color;
    }

    .alpheios-font_medium_class .alpheios-skin_properties_item__medium_font {
        background: $alpheios-toolbar-active-color;
    }

    .alpheios-font_large_class .alpheios-skin_properties_item__large_font {
        background: $alpheios-toolbar-active-color;
    }
</style>