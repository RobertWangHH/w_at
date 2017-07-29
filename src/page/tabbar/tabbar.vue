<template>
  <div class="ad_container">
    <head-top :head-title="headTitle" go-back='false' v-if="!showLoading"></head-top>
    <div v-if="!showLoading">
      <mt-field label="联系人" placeholder="请输入用户名" v-model="username"></mt-field>
      <mt-field label="电话" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
      <mt-cell title="地址" is-link></mt-cell>
      <mt-field label="门牌号" placeholder="例：5号楼203室" type="textarea" rows="1" v-model="introduction"></mt-field>
      <mt-button type="primary" size="large" class="sub_btn">保存</mt-button>
    </div>
    <loading v-if="showLoading"></loading>
    <section class="animation_opactiy shop_back_svg_container" v-if="showLoading">
      <img src="../../images/shop_back_svg.svg">
    </section>
    <foot-bar></foot-bar>
  </div>
</template>

<script>
  import headTop from '../../components/header/head'
  import {currentcity, searchplace} from '../../service/getData'
  import {getStore, setStore, removeStore} from '../../config/mUtils'
  import loading from '../../components/common/loading'
  import footBar from '../../components/footer/footBar'

  export default {
    data(){
      return{
        headTitle:'新增地址',
        showLoading: true,
        username:'',
        phone:'',
        introduction:''
      }
    },

    mounted(){
      setInterval(() => {
        this.showLoading = false;
      }, 1500)
    },
    watch:{

    }
    ,
    components:{
      headTop,loading,footBar
    },

    computed:{

    },

    methods:{
    }
  }

</script>

<style lang="less" scoped>
  .ad_container{
    padding-top: 2.35rem;
  }
  .sub_btn{
    width: 90%;
    margin: 1rem auto;
  }
  .shop_back_svg_container{
    position: fixed;
    width: 100%;
    height: 100%;
    top:0;
    img{
      width: 100%;
    }
  }
</style>
