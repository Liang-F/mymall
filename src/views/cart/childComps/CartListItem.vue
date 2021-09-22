<template>
  <div class="shop-item">
    <div class="item-selector">
      <CheckButton :is-checked="itemInfo.checked" @click.native="checkClick"></CheckButton>
    </div>
    <div class="item-img">
      <img :src="itemInfo.image" alt="">
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">{{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">￥{{itemInfo.price}}</div>
        <div class="item-count right">x{{itemInfo.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";

export default {
  name: "CartListItem",
  props: {
    itemInfo: {
      type: Object,
      default: {}
    }
  },
  components: {
    CheckButton
  },
  methods: {
    checkClick(){
      this.itemInfo.checked = !this.itemInfo.checked
    }
  }
}
</script>

<style scoped>
.shop-item{
  display: flex;
  padding: 15px;
  border-bottom: 1px solid #BEBEBE;
}
.item-selector{
  line-height: 120px;
  /*width: 100px;*/
  margin-right: 10px;
  /*text-align: center;*/
}
.item-img img{
  width: 100px;
  height: 120px;
}
.item-info{
  line-height: 20px;
  padding: 10px 0 0 10px;
}
.item-info .item-title, .item-info .item-desc{
  width: calc(100vw - 166px);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  /*line-height: 20px;*/
}
.item-desc{
  font-size: 13px;
  margin: 10px 0 20px;
}
.item-price{
  color: red;
}
.item-count{
  margin-right: 20px;
}
</style>