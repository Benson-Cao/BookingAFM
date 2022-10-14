<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false" router>
        <el-menu-item index="/book">
            <img class="logo"
                src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F9680744090%2F1000&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1667632404&t=7b591e213942b31cf6b5c98dceed9c1b" />
        </el-menu-item>
        <div class="flex-grow" />
        <el-menu-item index="/book">首页</el-menu-item>
        <el-sub-menu index="2">
            <template #title>个人中心</template>
            <el-menu-item index="/order">我的订单</el-menu-item>
            <el-menu-item index="/userInfo">个人信息</el-menu-item>
            <el-menu-item index="2-3" @click="loginout">退出登录</el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'

const activeIndex = ref('/book')
const loginout=()=>{
    window.location.href='/login'
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('user-info')
}
</script>
  
<style>
.flex-grow {
    flex-grow: 1;
}

.logo {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
</style>
  