<template>
  <div class="not-found">
    {{ message }}
  </div>
</template>
<script>
export default {
    props:{
        message: {
            type: String,
            default: 'Not Found'
        }
    },
    data() {
        return{

        }
    }
}
</script>

<style scoped>
    .not-found{
        position: relative;
        width: 100%;
        min-height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: red;
        font-size: 16px;
    }
</style>