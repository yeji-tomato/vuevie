<template>
  <div class="container">
    <swiper
      :effect="'coverflow'"
      :grab-cursor="true"
      :centered-slides="true"
      :slides-per-view="'auto'"
      :coverflow-effect="{
        &quot;rotate&quot;: 50,
        &quot;stretch&quot;: 0,
        &quot;depth&quot;: 100,
        &quot;modifier&quot;: 1,
        &quot;slideShadows&quot;: true
      }"
      :pagination="true"
      class="mySwiper">
      <swiper-slide
        v-for="movie in popular"
        :key="movie.id" 
        :movie="movie">
        <RouterLink 
          :to="`/movie/${movie.id}`"
          :style="{ backgroundImage : `url(${image(movie.poster_path)})`}"
          class="movie">
          <div class="info">
            <div class="title">
              {{ movie.title }}
            </div>
            <div class="year">
              {{ movie.release_date }}
            </div>
          </div>
        </RouterLink>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/swiper.scss';

import "swiper/components/effect-coverflow/effect-coverflow.min.css"
import "swiper/components/pagination/pagination.min.css"

import SwiperCore, {
  EffectCoverflow,Pagination
} from 'swiper/core';

// install Swiper modules
SwiperCore.use([EffectCoverflow,Pagination]);


export default {
  components: {
    Swiper,
    SwiperSlide
  },
  computed: {
    popular(){
      console.log(this.$store.state.movie.popular)
      return this.$store.state.movie.popular.results
    }
  },
   created() {
    //  console.log(this.$route);
    this.$store.dispatch("movie/popularMovie", {
      id: this.$route.params.id,
    });
   },
   methods: {
    image(img) {
      return `https://image.tmdb.org/t/p/w500/${img}`;
    }
}
  
}
</script>

<style lang="scss" scoped>
@import "~/scss/main";

.container{
  color: $white;
  $width: 400px;
  font-family: 'Noto Sans KR', sans-serif;
  padding-bottom: 30px;
  .mySwiper{
    // background: $gray-700;
    .swiper-slide {
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;

        background-position: center;
        background-size: cover;
        width: $width;
        height: $width * 3 / 2;
    .movie{
        width: $width;
        height: $width * 3 / 2;
        margin: 10px;
        border-radius: 4px;
        background-color: $gray-700;
        background-size: cover;
        overflow: hidden;
        position: relative;
        &:hover::after{
          content: "";
          position: absolute;
          top:0;
          bottom: 0;
          left: 0;
          right: 0;
          border: 4px solid $primary;
        }
      .info{
        background-color: rgba($black, .3);
        width: 100%;
        padding: 10px;
        font-size: 15px;
        text-align: center;
        position: absolute;
        left: 0;
        bottom: 0;
        backdrop-filter: blur(10px);
        .year{
          color: $primary;
        }
        .title{
          color: $white;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
}
@include media-breakpoint-down(sm){
  .container{
    $width: 200px;
  }
}
</style>