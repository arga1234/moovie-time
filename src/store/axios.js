import Vue from 'vue'
import axios from 'axios'
axios.defaults.params = {}
axios.defaults.params[ 'api_key' ] = process.env.VUE_APP_API_KEY
const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    timeout: 50 * 60 * 1000
})

Vue.prototype.$axios = axiosInstance
axiosInstance.interceptors.response.use(null, async (error) => {
    if (
      error &&
      error.response
    ) {
      return error
    }
  })

export { axiosInstance }