<template>
  <div class="container">
    <swiper
      :space-between="30"
      :centered-slides="true"
      :autoplay="{
        &quot;delay&quot;: 2500,
        &quot;disableOnInteraction&quot;: false
      }"
      :pagination="{
        &quot;clickable&quot;: true
      }"
      :navigation="true"
      class="mySwiper">
      <swiper-slide
        v-for="movie in nowplaying"
        :key="movie.id" 
        :movie="movie">
        <RouterLink
          :to="`/movie/${movie.id}`"
          class="movie">
          <div class="info">
            <div class="title">
              {{ movie.title }}
            </div>
            <div class="year">
              {{ movie.release_date }}
            </div>
          </div>
          <img
            :src="`${image(movie.backdrop_path)}`"
            alt="" />
        </RouterLink>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper.scss';
import "swiper/components/pagination/pagination.min.css"

import SwiperCore, {
  Autoplay,Pagination,Navigation
} from 'swiper/core';

// install Swiper modules
SwiperCore.use([Autoplay,Pagination,Navigation]);


export default {
  components: {
    Swiper,
    SwiperSlide
  },
    computed: {
    nowplaying(){
      return this.$store.state.movie.nowplaying.results
    }
  },
  created() {
    this.$store.dispatch("movie/nowPlayingMovie", {
      id: this.$route.params.id,
    });
   },
    methods: {
  image(img) {
    return `https://image.tmdb.org/t/p/original/${img}`;
  }
}
}
</script>


<style lang="scss" scoped>
@import "~/scss/main";
.container{
  $width: 100%;
  $height: 550px;
  color: $white;
  font-family: 'Noto Sans KR', sans-serif;
  .swiper-container {
    width: $width;
    height: $height;
  }

  .swiper-slide {
    position: relative;
    .movie{
      &:hover::after{
          content: "";
          position: absolute;
          top:0;
          bottom: 0;
          left: 0;
          right: 0;
          border: 4px solid $primary;
          background-color: rgba($black, .3);
        }
        .info{
          width: $width;
          bottom: 0;
          position: absolute;
          background-color: rgba($black, .7);
          padding: 15px;
        .title{
          font-size: 30px;
          color: $white;
        }
        .year{
          color: $primary;
          font-size: 20px;
        }
      }
      img{
          width: $width;
          height: $height;
          background-color: $gray-700;
      }
    }
  }
  @include media-breakpoint-down(sm){
    .swiper-container {
      height: 350px;
    }
    .swiper-slide {
      // position: absolute;
      // top: 20;
      .movie{
        .info{
          .title{
            font-size: 20px;
          }
          .year{
             font-size: 15px;
          }
        }
      }
    }
  }
}
</style>