<template>
  <div class="body-container">
    <div class="dashboard-text">管理员：<span style="color:#409EFF;font-family:YouYuan;font-weight:700;">{{name}}</span>您好！</div>
    <div class="dashboard-container">
      <div class="item" v-for="(i,index) in items" :key="index">
        <div class="item-icon-container"><span class="iconfont item-icon" :class="i.icon" :style="i.style"></span></div>
        <div class="item-text-container">
          <div class="item-text">{{i.name}}</div>
          <div class="item-text">{{i.sum}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { count } from '@/api/dashboard'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data(){
    return{
      items:[
      {icon :"icon-usergroup1",name: "用户数量", sum: 0,style:"color: #67c8c7"},
      {icon :"icon-xiaoxi",name: "商品数量", sum: 0,style:"color: #53a5f1"},
      {icon :"icon-xiaoxi",name: "分类数量", sum: 0,style:"color: #ea5873"},
      {icon :"icon-qian",name: "订单数量", sum: 0,style:"color: #5cb99f"},
    ],
    }
  },
  created(){
    count().then((res) => {
      if(res.code == 200){
        this.items[0].sum = res.data.user;
        this.items[1].sum = res.data.goods; 
        this.items[2].sum = res.data.category;
        this.items[3].sum = res.data.orders;
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  @import url('../../assets/iconfont/iconfont.css');
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.body-container{
  padding: 50px;
}
.dashboard-container{
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 100px;
}
.item{
  background-color:white;
  box-shadow: 0px 15px 30px rgba(0,0,0,.1);
  width: 350px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: center;
}
.item-icon-container{
  width: 110px;
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.item-icon{
  font-size: 65px;
  font-weight: bolder;
}
.item-text-container{
  width: 110px;
  height: 110px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.item-text{
  font-size: 16px;
  color: gray;
  font-family: '微软雅黑';
  font-weight: bolder;
}
</style>
