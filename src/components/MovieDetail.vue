<template>
  <div class="movie-detail-wrapper">
    <Header :header="transparant" />
    <div class="backdrop">
      <div class="backdrop-cover" />
      <div class="backdrop-bottom-cover" />
      <div class="backdrop-overview" />
      <img
        style="width:100%"
        :src="`${imagePath + movieDetail.backdrop_path}`"
        alt=""
      >
    </div>
    <div class="review">
      <div class="overview">
        <div class="left">
          <img :src="`${imagePath + movieDetail.poster_path}`">
        </div>
        <div class="right">
          <div class="top">
            <span class="year">{{ movieDetail.release_date.split('-')[0] }}</span>
            <span
              v-if="movieDetail.title.length < 35 "
              class="title"
            >{{ movieDetail.title }}
            </span>
            <span
              v-else
              class="title"
            >
              {{ movieDetail.title.substring(0, 35) }} ...
            </span>
            <span class="genre">{{ movieGenre(movieDetail.genres) }}</span>
          </div>
          <div class="mid">
            <div class="outer-left">
              <div>
                <font-awesome-icon
                  class="star-icon"
                  icon="star"
                />
              </div>
              <div class="rate">
                {{ movieDetail.vote_average }}
              </div>
              <div class="item">
                <span class="top-item">USER SCORE</span>
                <span class="bot-item">{{ movieDetail.vote_count }} VOTES</span>
              </div>
            </div>
            <div class="item">
              <span class="top-item">STATUS</span>
              <span class="bot-item">{{ movieDetail.status }}</span>
            </div>
            <div class="item">
              <span class="top-item">LANGUAGE</span>
              <span
                v-if="movieDetail.spoken_languages.length > 0"
                class="bot-item"
              >{{ movieDetail.spoken_languages[0].english_name }}</span>
            </div>
            <div class="item">
              <span class="top-item">BUDGET</span>
              <span class="bot-item">{{ new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(movieDetail.budget) }}</span>
            </div>
            <div class="item">
              <span class="top-item">PRODUCTION</span>
              <span
                v-if="movieDetail.production_companies.length > 0"
                class="bot-item"
              >{{ movieDetail.production_companies[0].name }}</span>
            </div>
          </div>
          <div class="bot">
            <span class="title">
              OVERVIEW
            </span>
            <span
              v-if="movieDetail.overview.length < 400"
              class="description"
            >
              {{ movieDetail.overview }}
            </span>
            <span
              v-else
              class="description"
            >
              {{ movieDetail.overview.substring(0, 400) }} ...
            </span>
          </div>
        </div>
      </div>
      
      <div class="users-review-wrapper">
        <p class="reviews-title">
          REVIEWS
        </p>
        <div
          v-if="movieReviews.length > 0"
          class="users-review"
        >
          <div
            v-for="(item, index) in movieReviews"
            :key="index"
            class="review-item"
          >
            <div class="header-user-rating">
              <div class="user">
                <img
                  :src="`${imagePath}/${item.author_details.avatar_path}`"
                >
                <div class="detail">
                  <span class="name">{{ item.author }}</span>
                  <span class="date">{{ userReviewDate(item.created_at) }}</span>
                </div>
              </div>
              <div
                v-if="item.author_details.rating"
                class="user-rating"
              >
                <font-awesome-icon
                  class="star-icon-user"
                  icon="star"
                />
                {{ item.author_details.rating }}
              </div>
            </div>
            <div
              class="body-user-rating"
            >
              <span v-if="item.content.length < 250">{{ item.content }}</span>
              <span v-else>{{ item.content.substring(0, 250) }} ... <span class="read-more"><i>read the rest</i></span></span>
            </div>
          </div>
        </div>
        <NotFound
          v-else
          message="Reviews Not Available"
        />
      </div>
    </div>
    <div class="recomendation">
      <div class="recomendation-wrapper">
        <p style="color:white">
          RECOMENDATION MOVIES
        </p>
        <div
          v-if="movieRecomendation.length > 0"
          class="recomendation-list"
        >
          <div
            v-for="(val, index) in movieRecomendation"
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
                  <span v-if="val.genre_ids.length === 0">Not Found</span>
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
                :src="`${imagePath + val.poster_path}`"
                alt=""
              >
              <div class="rating">
                {{ val.vote_average }}
              </div>
            </div>
            <p class="movie-card-title">
              {{ val.title }}
            </p>
            <p class="movie-card-year">
              {{ val.release_date.split('-')[0] }}
            </p>
          </div>
        </div>
        <NotFound v-else />
      </div>
    </div>
  </div>
</template>
<script>
import '../assets/css/movieDetail.css'
import '../assets/css/movieList.css'
import { mapState, mapActions } from 'vuex'
import mutationType from '../store/mutationType'
import month from '../helper/month'
export default {
    data() {
        return{
            imagePath: 'http://image.tmdb.org/t/p/original',
            transparant: true,
        }
    },
    computed: {
      ...mapState({
      movieDetail: state => {
        return state.movieDetail
      },
      movieReviews: state => {
        return state.movieReviews
      },
      movieRecomendation: state => {
        return state.movieRecomendation
      },
      genre: state => {
        return state.genre
      }
      })
    },
    mounted() {
      this.topFunction()
    },
    methods: {
      ...mapActions(['getMovieDetail', 'addMovie']),
      topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      },
      movieGenre(genres) {
        const arr = genres.map(item => {
          return item.name
        })
        return arr.join(', ')
      },
      userReviewDate(date) {
        const newDate = new Date(date)
        return `${month[newDate.getMonth()]} ${newDate.getDate()}, ${newDate.getFullYear()}`
      },
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
      this.topFunction()
    },
    }
}
</script>