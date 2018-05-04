<template>
    <div ref="popup" class="auk alpheios-popup alpheios-popup--mobile" v-bind:class="data.classes" :style="{left: positionLeftDm, top: positionTopDm, width: widthDm, height: heightDm}"
         v-show="visible" :data-notification-visible="data.notification.visible">
        <span class="alpheios-popup__close-btn" @click="closePopup" :title="data.l10n.messages.TOOLTIP_POPUP_CLOSE">
            <close-icon></close-icon>
        </span>
        <div class="alpheios-popup__header">
            <div class="alpheios-popup__header-text">
                Mobile
                <span v-show="data.status.selectedText" class="alpheios-popup__header-selection">{{data.status.selectedText}}</span>
                <span v-show="data.status.languageName && data.verboseMode" class="alpheios-popup__header-word">({{data.status.languageName}})</span>
            </div>
            <div class="uk-button-group alpheios-popup__button-area">
                <button @click="showPanelTab('inflections')" v-show="data.inflDataReady"
                        class="uk-button uk-button-primary uk-button-small alpheios-popup__more-btn">{{data.l10n.messages.LABEL_POPUP_INFLECT}}
                </button>
                <button @click="showPanelTab('definitions')" v-show="data.defDataReady"
                        class="uk-button uk-button-primary uk-button-small alpheios-popup__more-btn">{{data.l10n.messages.LABEL_POPUP_DEFINE}}
                </button>
                <button @click="showPanelTab('options')"
                        class="uk-button uk-button-primary uk-button-small alpheios-popup__more-btn">{{data.l10n.messages.LABEL_POPUP_OPTIONS}}
                </button>
            </div>
        </div>
        <div v-show="!morphDataReady"
             class="alpheios-popup__morph-cont alpheios-popup__definitions--placeholder uk-text-small">
            {{data.l10n.messages.PLACEHOLDER_POPUP_DATA}}
        </div>
        <div v-show="morphDataReady" :id="lexicalDataContainerID" class="alpheios-popup__morph-cont uk-text-small">
            <morph :id="morphComponentID" :lexemes="lexemes" :definitions="definitions"
                   :linkedfeatures="linkedfeatures" @sendfeature="sendFeature">
            </morph>

            <div class="alpheios-popup__morph-cont-providers" v-if="showProviders">
                <div class="alpheios-popup__morph-cont-providers-header">{{data.l10n.messages.LABEL_POPUP_CREDITS}}</div>
                <div class="alpheios-popup__morph-cont-providers-source" v-for="p in data.providers">
                    {{ p.toString() }}
                </div>
            </div>
        </div>
        <div class="alpheios-popup__providers">
            <img class="alpheios-popup__logo" src="../images/icon.png">
            <a class="alpheios-popup__providers-link" v-on:click="switchProviders">{{providersLinkText}}</a>
        </div>
        <div class="alpheios-popup__notifications uk-text-small" :class="notificationClasses"
             v-show="data.notification.important">
            <span @click="closeNotifications" class="alpheios-popup__notifications-close-btn">
                <close-icon></close-icon>
            </span>
            <span v-html="data.notification.text"></span>
            <setting :data="data.settings.preferredLanguage" :show-title="false"
                     :classes="['alpheios-popup__notifications--lang-switcher']" @change="settingChanged"
                     v-show="data.notification.showLanguageSwitcher"></setting>
        </div>
    </div>
</template>
<script>
  /*
  This is an example of a modified popup component that changes a popup template
  */
  import PopupBase from './popup.vue';
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
