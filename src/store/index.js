import Vue from 'vue'
import Vuex from 'vuex'
import { axiosInstance } from './axios'
import url from '../helper/url'
import mutationType from './mutationType'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

const store = new Vuex.Store({
  state: {
    genre: [],
    upcoming: [],
    popular: [],
    movieList: [],
    searchResult: [],
    movieDetail: {},
    sortBy: 0,
    selectedGenre: [],
    myMovie: [],
    movieReviews: [],
    movieRecomendation: []
  },
  mutations: {
    [mutationType.home.SET_POPULAR_MOVIE] : (state, data) => {
        state.popular  = [...state.popular, ...data]
    },
    [mutationType.home.SET_UPCOMING_MOVIE] : (state, data) => {
        state.upcoming  = [...state.upcoming, ...data]
    },

    [mutationType.detail.SET_MOVIE_DETAIL] : (state, data) => {
        state.movieDetail  = data
    },
    [mutationType.home.SET_MOVIE_LIST] : (state, data) => {
        state.movieList  = data
    },
    [mutationType.home.SET_GENRE] : (state, data) => {
        state.genre = data
    },
    [mutationType.home.SET_SELECTED_SORT] : (state, data) => {
        state.sortBy = data
    },
    [mutationType.home.SET_SEARCH_RESULT] : (state, data) => {
        state.searchResult = data
    },
    [mutationType.home.SET_SELECTED_GENRE] : (state, data) => {
        state.selectedGenre = data
    },
    [mutationType.home.ADD_MOVIE] : (state, data) => {
        state.myMovie = [...state.myMovie, data]
    },
    [mutationType.detail.SET_MOVIE_REVIEWS] : (state, data) => {
        state.movieReviews = data
    },
    [mutationType.detail.SET_MOVIE_RECOMENDATION] : (state, data) => {
        state.movieRecomendation = data
    }
  },
  actions: {
    addMovie: ({commit, state}, movie) => {
        const alreadyExist = state.myMovie.some((x)=> {
            return x.id === movie.id
        })

        if(!alreadyExist){
            commit(mutationType.home.ADD_MOVIE, movie)
        } 
    },
    searchMovie: async ({commit}, searchString) => {
        if (searchString.length > 0) {
            const resp = await axiosInstance(`${url.movie.search}?query=${searchString}`)
            commit(mutationType.home.SET_SEARCH_RESULT, resp.data.results)
        }else {
            commit(mutationType.home.SET_SEARCH_RESULT, [])
        }
    },
    setMovieList: async ({dispatch, commit}, params) => {
        const filteredMovies = await dispatch('filterMovie')
        params.data = filteredMovies
        const sortedMovies = await dispatch('sortMovie', params)
        commit(mutationType.home.SET_MOVIE_LIST, sortedMovies)
    },
    setSelectedGenre: ({dispatch, commit, state}, genre) => {
        commit(mutationType.home.SET_SELECTED_GENRE, genre)
        const params = {
            data: state.popular,
            sortBy: state.sortBy
        }
        dispatch('setMovieList', params)
    },
    setSelectedSort: ({dispatch, commit, state}, data) => {
        commit(mutationType.home.SET_SELECTED_SORT, data)
        const params = {
            data: state.popular,
            sortBy: data
        }
        dispatch('setMovieList', params)
    },
    getMovieDetail: async ({commit}, {id, mutation}) => {
        const resp = await axiosInstance.get(`${url.movie.detail(id)}`)
        commit(mutationType.detail[mutation], resp.data)
        
        const resp2 = await axiosInstance.get(`${url.movie.review(id)}`)
        if (resp2.data.results.length > 2 ){
            commit(mutationType.detail.SET_MOVIE_REVIEWS, resp2.data.results.slice(0,2))
        }else{
            commit(mutationType.detail.SET_MOVIE_REVIEWS, resp2.data.results)
        }

        const resp3 =  await axiosInstance.get(`${url.movie.recomendations(id)}`)
        if (resp3.data.results.length > 5 ){
            commit(mutationType.detail.SET_MOVIE_RECOMENDATION, resp3.data.results.slice(0,5))
        }else{
            commit(mutationType.detail.SET_MOVIE_RECOMENDATION, resp3.data.results)
        }
    },
    getGenre: async ({commit}) => {
        const resp = await axiosInstance(url.movie.genre)
        commit(mutationType.home.SET_GENRE, resp.data.genres)
    },
    getMovie: async ({dispatch, commit, state}, {movie, page, mutation}) => {
        const resp = await axiosInstance.get(`${url.movie[movie]}?page=${page}`)
        commit(mutationType.home[mutation], resp.data.results)
        if (movie === 'popular'){
            const params = {
                data: [...state.popular],
                sortBy: state.sortBy
            }
            dispatch('setMovieList', params)
        }
    },
    filterMovie: async ({state}) => {
        var dataFilterd = []
        if (state.selectedGenre.length > 0) {
            dataFilterd = state.popular.filter(x => {
                const availability = x.genre_ids.some(r=> state.selectedGenre.includes(r))
                if (!availability) {
                    return
                }
                return x
            })
        }else {
            dataFilterd = state.popular 
            return dataFilterd
        }

        return dataFilterd
    },
    sortMovie: async ({}, {sortBy, data}) => {
        switch (sortBy) {
            case 0: 
            return await data.sort((a, b) => a.popularity - b.popularity) //asc popularity
            case 1:
            return await data.sort((a, b) => b.popularity - a.popularity) //des popularity
            case 2:
            return await data.sort((a, b) => a.vote_average - b.vote_average) //asc ratings
            case 3: 
            return await data.sort((a, b) => b.vote_average - a.vote_average) //des ratings
            case 4:
            return await data.sort((a, b) => new Date(a.release_date) - new Date(b.release_date)) // asc release date
            case 5:
            return await data.sort((a, b) => new Date(b.release_date) - new Date(a.release_date)) // des release date
            default:
            return await data
        }
    }
  },
  plugins: [vuexLocal.plugin]
})

export default store