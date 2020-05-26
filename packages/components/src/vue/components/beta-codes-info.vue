<template>
    <div v-show="currentShowBetaCodesInfo" class="alpheios-lookup__form-beta-codes-info">
      <p v-html="l10n.getMsg('LOOKUP_USE_BETA_CODES_INFO_FIRST')"></p>
      <div><span>a => α</span><span>b => β</span><span>c => ξ</span><span>d => δ</span><span>e => ε</span>
      <span>f => φ</span><span>g => γ</span><span>h => η</span><span>i => ι</span><span>k => κ</span>
      <span>l => λ</span><span>m => μ</span><span>n => ν</span><span>o => ο</span><span>p => π</span>
      <span>q => θ</span><span>r => ρ</span><span>s => σ, ς</span><span>t => τ</span><span>u => υ</span>
      <span>v => ϝ</span><span>w => ω</span><span>x => χ</span><span>y => ψ</span><span>z => ζ</span>
      <span>/a => ά</span><span>\a => ὰ</span><span>=a => ᾶ</span><span>)a => ἀ</span><span>)a => ἁ</span>
      <span>|a => ᾳ</span><span>_a => ᾱ</span><span>^a => ᾰ</span><span>+i => ϊ</span><span>(/|a => ᾅ</span></div>
    </div>
</template>
<script>
export default {
  name: 'BetaCodesInfo',
  inject: ['l10n', 'settings'],
  props: {
    availableUseBetaCodes: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  computed: {
    featureOptions () {
      return this.$store.state.settings.featureResetCounter + 1 ? this.settings.getFeatureOptions() : null
    },
    currentShowBetaCodesInfo () {
      return this.featureOptions ? this.availableUseBetaCodes && this.featureOptions.items.showBetaCodesInfo.currentValue : null
    }    
  }
}

</script>
<style lang="scss">
  @import "../../styles/variables";
  .alpheios-lookup__form .alpheios-lookup__form-beta-codes-info {
    border-bottom: 1px solid var(--alpheios-color-placehoder);
    margin-bottom: textsize(10px);
    padding-bottom: textsize(20px);
    font-size: 94%;

    div {
      display: grid;
      grid-template-columns: repeat(4,1fr);
    }
  }

</style>