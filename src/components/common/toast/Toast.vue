<template>
  <div class="toast" v-show="isShow">
    <div  class="message">{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    // message: {
    //   type: String,
    //   default: ''
    // },
    // show: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data() {
    return {
      message: '',
      isShow: false

    }
  },
  methods: {
    show(message='默认信息', duration='1000'){
      this.isShow = true;
      this.message = message
      setTimeout(() => {
        this.isShow = false
        this.message = ''
      }, duration)
    }
  }
}
</script>

<style scoped>
.toast{
  position: fixed;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 100px;
  margin-left: -100px;
  margin-top: -50px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 20px;
  font-weight: 800;
  z-index: 999;
}
/*.message{*/
/*  border: 1px red solid;*/
/*}*/
</style>