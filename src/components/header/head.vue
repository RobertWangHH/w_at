<template>
    <header id='head_top'>
        <slot name='logo'></slot>
        <slot name='search'></slot>
        <section class="head_goback" v-if="goBack" @click="$router.go(-1)">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
            </svg>
        </section>
        <router-link :to="userInfo? '/profile':'/login'" v-if='signinUp' class="head_login">
            <svg class="user_avatar" v-if="userInfo">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
            </svg>
            <span class="login_span" v-else>登录|注册</span>
        </router-link>
        <section class="title_head ellipsis" v-if="headTitle">
            <span class="title_text">{{headTitle}}</span>
        </section>
        <slot name="edit"></slot>
        <slot name="msite-title"></slot>
        <slot name="changecity"></slot>
        <slot name="changeLogin"></slot>
    </header>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    export default {
    	data(){
            return{

            }
        },
        mounted(){
            //获取用户信息
            this.getUserInfo();

        },
        props: ['signinUp', 'headTitle', 'goBack'],
        computed: {
            ...mapState([
                'userInfo'
            ]),
        },
        methods: {
            ...mapActions([
                'getUserInfo'
            ]),
        },

    }

</script>

<style lang="less" scoped>

    #head_top{
        background-color: #3190e8;
        position: fixed;
        z-index: 100;
        left: 0;
        top: 0;
        width: 100%;
        height: 1.95rem;
    }
    .head_goback{
        left: 0.4rem;
        width: 0.6rem;
        height: 1rem;
        line-height: 2.5rem;
        margin-left: .4rem;
    }
    .head_login{
        right: 0.55rem;
        font-size: 0.65rem;
        color: #fff;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        .login_span{
            color: #fff;
        }
        .user_avatar{
            fill: #fff;
            width: .8rem;
            height: .8rem;
        }
    }
    .title_head{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50%;
        color: #fff;
        text-align: center;
        .title_text{
            font-size: 0.8rem;
            color: #fff;
            text-align: center;
            font-weight: bold;
        }
    }
</style>
