<template>
  <div class="alpheios-panel__options-item">
    <label class="alpheios-setting__label">{{ l10n.getMsg('LABEL_RESKIN_SETTINGS') }}:</label>
    <div class="alpheios-setting__button-group alpheios-setting__control">
      <button
          :class="{ active: activeButton === '12' }"
          @click="changeFontSize('12')"
      >
        {{ l10n.getMsg('FONTSIZE_TEXT_SMALL') }}
      </button>
      <button
          :class="{ active: activeButton === '16' }"
          @click="changeFontSize('16')"
      >
        {{ l10n.getMsg('FONTSIZE_TEXT_MEDIUM') }}
      </button>
      <button
          :class="{ active: activeButton === '20' }"
          @click="changeFontSize('20')"
      >
        {{ l10n.getMsg('FONTSIZE_TEXT_LARGE') }}
      </button>
    </div>
  </div>
</template>
<script>

export default {
  name: 'ReskinFontColor',
  inject: ['ui', 'l10n', 'settings'],
  data () {
    return {
      activeButton: this.settings.getUiOptions().items.fontSize.currentValue
    }
  },
  methods: {
    changeFontSize (size) {
      this.ui.optionChange('fontSize', size)
      this.activeButton = size
    }
  }
}
</script>
<style lang="scss">
  @import "../../styles/variables";

  .alpheios-setting__button-group {
    color: var(--alpheios-settings-font-size-dark-color);
    border: 1px solid var(--alpheios-settings-font-size-dark-color);
    border-radius: textsize(10px);
    max-width: textsize(200px);
    display: flex;
    // To prevent buttons background from spilling outside of the border radius areas
    overflow: hidden;

    button {
      border: none;
      border-right: 1px solid var(--alpheios-settings-font-size-dark-color);
      background: transparent;
      padding: textsize(6px) textsize(12px);
      font-size: textsize(10px);
      cursor: pointer;
      flex: 1;
      // Need below to override default styles of Safari
      margin: 0;
      border-radius: 0;
    }

    button:last-child {
      border-right: none;
    }

    button.active {
      color: var(--alpheios-settings-font-size-light-color);
      background: var(--alpheios-settings-font-size-dark-color);
      box-shadow: inset 0 textsize(4px) textsize(4px) rgba(0, 0, 0, 0.1);
    }
  }
</style>
