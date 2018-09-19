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
    @import "../styles/alpheios";

    .alpheios-popup-lexdataloading__progress-wrapper {
    	margin: 0 1rem 2rem;
    	box-sizing: border-box;
    }

    .alpheios-popup-lexdataloading__progress-inner {
	    border: 2px solid $alpheios-icon-color;
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
    }

    .alpheios-popup-lexdataloading__progress-text {
		display: block;
	    padding: 4px;  
	    box-sizing: border-box;
	    text-transform: uppercase;
	    position: relative;
	    z-index: 10;
	    border: 2px solid #fff;
	    font-size: 85%;
    }


    @-webkit-keyframes progress {
	  0% { 
	    background: lighten($alpheios-icon-color,15%);
	    width: 0%;
	  }
	  100% {
	    background: $alpheios-icon-color;
	    width: 100%;
	  }
	}

	@keyframes progress {
	  0% { 
	    background: lighten($alpheios-icon-color,15%);
	    width: 0%;
	  }
	  100% {
	    background: $alpheios-icon-color;
	    width: 100%;
	  }
	}


    @-o-keyframes progress {
	  0% { 
	    background: lighten($alpheios-icon-color,15%);
	    width: 0%;
	  }
	  100% {
	    background: $alpheios-icon-color;
	    width: 100%;
	  }
	}

    @-ms-keyframes progress {
	  0% { 
	    background: lighten($alpheios-icon-color,15%);
	    width: 0%;
	  }
	  100% {
	    background: $alpheios-icon-color;
	    width: 100%;
	  }
	}

	@-moz-keyframes progress {
	  0% { 
	    background: lighten($alpheios-icon-color,15%);
	    width: 0%;
	  }
	  100% {
	    background: $alpheios-icon-color;
	    width: 100%;
	  }
	}


</style>