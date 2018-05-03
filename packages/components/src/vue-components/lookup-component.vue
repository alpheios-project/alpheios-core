<template>
	<div class="alpheios-lookup_form">
		<input class="uk-input lookup_input" type="text" placeholder="Type text" v-model="lookuptext">
		<button class="uk-button uk-button-primary uk-button-small" type="button" tabindex="-1" 
			@click="lookup" @keyup.enter="lookup"
		>
			Lookup
		</button>
	</div>
</template>
<script>
  import TextSelector from '../lib/selection/text-selector'
  import LexicalQuery from '../lib/queries/lexical-query'

  export default {
    name: 'LookupComponent',
    data () {
      return {
      	lookuptext: ''
      }
    },
    methods: {
      'lookup': function () {
      	console.log('*********************lookup', this.lookuptext)
        if (this.lookuptext.length === 0) {
          return null
        }
        let textSelector = TextSelector.createObjectFromText(this.lookuptext)
        LexicalQuery
          .createForLookup(textSelector,
          {
          	targetRect: {top: 146, left: 129}
          })
          .getData()
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

