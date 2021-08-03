<template>
  <ul class="pagination justify-content-center">
    <!-- <li class="page-item">
            <a
              class="page-link"
              href="#"
              aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li> -->
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
    <!-- <li class="page-item">
            <a
              class="page-link"
              href="#"
              aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li> -->
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
        // const page = document.getElementsByClassName('page-link')
        console.log(msg)
        // console.log("id =" + this.p);
        }
    
    },
    computed: {
        pages(){
            return this.$store.state.movie.pages
        }
    }
}
</script>