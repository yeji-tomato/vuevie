<template>
  <header>
    <Logo />
    <a
      href="#"
      class="navbar__toogleBtn"
      @click="toogle()">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="currentColor"
        class="bi bi-justify"
        viewBox="0 0 16 16">
        <path
          fill-rule="evenodd"
          d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
      </svg>  
    </a>
    <div class="nav nav-pills">
      <div
        v-for="nav in navigations"
        :key="nav.name"
        class="nav-item">
        <RouterLink
          :to="nav.href"
          active-class="active"
          :class="{ active: isMatch(nav.path) }"
          class="nav-link">
          {{ nav.name }}
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex';
import Logo from '~/components/Logo'

export default {
    components:{
    Logo
  },
    data(){
        return{
            navigations: [
                {
                    name : 'Home',
                    href : '/'
                },
                {
                    name : 'Popular',
                    href : '/Popular'
                },
                {
                    name : 'Movie',
                    href : '/movie/496243',
                    path: /^\/movie/ // '/movie'
                }
            ]
        }
    },
    computed:{
      ...mapState('about',[
        'image',
        'name'
      ])
    },
    methods: {
      isMatch(path){
        if(!path) return false
        return path.test(this.$route.fullPath)
      },
      toogle(){
        const menu = document.querySelector('.nav-pills')
        menu.classList.toggle('click')
      }
    }
}
</script>

<style lang="scss" scoped>
@import "~/scss/main";
header{
  height: 100px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  position: relative;
  font-family: 'Noto Sans KR', sans-serif;
  .logo{
    margin-right: 40px;
  }
  .nav-link{
      margin-right: 20px;
  }
  .navbar__toogleBtn{
    position: absolute;
    top: 30px;
    right: 40px;
    display: none;
  }
}
@include media-breakpoint-down(sm){
    header{
      flex-direction: column;
      align-items: flex-start;
      padding: 0;
      .logo{
        padding: 8px 24px;
      }
      .nav{
        flex-direction: column;
        align-items: center;
        width: 100%;
        display: none;
        .nav-item{
          width: 100%;
          background: $black;
          text-align: center;
          padding: 10px;
          z-index: 10;
        }
      }
      .navbar__toogleBtn{
          display: block;
      }
      .click{
        display: flex;
      }
    }
  }
</style>