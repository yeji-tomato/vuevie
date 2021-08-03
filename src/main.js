import { createApp } from 'vue';
import App from './App';
import router from './routes'
import store from './store'
import CarouselCard from 'vue-carousel-card'

createApp(App)
    .use(router)
    .use(store)
    .use(CarouselCard)
    .mount("#app");
    