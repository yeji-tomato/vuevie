<template>
  <div class="container">
    <Loader
      v-if="loading"
      :size="3"
      :z-index="9"
      fixed />
    <div
      v-else
      class="movie-details">
      <div
        class="img"
        :style="{ backgroundImage: `url(${image(theMovie.backdrop_path)}` }"></div>
      <div class="specs">
        <div class="top">
          <div class="title">
            {{ theMovie.title }}
          </div>
          <div class="year">
            {{ theMovie.release_date.split('-')[0] }}
          </div>
        </div>
        <div class="mid">
          <div class="time">
            {{ theMovie.runtime }}분
          </div>
          <div
            class="genres"
            v-for="genre in theMovie.genres"
            :key="genre.id">
          &nbsp;
            {{ genre.name }}
          </div>
        </div>
        <div class="fin">
          {{ theMovie.overview }}
        </div>
        <div
          class="video"
          v-if="!(theMovie.videos.results == '')"
          @click="$event.target.classList.toggle('show')">
          <svg
            @click="show=!show"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            class="bi bi-chevron-compact-up"
            viewBox="0 0 16 16">
            <path
              fill-rule="evenodd"
              d="M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894l6-3z" />
          </svg>
          <iframe
            v-show="show"
            :src="youtube(theMovie.videos.results[0].key)"> </iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Loader from '~/components/Loader'

export default {
  components: {
    Loader
  },
   data: function() {
    return {
        show: true 
      };
  },
  computed: {
    ...mapState('movie',[
      'theMovie',
      'loading'
    ])
  },
  created() {
    // this.$store.dispatch("movie/searchMovieWithId", {
      this.searchMovieWithId({
      id: this.$route.params.id,
    });
  },
  methods: {
    ...mapActions('movie',[
      'searchMovieWithId'
    ]),
    image(img) {
      return `https://image.tmdb.org/t/p/original/${img}`;
    },
    youtube(src) {
      return `https://www.youtube.com/embed/${src}?autoplay=1&mute=1`;
    }
  },
};
</script>

<style lang="scss" scoped>
.container{
    color: $white;
    font-family: 'Noto Sans KR', sans-serif;
  .movie-details {
  .img {
    width: 100%;
    height: 500px;
    background-color: $gray-700;
    background-repeat: no-repeat;
    background-size: 100% 500px;
  }
  .specs {
    .top {
      padding: 10px 0;
      display: flex;
      border-bottom: solid 1px white;
      .title {
        font-size: 40px;
      }
      .year {
        color: $primary;
        padding-top: 20px;
        padding-left: 20px;
        font-size: 20px;
      }
    }
    .mid {
      display: flex;
      padding: 10px 0;
      .time::after {
        content: "/";
      }
      .genres:not(:last-of-type)::after {
        content: "ㆍ";
      }
    }
    .fin {
      padding-bottom: 20px;
    }
    .video{
      padding: 10px 0;
      position: relative;
      svg {
        position: absolute;
        left: 50%;
      }
      .show{
        transform: rotate(180deg);
        transition: transform .5s;
      }
      iframe{
        padding-top: 10px;
        width: 100%;
        height: 500px;
      }
    }
  }
}
@include media-breakpoint-down(sm){
  .movie-details {
    .img {
      height: 300px;
    }
    .specs{
      .top{
        .title{
          font-size: 30px;
        }
        .year {
          font-size: 15px;
        }
      }
      .fin{
        font-size: 12px;
      }
    }
  }
  iframe{
    height: 200px;
  }
}
}
</style>