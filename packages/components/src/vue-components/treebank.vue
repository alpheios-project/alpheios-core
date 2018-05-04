<template>
  <div class="alpheios-treebank">
    <iframe class="alpheios-treebank__frame" :src="srcUrl"></iframe>
  </div>
</template>
<script>
  export default {
    name: 'Treebank',
    props: {
      res: {
        type: Object,
        required: true
      },
      messages: {
        type: Object,
        required: true
      },
      locale: {
        type: String,
        required: true
      },
      visible: {
        type: Boolean,
        required: true
      }
    },
    data: function () {
      return {
        srcUrl: ""
      }
    },
    methods: {
      updateSrcUrl(url) {
        this.srcUrl = url
      }
    },
    watch: {
      visible: function(val) {
        // The arethusa application can't initialize itself properly
        // if it's not visible, so we wait to update the src url of the
        // parent iframe until the tab is visible
        if (val) {
          this.$emit('treebankcontentwidth', '43em')
          let newSrcUrl
          if (this.res.word && this.res.word.src && this.res.word.ref) {
            let [s,w] = this.res.word.ref.split(/-/)
            newSrcUrl = this.res.word.src.replace('SENTENCE',s).replace('WORD',w)
            // only update the srcUrl property if we have a new URL - we don't
            // want to reload if it was hidden after being populated but hasn't
            // actually changed
            if (newSrcUrl != this.srcUrl) {
              this.updateSrcUrl(newSrcUrl)
            }
          } else if (this.res.page) {
            this.updateSrcUrl(this.res.page.src)
          }
        }
      }
    }
  }
</script>
<style lang="scss">
    @import "../styles/alpheios";

    .alpheios-treebank {
        display: flex;
        flex-direction: column;
    }

    .alpheios-treebank__frame {
        flex: 1 1 100vh;
    }
</style>
