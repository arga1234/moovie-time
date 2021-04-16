import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store/index';
import Header from './components/Header'
import NotFound from './components/NotFound'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faStar, faSearch } from '@fortawesome/free-solid-svg-icons'

library.add(faStar, faSearch)

Vue.component('Header', Header)
Vue.component('NotFound', NotFound)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('VuePerfectScrollbar', VuePerfectScrollbar)
Vue.config.productionTip = false


new Vue({ el: '#app', store, router, render: h => h(App) })
