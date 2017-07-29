/**
 * Created by Administrator on 2017/7/22 0022.
 */
import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home');
const addressList = r => require.ensure([], () => r(require('../page/address/addressList')), 'addressList');
const addAddress = r => require.ensure([], () => r(require('../page/address/addNewAddress')), 'addAddress');
const tabBar = r => require.ensure([], () => r(require('../page/tabbar/tabbar')), 'tabBar');
export default [{
  path: '/',
  component: App, //顶层路由，对应index.html
  children: [ //二级路由。对应App.vue
    //地址为空时跳转home页面
    {
      path: '',
      redirect: '/addressList'
    },
    {
      path: '/home',
      component: home
    },
    {
      path: '/addressList',
      component: addressList
    },
    {
      path:'/addAddress',
      component:addAddress
    },
    {
      path:'/tabBar',
      component:tabBar
    }
  ]
}]
