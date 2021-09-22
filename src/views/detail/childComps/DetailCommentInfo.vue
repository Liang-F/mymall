<template>
  <div class="comment-info">
    <div class="comment-title">
      <span>用户评价</span>
      <span>更多</span>
    </div>
    <div class="user-info" v-if="commentInfo.user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="comment-detail">
      <span class="detail">{{commentInfo.content}}</span>
      <div>
        <span class="date">{{time}}</span>
        <span class="type">{{commentInfo.style}}</span>
      </div>
      <div class="img" >
        <img :src="item" alt="" v-for="item in commentInfo.images">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default: {}
    }
  },
  computed: {
    time(){
      var addtime = new Date(parseInt(this.commentInfo.created) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
      return addtime
    }
  },
  mounted() {
    if(this.commentInfo.images) {
      this.imagesLength = this.commentInfo.images.length
    }
  },
}
</script>

<style scoped>
.comment-info{
  padding: 10px 15px;
  border-bottom: 5px solid #f2f5f8;
  margin-bottom: 20px;
}
.comment-title{
  display: flex;
  line-height: 30px;
  justify-content: space-between;
}
.user-info{
  display: flex;
  line-height: 50px;
}
.user-info img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 20px
}
.user-info span{
  color: #222222;
}
.comment-detail{
  padding-top: 20px;
  line-height: 20px;
  font-size: 14px;
}
.comment-detail .date{
  font-size: 10px;
}
.comment-detail .type{
  font-size: 12px;
  color: #eb4868;
}
.comment-detail .img img{
  width: 40px;
  height: 40px;
}
</style>