<template>
  <div
    :style="{
      width: `${size}rem`,
      height: `${size}rem`,
      zIndex
    }"
    :class="{ 
      absolute, 
      fixed 
    }"
    class="spinner-border text-primary"></div>
</template>

<script>
export default {
    props:{
        size: {
            type: Number,
            default: 2
        },
        absolute: {
            type: Boolean,
            default: false
        },
        fixed: {
            type: Boolean,
            default: false
        },
        zIndex: {
            type: Number,
            default: 0
        }
    }
}
</script>

<style lang="scss" scoped>
.spinner-border{
    left: 50%;
    top: 50%;
    &.absolute{
        position: absolute;
    }
    &.fixed{
        position: fixed;
    }
}
</style>