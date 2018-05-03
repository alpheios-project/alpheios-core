<template>  
    <div v-html="require(`../images/inline-icons/${icon}.svg`)"></div>
</template>

<script>  
export default {  
    props: ['icon']
}
</script>  