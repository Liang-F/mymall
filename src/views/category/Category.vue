<template>
  <div>
    <span>fenlei</span>
    <CheckButton></CheckButton>
  </div>

</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
export default {
  name: "Category",
  data() {
    return {
      // scroll : null
    }

  },
  components: {
    CheckButton,
  },
  created() {
  },
  mounted() {
    // this.scroll =  new BScroll('.wrapper', {
    //
    // })
  }
}
</script>

<style scoped>
.wrapper{
  height:250px;
  background-color: cadetblue;
}
</style>
