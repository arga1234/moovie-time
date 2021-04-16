<template>
  <div class="footer">
    <div class="copyright">
      ©  2021 MoovieTime. All rights reserved.
    </div>
    <div class="logo">
      <img :src="image">
    </div>
    <div class="framework">
      Made with Vue Js
    </div>
  </div>
</template>
<script>
import image from '../assets/img/moovietime-logo-grey@2x.png'
export default {
    data() {
        return {
            image: image
        }
    }
}
</script>
<style scoped>
.footer {
    position: relative;
    color: #929292;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100px;
    background: #000;
    padding: 0px 100px;
    box-sizing: border-box;
}

.footer .framework, .footer .copyright{
    flex: 25%;
}

.footer .framework{
    text-align: right;
}

.footer .logo {
    flex: 50%;
    justify-content: center;
    align-items: center;
    display: flex;
}

.logo img {
    width: 80px;
}
</style>