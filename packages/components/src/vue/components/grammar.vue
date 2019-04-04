<template>
  <div class="alpheios-grammar" v-if="$store.getters['app/hasGrammarRes']">
    <div class="alpheios-grammar__frame-cont" v-show="$store.state.app.grammarRes.url">
      <iframe :src="$store.state.app.grammarRes.url" class="alpheios-grammar__frame" scrolling="yes" v-if="$store.state.app.grammarRes.url"></iframe>
    </div>
    <div class="alpheios-grammar__provider" v-if="$store.state.app.grammarRes.provider">{{ $store.state.app.grammarRes.provider.toString() }}</div>
  </div>
  <div class="alpheios-grammar__provider" v-else>
    {{ l10n.getMsg('TEXT_NOTICE_GRAMMAR_NOTFOUND') }}
  </div>
</template>
<script>
import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'

export default {
  name: 'Grammar',
  inject: ['l10n'],
  storeModules: ['app'],
  mixins: [DependencyCheck]
}
</script>
<style lang="scss">
  @import "../../styles/variables";

  .alpheios-grammar {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .alpheios-grammar__provider {
    flex: none;
    font-weight: normal;

    padding: 20px 25px 20px;
    font-size: 80%;
  }

  .alpheios-grammar__frame-cont {
    flex: 1 1 auto;
    position: relative;
    -webkit-overflow-scrolling: touch;
    overflow-y: auto;
    height: 85vh;
  }

  .alpheios-grammar__frame {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    border: none;
    margin: 0;
    padding: 0;
    overflow: scroll;
  }
</style>
