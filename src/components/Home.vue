<template>
  <div>
    <Header />
    <div class="movies-slide">
      <SliderHome />
    </div>
    <div class="discover-movies">
      <div class="movies-added">
        <div class="left">
          <hr>
          <span><b>Discover Movie</b></span>
        </div>
        <div class="right">
          <span class="m-r-15">My Movies</span>
          <div class="count-my-movies">
            <span><b>{{ myMovie.length }}</b> movies</span>
          </div>
        </div>
      </div>
      <div class="background-1" />
      <div class="flex-container">
        <div class="flex-item-left">
          <SidebarFilter />
        </div>
        <div class="flex-item-right">
          <MovieList />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/css/app.css'
import SliderHome from './SilderHome'
import SidebarFilter from './SidebarFilter.vue'
import MovieList from './MovieList.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    SidebarFilter,
    SliderHome,
    MovieList,
  },
    computed: {
    ...mapState({
      searchResult: state => {
        return state.searchResult
      },
      myMovie: state => {
        return state.myMovie
      }
    })
  },
  mounted() {
    this.setSelectedGenre([])
    this.setSelectedSort(0)
  },
  methods: {
    ...mapActions(['setSelectedGenre', 'setSelectedSort'])
  }
}
</script>
