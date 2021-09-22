<template>
  <div>
    <span class="iconfont icon-xuanze no" :class="{active : isChecked}"></span>
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      // isChecked: false
    }
  },
  methods: {
    change(){
      // this.isChecked = !this.isChecked
    }
  }
}
</script>

<style scoped>

.no{
  /*background-color: red;*/
  color: white;
  border: 1px solid #ADADAD;
  border-radius: 50%;
}
.active{
  color: #eb4868;
  background-color: white;
  border: 1px solid #eb4868;



}
</style>