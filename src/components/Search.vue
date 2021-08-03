<template>
  <div class="container">
    <input
      v-model="title"
      class="form-control"
      type="text"
      placeholder="영화제목을 입력해주세요!"
      @keyup.enter="apply" />
    <button
      class="btn btn-primary"
      @click="apply">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-search"
        viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
      </svg>
    </button>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  data(){
    return {
      title: ''
    }
  },
  methods: {
    async apply(){
      this.$store.dispatch('movie/searchMovies', {
        title: this.title
      })
      // console.log(this.title)
    }
    // async apply(){
    //   const TMDB_API_KEY = 'cb772a50acc4cd6917b12854484b9d91'

    //         const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=ko-KR&query=${this.title}`)
    //         console.log(res.data)
    // }
  }
}
</script>

<style lang="scss" scoped>
.container{
    display: flex;
    padding-top: 20px;
    font-family: 'Noto Sans KR', sans-serif;
    .btn{
        width: 120px;
        height: 50px;
        font-weight: 700;
        flex-shrink: 0;
    }
}
</style>