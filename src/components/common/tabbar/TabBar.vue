<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar"
}
</script>

<style scoped>
  #tab-bar{
    display: flex;
    background-color: #f6f6f6;
    /*固定定位,同时使用right与left确保宽度为窗口宽度*/
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    /*阴影, 0.2为颜色的透明度*/
    box-shadow: 0 -1px 1px rgba(100,100,100,0.2);
  }
</style>
