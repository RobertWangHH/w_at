<template>
  <div class="city_container">
    <head-top :head-title="cityname" go-back='false'></head-top>
    <div class="city_form">
      <div>
        <p class="mint-button mint-button--default">无锡市惠山区
          <span>（目前只接受堰桥范围的配送）</span>
        </p>
        <input type="search" name="city" placeholder="详细地址，如A小区66号楼302室" class="city_input input_style" required v-model='inputVaule'>
      </div>
      <div>
        <button type="button" class="city_submit input_style" @click='postpois'>保存</button>
      </div>
    </div>
    <div class="waitMsg" v-if="isWait">{{waitMsg}}</div>
    <header v-if="historytitle" class="pois_search_history">搜索历史</header>
    <ul class="getpois_ul">
      <li v-for="(item, index) in placelist" @click='nextpage(index, item.geohash)' :key="index">
        <h4 class="pois_name ellipsis">{{item.name}}</h4>
        <p class="pois_address ellipsis">{{item.address}}</p>
      </li>
    </ul>
    <footer v-if="historytitle&&placelist.length" class="clear_all_history" @click="clearAll">清空所有</footer>
    <div class="search_none_place" v-if="placeNone">很抱歉！无搜索结果</div>
  </div>
</template>

<script>
  import headTop from '../../components/header/head'
  import {currentcity, searchplace} from '../../service/getData'
  import {getStore, setStore, removeStore} from '../../config/mUtils'

  export default {
    data(){
      return{
        inputVaule:'', // 搜索地址
        cityid:'35', // 当前城市id
        cityname:'奥特洗福莱', // 当前城市名字
        placelist:[], // 搜索城市列表
        placeHistory:[], // 历史搜索记录
        historytitle: true, // 默认显示搜索历史头部，点击搜索后隐藏
        placeNone: false, // 搜索无结果，显示提示信息
        waitMsg:'',
        isWait:false
      }
    },

    mounted(){
      /*this.cityid = this.$route.params.cityid;
      //获取当前城市名字
      currentcity(this.cityid).then(res => {
        this.cityname = res.name;
      })*/
      this.initData();
    },
    watch:{
      inputVaule: function (newVaule) {
          if(newVaule && newVaule.length > 0){
            this.waitMsg = '匹配中...';
            this.isWait = true;
            this.postpois()
          }
      }
    }
    ,
    components:{
      headTop
    },

    computed:{

    },

    methods:{
      initData(){
        //获取搜索历史记录
        if (getStore('placeHistory')) {
          this.placelist = JSON.parse(getStore('placeHistory'));
        }else{
          this.placelist = [];
        }
      },
      //发送搜索信息inputVaule
      postpois(){
        //输入值不为空时才发送信息
        if (this.inputVaule) {
          searchplace(this.cityid, '无锡市惠山区'+this.inputVaule).then(res => {
            this.historytitle = false;
            this.placelist = res;
            this.placeNone = res.length? false : true;
            this.isWait = false;
          })
        }
      },
      /**
       * 点击搜索结果进入下一页面时进行判断是否已经有一样的历史记录
       * 如果没有则新增，如果有则不做重复储存，判断完成后进入下一页
       */
      nextpage(index, geohash){
        let history = getStore('placeHistory');
        let choosePlace = this.placelist[index];
        if (history) {
          let checkrepeat = false;
          this.placeHistory = JSON.parse(history);
          this.placeHistory.forEach(item => {
            if (item.geohash == geohash) {
              checkrepeat = true;
            }
          })
          if (!checkrepeat) {
            this.placeHistory.push(choosePlace)
          }
        }else {
          this.placeHistory.push(choosePlace)
        }
        setStore('placeHistory',this.placeHistory)
        this.$router.push({path:'/msite', query:{geohash}})
      },
      clearAll(){
        removeStore('placeHistory');
        this.initData();
      }
    }
  }

</script>

<style lang="less" scoped>
  .city_container{
    padding-top: 2.35rem;
    .waitMsg{
      font-size: .6rem;
      text-align: center;
      color: #9b9b9b;
      padding: .65rem 0;
    }
  }
  .change_city{
    right: 0.4rem;
    font-size: 0.6rem;
    color: #fff;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .city_form{
    background-color: #fff;
    border-top: 1px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
    padding-top: 0.4rem;
    div{
      width: 90%;
      margin: 0 auto;
      text-align: center;
      .mint-button{
        font-size: .8rem;
        line-height: 1.8rem;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
        span{
          font-size: .5rem;
        }
      }
      .input_style{
        border-radius: 0.1rem;
        margin-bottom: 0.4rem;
        width: 100%;
        height: 1.8rem;
      }
      .city_input{
        border: 1px solid #e4e4e4;
        padding: 0 0.3rem;
        font-size: 0.65rem;
        color: #333;
      }
      .city_submit{
        background-color: #3190e8;
        font-size: 0.65rem;
        color: #fff;
      }
    }
  }
  .pois_search_history{
    border-top: 1px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
    padding-left: 0.5rem;
    font: 0.475rem/0.8rem 'Microsoft YaHei';
  }
  .getpois_ul{
    background-color: #fff;
    border-top: 1px solid #e4e4e4;
    li{
      margin: 0 auto;
      padding-top: 0.65rem;
      border-bottom: 1px solid #e4e4e4;
      .pois_name{
        margin: 0 auto 0.35rem;
        width: 90%;
        font-size: 0.65rem;
        color: #333;
      }
      .pois_address{
        width: 90%;
        margin: 0 auto 0.55rem;
        font-size: 0.45rem;
        color: #999;
      }
    }
  }
  .search_none_place{
    margin: 0 auto;
    font: 0.65rem/1.75rem 'Microsoft YaHei';
    color: #333;
    background-color: #fff;
    text-indent: 0.5rem;
  }
  .clear_all_history{
    font-size: 0.7rem;
    color: #666;
    text-align: center;
    line-height: 2rem;
    background-color: #fff;
  }
</style>
