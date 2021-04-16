<template>
  <div class="main-card-wrapper">
    <Carousel
      :per-page="3"
      :autoplay="true"
      :autoplay-timeout="2000"
      :loop="true"
    >
      <Slide
        v-for="(item, index) in upcoming"
        :key="index"
      >
        <div class="card-wrapper">
          <div
            class="card"
            @click="goToDetails(item)"
          >
            <div class="image-wrapper">
              <div class="image-wrapper-hover" />
              <img
                :src="`${imagePath + item.poster_path}`"
              >
            </div>
            <div class="card-details">
              <div class="card-details-hover" />
              <div class="rate">
                <font-awesome-icon
                  class="star"
                  icon="star"
                />
                {{ item.vote_average }}
              </div>
              <div class="title">
                {{ item.title.length > 25 ? `${item.title.substring(0, 25)} ...` : item.title }}
              </div>
              <div class="year-genre">
                <span>{{ item.release_date.split('-')[0] }}</span>
                <span class="dot" />
                <span v-if="item.genre_ids.length === 0">-</span>
                <span v-else>{{ returnGenre(item.genre_ids[0]) }}</span>
              </div>
              <div class="description">
                {{ item.overview.length > 200 ? `${item.overview.substring(0, 200)} ...` : item.overview }}
              </div>
            </div>  
          </div>
        </div>
      </Slide>
    </Carousel>
  </div>
</template>
<script>
import '../assets/css/sliderHome.css'
import { Carousel, Slide } from 'vue-carousel';
import {mapState, mapActions} from 'vuex'
import mutationType from '../store/mutationType'
export default {
    components: {
        Carousel,
        Slide
    },
    data() {
        return {
            imagePath: 'http://image.tmdb.org/t/p/original',
        }
    },
    computed: {
        ...mapState({
            upcoming : state => {
                if (state.upcoming.length > 12) return state.upcoming.splice(0, 12)
                return state.upcoming
            },
            genre: state => {
                return state.genre
            }
        })
    },
    mounted() {
        const params = {
            page: 1,
            movie: 'upcoming',
            mutation: mutationType.home.SET_UPCOMING_MOVIE
        }
        if(this.upcoming.length === 0) this.getMovie(params)
    },
    methods:{
        ...mapActions(['getMovie', 'getMovieDetail']),
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
    },
}
</script>

<style>
    .VueCarousel-dot:focus{
        outline: none!important;
    }

    .VueCarousel-dot{
        background-color: rgba(204, 204, 204, 0.5)!important;
    }

    .VueCarousel-dot--active {
        background-color: #E74C3C!important;
        width: 50px!important;
        border-radius: 10px!important;
        border: solid #E74C3C 1px!important;
        padding: 0px!important;
    }
</style>