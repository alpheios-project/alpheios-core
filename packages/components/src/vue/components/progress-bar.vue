<template>
  <div>
    <div class="alpheios-popup-lexdataloading__progress-wrapper">
      <div class="alpheios-popup-lexdataloading__progress-inner">
        <div class="alpheios-popup-lexdataloading__progress-line"></div>
        <div
            class="alpheios-popup-lexdataloading__progress-text"
            v-show="text"
        >
          {{ text }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProgressBar',
  props: {
    text: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>
<style lang="scss">
  @import "../../styles/variables";

  .alpheios-popup-lexdataloading__progress-wrapper {
    box-sizing: border-box;
  }

  .alpheios-popup-lexdataloading__progress-inner {
    border: uisize(2px) solid var(--alpheios-desktop-popup-progress-bar-line);
    border-radius: textsize(10px);
    text-align: center;
    box-sizing: border-box;
    position: relative;
    background: white;
  }

  .alpheios-popup-lexdataloading__progress-line {
    background: var(--alpheios-desktop-popup-progress-bar-line);
    animation: progress 3s infinite;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    border-radius: textsize(10px);
  }

  .alpheios-popup-lexdataloading__progress-text {
    display: block;
    padding: 4px;
    box-sizing: border-box;
    text-transform: uppercase;
    position: relative;
    z-index: 10;
    border: 2px solid #fff;
    border-radius: textsize(10px);
    font-size: 85%;
  }

  @keyframes progress {
    0% {
      transform: translateX(-49.5%) scaleX(0.01);
    }
    100% {
      transform: translateX(0%) scaleX(1);
    }
  }

</style>
