<template>
  <div class="wrapper">
    <p class="sort-title">
      Sort Result By
    </p>
    <hr>
    <div class="select-box">
      <input
        v-model="selectedSort"
        type="text"
        readonly
        @focus="selectOpen=true"
      >
      <div
        v-if="selectOpen"
        class="option-box"
      >
        <p
          v-for="(val, index) in sortCategory"
          :key="index"
          @click="selectOption(index)"
        >
          {{ val }}
        </p>
      </div>
    </div>
    
    <!-- <select v-model="selectedSort">
      <option
        v-for="(val, index) in sortCategory"
        :key="index"
        :value="index"
      >
        {{ val }}
      </option>
    </select> -->
    <br>
    <p class="sort-title">
      Genres
    </p>
    <hr>
    <div
      v-for="(val, index) in genre"
      :key="index"
      class="genre-item"
    >
      <span>{{ val.name }}</span>
      <div class="checkbox-wrapper">
        <input
          v-model="selectedGenre"
          type="checkbox"
          :value="val.id"
        >
        <span class="checkmark" />
      </div>
    </div>
  </div>
</template>
<script>
import '../assets/css/sidebarFilter.css'
import sortCategory from '../helper/sortCategory'
import { mapState, mapActions } from 'vuex'
export default {
    data() {
        return{
            sortCategory: sortCategory,
            selectedSort: sortCategory[0],
            selectedGenre: [],
            selectOpen: false,
        }
    },
    computed: {
    ...mapState({
      genre: state => {
        return state.genre
      },
    }),
    },
    watch: {
        selectedGenre(val) {
            this.setSelectedGenre(val)
        },
    },
    mounted() {
        this.getGenre()
    },
    methods: {
    ...mapActions(['setSelectedGenre', 'getGenre', 'setSelectedSort']),
    selectOption(val) {
      this.selectedSort = this.sortCategory[val] 
      this.setSelectedSort(val)
      this.selectOpen = false
    }
  },
}
</script>