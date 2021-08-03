<template>
  <!-- <div>{{ movie.title }}</div> -->
  <RouterLink 
    :to="`/movie/${movie.id}`" 
    :style="{ backgroundImage : `url(${image(movie.poster_path)})`}"
    class="movie">
    <div class="info">
      <div class="year">
        {{ movie.release_date }}
      </div>
      <div class="title">
        {{ movie.title }}
      </div>
    </div>
  </RouterLink>
</template>

<script>

export default {
    props: {
        movie: {
            type: Object,
            default: () => ({})
        }
    },
    methods: {
    image(img) {
      return `https://image.tmdb.org/t/p/w300/${img}`;
    }
}
}
</script>

<style lang="scss" scoped>
@import "~/scss/main";

.movie{
  $width: 150px;
  width: $width;
  height: $width * 3 / 2;
  margin: 10px;
  border-radius: 4px;
  background-color: $gray-700;
  background-size: cover;
  overflow: hidden;
  position: relative;
  font-family: 'Noto Sans KR', sans-serif;
  &:hover::after{
    content: "";
    position: absolute;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    border: 2px solid $primary;
  }
//   img{
//     width: $width;
//     height: $width * 3 / 2;
//   }
  .info{
    background-color: rgba($black, .3);
    width: 100%;
    padding: 10px;
    font-size: 12px;
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
</style>


