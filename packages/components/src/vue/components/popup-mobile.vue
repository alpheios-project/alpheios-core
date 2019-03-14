<template>
  <div :data-notification-visible="data.notification.visible" :style="{left: positionLeftDm, top: positionTopDm, width: widthDm, height: heightDm}" class="auk alpheios-popup alpheios-popup--mobile"
       ref="popup"
       v-bind:class="data.classes" v-show="visible">
        <span :title="data.l10n.messages.TOOLTIP_POPUP_CLOSE.get()" @click="closePopup"
              class="alpheios-popup__close-btn">
            <close-icon></close-icon>
        </span>
    <div class="alpheios-popup__header">
      <div class="alpheios-popup__header-text">
        Mobile
        <span class="alpheios-popup__header-selection"
              v-show="data.status.selectedText">{{data.status.selectedText}}</span>
        <span class="alpheios-popup__header-word" v-show="data.status.languageName && verboseMode">({{data.status.languageName}})</span>
      </div>
      <div class="alpheios-button-group alpheios-popup__button-area">
        <button @click="showPanelTab('inflections')" class="alpheios-button alpheios-button-primary alpheios-button-small alpheios-popup__more-btn"
                v-show="data.inflDataReady">
          {{data.l10n.messages.LABEL_POPUP_INFLECT.get()}}
        </button>
        <button @click="showPanelTab('definitions')" class="alpheios-button alpheios-button-primary alpheios-button-small alpheios-popup__more-btn"
                v-show="data.defDataReady">
          {{data.l10n.messages.LABEL_POPUP_DEFINE.get()}}
        </button>
        <button @click="showPanelTab('options')"
                class="alpheios-button alpheios-button-primary alpheios-button-small alpheios-popup__more-btn">
          {{data.l10n.messages.LABEL_POPUP_OPTIONS.get()}}
        </button>
      </div>
    </div>
    <div class="alpheios-popup__morph-cont alpheios-popup__definitions--placeholder alpheios--text-small"
         v-show="!morphDataReady">
      {{data.l10n.messages.PLACEHOLDER_POPUP_DATA.get()}}
    </div>
    <div :id="lexicalDataContainerID" class="alpheios-popup__morph-cont alpheios-text-small" v-show="morphDataReady">
      <morph :definitions="definitions" :id="morphComponentID" :lexemes="lexemes"
             :linkedfeatures="linkedfeatures" @sendfeature="sendFeature">
      </morph>

      <div class="alpheios-popup__morph-cont-providers" v-if="showProviders">
        <div class="alpheios-popup__morph-cont-providers-header">{{data.l10n.messages.LABEL_POPUP_CREDITS.get()}}</div>
        <div class="alpheios-popup__morph-cont-providers-source" v-for="p in data.providers">
          {{ p.toString() }}
        </div>
      </div>
    </div>
    <div class="alpheios-popup__providers">
      <img class="alpheios-popup__logo" src="../../images/icon.png">
      <a class="alpheios-popup__providers-link" v-on:click="switchProviders">{{providersLinkText}}</a>
    </div>
    <div :class="notificationClasses" class="alpheios-popup__notifications alpheios-text-small"
         v-show="data.notification.important">
            <span @click="closeNotifications" class="alpheios-popup__notifications-close-btn">
                <close-icon></close-icon>
            </span>
      <span v-html="data.notification.text"></span>
      <setting :classes="['alpheios-popup__notifications--lang-switcher']" :data="data.settings.preferredLanguage"
               :show-title="false" @change="settingChanged"
               v-show="data.notification.showLanguageSwitcher"></setting>
    </div>
  </div>
</template>
<script>
/*
  This is an example of a modified popup component that changes a popup template
  */
import PopupBase from './popup.vue'

export default {
  extends: PopupBase,
  mounted () {
    console.log('Mounted in a Popup Mobile')
  }
}
</script>
<style lang="scss">
  .alpheios-popup.alpheios-popup--mobile {
    padding-top: 25px;
  }
</style>
