<template>
  <div class="ad_container">
    <head-top :head-title="headTitle" go-back='false'></head-top>
    <ul class="ad_list">
      <li>
        <section class="ad_item">
          <div class="ad_l" @click="">
            <p>万达A区写字楼梁溪路35号19楼恒创资产</p>
            <p>王晖 13616197695</p>
          </div>
          <a class="ad_r" @click="addDetail">
            <i class="atIcon atIcon-edit"></i>
          </a>
        </section>
      </li>
      <li>
        <section class="ad_item">
          <div class="ad_l">
            <p>复地公园城27号401室</p>
            <p>王晖 13616197695</p>
          </div>
          <a class="ad_r" @click="addDetail">
            <i class="atIcon atIcon-edit"></i>
          </a>
        </section>
      </li>
      <li>
        <section class="ad_item">
          <div class="ad_l">
            <p>万达A区写字楼梁溪路35号</p>
            <p>王晖 13616197695</p>
          </div>
          <a class="ad_r" @click="addDetail">
            <i class="atIcon atIcon-edit"></i>
          </a>
        </section>
      </li>
    </ul>
    <button class="add_btn" @click="addDetail">
      <i class="atIcon atIcon-add-o"></i>
      <span>新增地址</span>
    </button>
  </div>
</template>

<script>
  import headTop from '../../components/header/head'
  import {currentcity, searchplace} from '../../service/getData'
  import {getStore, setStore, removeStore} from '../../config/mUtils'

  export default {
    data(){
      return{
        headTitle:'上门地址'
      }
    },

    mounted(){

    },
    watch:{

    }
    ,
    components:{
      headTop
    },

    computed:{

    },

    methods:{
      addDetail(){
          this.$router.push({path:'/addAddress'});
      }
    }
  }

</script>

<style lang="less" scoped>
  .ad_container{
    padding-top: 2.35rem;
  }
  ul.ad_list{
    li{
      background-color: #fff;
      padding: .5rem 0;
      border-bottom: 1px solid #e1e1e1;
      .ad_item{
        display: -webkit-flex;
        display: flex;
        margin: 0 .5rem;
        .ad_l{
          flex:9;
          p:nth-child(1){
            font-size: .7rem;
            font-weight: 400;
            color: #232323;
          }
          p:nth-child(2){
            font-size: .6rem;
            color: #969696;
            margin-top: .2rem;
          }
        }
        .ad_r{
          display: -webkit-flex;
          display: flex;
          flex:1;
          justify-content: center;
          align-items: center;
          i{
            font-size: 1rem;
            color: #696969;
          }
        }
      }
    }
  }
  .add_btn{
    position: fixed;
    bottom: 0;
    background-color: #fff;
    width: 100%;
    height: 2.5rem;
    border-top: 1px solid #e6e6e6;
    color: #3190e8;
    span{
      font-size: .8rem;
    }
    i{
      font-size: .8rem;
    }
  }
</style>
