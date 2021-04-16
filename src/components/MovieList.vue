<template>
  <div class="movie-list-wrapper">
    <div
      v-if="movieList.length > 0"
      class="movie-list"
    >
      <div
        v-for="(val, index) in movieList"
        :key="index"
        class="movie-card"
      >
        <div class="cover-image">
          <div class="cover-image-hover">
            <div class="movie-rate">
              <font-awesome-icon icon="star" />
              {{ val.vote_average }}
            </div>
            <div class="movie-genre">
              <span v-if="val.genre_ids.length === 0">-</span>
              <span v-else>{{ returnGenre(val.genre_ids[0]) }}</span>
            </div>
            <div>
              <div
                class="view-button"
                @click="goToDetails(val)"
              >
                VIEW
              </div>
            </div>
            <div>
              <div
                class="add-button"
                @click="addMovie(val)"
              >
                ADD 
              </div>
            </div>
          </div>
          <img
            style="width:100%"
            :src="`http://image.tmdb.org/t/p/original/${val.poster_path}`"
            alt=""
          >
          <div class="rating">
            {{ val.vote_average }}
          </div>
        </div>
        <p class="movie-card-title">
          {{ val.title }}
        </p>
        <p
          v-if="val.release_date"
          class="movie-card-year"
        >
          {{ val.release_date.split('-')[0] }}
        </p>
        <p v-else>
          -
        </p>
      </div>
    </div>
    <NotFound
      v-else
      message="Movie Not Found"
    />
    <div
      v-if="movieList.length > 0"
      class="more-button-wrapper"
    >
      <span
        class="more-button"
        @click="loadMore"
      >
        Load More
      </span>
    </div>
  </div>
</template>

<script>
import '../assets/css/movieList.css'
import { mapState, mapActions } from 'vuex'
import mutationType from '../store/mutationType'

export default {
    data(){
        return {
          page: 1
        }
    },
    computed: {
    ...mapState({
      movieList: state => {
        return state.movieList
      },
      genre: state => {
        return state.genre
      }
    })
    },
    mounted() {
    const params = {
      page: this.page,
      movie: 'popular',
      mutation: mutationType.home.SET_POPULAR_MOVIE
    }
    if (this.movieList.length === 0) this.getMovie(params)
    },
    methods: {
    ...mapActions(['getMovie', 'getMovieDetail', 'addMovie']),
    returnGenre(id) {
        const genre = this.genre.filter(x=> {
          if (x.id === id){
            return x
          }
        })
        return genre[0].name
      },
    async goToDetails(data) {
      const params = {
        id: data.id,
        mutation: mutationType.detail.SET_MOVIE_DETAIL
      }
      await this.getMovieDetail(params)
      this.$router.push('movie-detail')
    },
    loadMore(){
      this.page++
      const params = {
        page: this.page,
        movie: 'popular',
        mutation: mutationType.home.SET_POPULAR_MOVIE
      }
      this.getMovie(params)
    }
    }
}
</script>