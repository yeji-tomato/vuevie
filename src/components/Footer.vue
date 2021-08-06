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
footer{
    padding: 5px 0;
    margin-top: 15px;
    text-align: center;
    opacity: .5;
    background: $gray-900;
    a{
        color: $gray-500;
        text-decoration: none;
    }
}
</style>