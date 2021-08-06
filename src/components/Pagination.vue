<template>
  <ul class="pagination justify-content-center">
    <li
      v-for="(p, index) in pages"
      :key="p"
      class="page-item"
      @click="pageClick(p)">
      <span
        v-if="index< 10"
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
            query: this.$store.state.movie.query
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