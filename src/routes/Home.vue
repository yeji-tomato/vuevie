<template>
  <NowPlaying />
  <Search />
  <MovieList />
</template>

<script>
import Search from '~/components/Search'
import MovieList from '~/components/MovieList'
import NowPlaying from '~/components/NowPlaying'

export default {
    components:{
    Search,
    NowPlaying,
    MovieList
  },
  created(){
    this.$store.commit('movie/resetMovies')
  }
}
</script>