<template>
  <footer>
    <a
      href="https://github.com/Lee-ye-ji"
      target="_black">
      (c) {{ new Date().getFullYear( ) }} YEJI
    </a>
  </footer>
</template>


<style lang="scss" scoped>
@import '~/scss/main';
footer{
    padding: 10px 0;
    text-align: center;
    opacity: .5;
    background: $gray-900;
    .logo{
        display: block;
        margin-bottom: 4px;
    }
    a{
        color: $gray-500;
        text-decoration: none;
    }
}
</style>