import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/Home.vue'
import MovieDetail from './components/MovieDetail.vue'
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        { name: 'home', path: '/', component:  Home},
        { name: 'movie-detail', path: '/movie-detail', component:  MovieDetail},
    ]
})

export default router