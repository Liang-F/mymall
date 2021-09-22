<template>
  <swiper>
    <swiper-item v-for="item in banners">
<!--      item.link-->
      <a href="javascript:;">
        <img :src="item.image" alt="" @load="imgLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
  name: "HomeSwiper",
  data(){
    return {
      imgIsLoad: false
    }
  },
  props: {
    banners: {
      type: Array,
      default(){
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imgLoad(){
      if (!this.imgIsLoad){
        this.$emit('swiperImgLoad')
        this.imgIsLoad = true
      }

    }
  }
}
</script>

<style scoped>

</style>