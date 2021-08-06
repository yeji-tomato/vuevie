<template>
  <ul class="pagination justify-content-center">
    <li
      v-for="p in pages"
      :key="p"
      class="page-item"
      @click="pageClick(p)">
      <span
        class="page-link">
        {{ p }}
      </span>
    </li>
  </ul>
</template>

<script>
export default {
     methods:{
        pageClick(msg){
            this.$store.dispatch('movie/searchMovies', {
            page: msg,
            title: this.$store.state.movie.title
      })
        }
    
    },
    computed: {
        pages(){
            return this.$store.state.movie.pages
        }
    }
}
</script>