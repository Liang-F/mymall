import {debounce} from "@/common/utils";

export const itemImgLoadMiXin = {
  data(){
    return {
      itemImgListener: null,
    }
  },
  mounted(){
    let refresh = debounce(this.$refs.scroll.refresh, 500)

    this.itemImgListener = () => {
      refresh()
      // console.log('mixin的刷新')
    }

    this.$bus.$on('itemImgLoad', this.itemImgListener)
  }
}