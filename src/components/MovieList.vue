<template>
  <div class="container">
    <div class="inner">
      <Loader v-if="loading" />
      <div
        class="message"
        v-else-if="message">
        {{ message }}
        <Animation />
      </div>
      <div
        v-else
        class="movies">
        <MovieItem
          v-for="movie in movies"
          :key="movie.id" 
          :movie="movie" />
      </div>
      <nav>
        <Pagination />
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Animation from '~/components/Animation'
import MovieItem from '~/components/MovieItem'
import Loader from '~/components/Loader'
import Pagination from '~/components/Pagination'

export default {
    components:{
        Animation,
        MovieItem,
        Loader,
        Pagination
    },
    computed: {
      ...mapState('movies', [
        'movies',
        'message',
        'loading'
      ])
    }
}
</script>

<style lang="scss" scoped>
@import '~/scss/main';
.container{
    margin-top: 10px;
    .inner{
        padding: 10px 0;
        .spinner-border{
          position: absolute;
          top: 50%;
          left: 50%;
        }
        .message{
          margin-top: 30px;
          color: $white;
          font-size: 20px;
          vertical-align: middle;
          text-align: center;
        }
        .movies{
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
        }
    }
    nav{
        padding-top: 30px;
    }
}
</style>