<template>
	<div class="alpheios-lookup_form">
		<input class="uk-input lookup_input" type="text" placeholder="Type text">
		<button class="uk-button uk-button-primary uk-button-small" type="button" tabindex="-1">Lookup</button>
	</div>
</template>
<script>
  export default {
    name: 'LookupComponent',
    props: {
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
		}
    }
</style>

