<template>
	<div class="alpheios-lookup_form">
		<input class="uk-input lookup_input" type="text" placeholder="Type text" v-model="lookuptext">
		<button class="uk-button uk-button-primary uk-button-small" type="button" tabindex="-1" @click="lookup">Lookup</button>
	</div>
</template>
<script>
  import TextSelector from '../lib/selection/text-selector'
  import ContentOptions from '../lib/options/content-options'

  export default {
    name: 'LookupComponent',
    data () {
      return {
      	lookuptext: ''
      }
    },
    methods: {
      'lookup': function () {
        // console.log('looking for', this.lookuptext)
        if (this.lookuptext.length === 0) {
          return null
        }
        let options = new ContentOptions()

        let textSelector = TextSelector.readObject({
          text: this.lookuptext,
          languageCode: options.items.preferredLanguage.currentValue
        })
        console.log('*********** lookup textSelector', textSelector)
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

