<template>
  <div>
    <div class="alpheios-popup-lexdataloading__progress-wrapper">
      <div class="alpheios-popup-lexdataloading__progress-inner">
        <div class="alpheios-popup-lexdataloading__progress-line"></div>
        <div class="alpheios-popup-lexdataloading__progress-text">
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
      required: false
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
    border: 2px solid $alpheios-icon-color;
    border-radius: px2rem(10px);
    text-align: center;
    box-sizing: border-box;
    position: relative;
    background: white;
  }

  .alpheios-popup-lexdataloading__progress-line {
    -webkit-animation: progress 3s infinite;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    border-radius: px2rem(10px);
  }

  .alpheios-popup-lexdataloading__progress-text {
    display: block;
    padding: 4px;
    box-sizing: border-box;
    text-transform: uppercase;
    position: relative;
    z-index: 10;
    border: 2px solid #fff;
    border-radius: px2rem(10px);
    font-size: 85%;
  }

  @-webkit-keyframes progress {
    0% {
      background: lighten($alpheios-icon-color, 15%);
      width: 0%;
    }
    100% {
      background: $alpheios-icon-color;
      width: 100%;
    }
  }

  @keyframes progress {
    0% {
      background: lighten($alpheios-icon-color, 15%);
      width: 0%;
    }
    100% {
      background: $alpheios-icon-color;
      width: 100%;
    }
  }

  @-o-keyframes progress {
    0% {
      background: lighten($alpheios-icon-color, 15%);
      width: 0%;
    }
    100% {
      background: $alpheios-icon-color;
      width: 100%;
    }
  }

  @-ms-keyframes progress {
    0% {
      background: lighten($alpheios-icon-color, 15%);
      width: 0%;
    }
    100% {
      background: $alpheios-icon-color;
      width: 100%;
    }
  }

  @-moz-keyframes progress {
    0% {
      background: lighten($alpheios-icon-color, 15%);
      width: 0%;
    }
    100% {
      background: $alpheios-icon-color;
      width: 100%;
    }
  }

</style>
