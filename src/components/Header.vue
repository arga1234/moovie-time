<template>
  <div :class="header ? 'header transparant': 'header'">
    <img
      src="../assets/img/moovietime-logo@2x.png"
      @click="goToHome"
    >
    <div class="search-movie">
      <img src="../assets/img/movie-icon@2x.png">
      <input
        v-model="searchString"
        type="text"
        placeholder="Find movie"
      >
      <font-awesome-icon
        class="search-icon"
        icon="search"
      />
      <div class="search-result">
        <VuePerfectScrollbar class="item-list">
          <span
            v-for="(val, index) in searchResult"
            :key="index"
            @click="goToDetails(val)"
          >
            {{ val.title }}
          </span>
        </VuePerfectScrollbar>
      </div>
    </div>
    <div class="menu">
      <img src="../assets/img/grid-icon@2x.png">
      <span>Categories</span>
      <span>Movies</span>
      <span>TV Shows</span>
      <span>Login</span>
    </div>
  </div>
</template>
<script>
import {mapActions, mapState} from 'vuex'
import '../assets/css/header.css'
import mutationType from '../store/mutationType'
export default {
    props: {
        header: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            searchString: ''
        }
    },
    computed: {
    ...mapState({
      searchResult: state => {
        return state.searchResult
      },
    })
  },
    watch: {
        searchString(val) {
            this.searchMovie(val)
        }
    },
    mounted(){
        this.searchMovie('')
    },
    methods: {
        ...mapActions(['searchMovie', 'getMovieDetail']),
        async goToDetails(data) {
        const params = {
            id: data.id,
            mutation: mutationType.detail.SET_MOVIE_DETAIL
        }
        await this.getMovieDetail(params)
        this.searchString = ''
        if (this.$route.name !== 'movie-detail')  this.$router.push('movie-detail')
        },
        goToHome(){
          this.$router.push('/')
        },
    }
}
</script>