<template>
	<div class="alpheios-lookup_form">
		<input class="uk-input lookup_input" type="text" placeholder="Type text" v-model="lookuptext"
			@keyup.enter="lookup"
		>
		<button class="uk-button uk-button-primary uk-button-small" type="button" tabindex="-1" 
			@click="lookup" 
		>
			{{ l10nmessages.LABEL_LOOKUP_BUTTON}}
		</button>
	</div>
</template>
<script>
  import TextSelector from '../lib/selection/text-selector'
  import LexicalQueryLookup from '../lib/queries/lexical-query-lookup'

  export default {
    name: 'Lookup',
    data () {
      return {
      	lookuptext: ''
      }
    },
    props: {
      uiController: {
        type: Object,
        required: true
      },
      l10nmessages: {
        type: Object,
        required: true
      }
    },
    methods: {
      'lookup': function () {
        if (this.lookuptext.length === 0) {
          return null
        }
        let textSelector = TextSelector.createObjectFromText(this.lookuptext)
        LexicalQueryLookup
          .createForLookup(textSelector, this.uiController)
          .getData()

        this.lookuptext = ''
      }
    }
  }
</script>
<style lang="scss">
    @import "../styles/alpheios";

    .alpheios-lookup_form {
    	margin: 15px 10px 5px;
    	text-align: center;

    	.uk-input {
	    	width: 80%;
		    line-height: 28px;
		    height: 30px;
		    font-size: 14px;
		    margin-bottom: 10px;
		    vertical-align: top;
		}

		.uk-button {
			font-size: 12px;
    		vertical-align: top;
    	}
    }
</style>

