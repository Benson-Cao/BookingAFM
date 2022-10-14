<template>
    <div class="login-body">
        <div class="login-container">
            <div class="head">
                <img class="logo" src="https://img0.baidu.com/it/u=3567922632,733679026&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=375" />
                <div class="name">
                    <div class="title">AFM预约</div>
                    <div class="tips">仪器管理系统</div>
                </div>
            </div>
            <el-form label-position="top" :rules="state.rules" :model="state.ruleForm" ref="loginForm"
                class="login-form">
                <el-form-item label="账号" prop="username">
                    <el-input type="text" v-model.trim="state.ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model.trim="state.ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <div style="color: #333">登录表示您已同意<a>《服务条款》</a></div>
                    <el-button style="width: 100%" type="primary" @click="submitForm">立即登录</el-button>
                    <el-checkbox v-model="state.checked" @change="!state.checked">下次自动登录</el-checkbox>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
// import md5 from 'js-md5'
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue'
import request from '../utils/request';
// import { localSet } from '@/utils'
const loginForm = ref()
const state = reactive({
    ruleForm: {
        username: '',
        password: ''
    },
    checked: true,
    rules: {
        username: [
            { required: 'true', message: '账户不能为空', trigger: 'blur' }
        ],
        password: [
            { required: 'true', message: '密码不能为空', trigger: 'blur' }
        ]
    }
})
const submitForm = async () => {
    loginForm.value.validate((valid: any) => {
        if (valid) {
            request.post('/login', {
                username: state.ruleForm.username || '',
                password: state.ruleForm.password
            }).then(res => {
                console.log(res.data.data[0])
                const {id} = res.data.data[0]
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user-info',id);

                if(res.data.status == 200) {
                    window.location.href = '/',
                    ElMessage.success('登录成功')
                }else if(res.data.status == 100){
                    ElMessage.warning(res.data.msg)
                }
                else{
                    ElMessage.error('密码错误')
                }
                
            })
        } else {
            console.log('error submit!!')
            return false;
        }
    })
}
const resetForm = () => {
    loginForm.value.resetFields();
}
</script>
  
<style scoped>
.login-body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #fff;
    margin-top: 10%;
}

.login-container {
    width: 420px;
    height: 500px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);
}

.head {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 40px 0 20px 0;
}

.head img {
    width: 100px;
    height: 100px;
    margin-right: 20px;
    border-radius: 50%;
}

.head .title {
    font-size: 28px;
    color: #1BAEAE;
    font-weight: bold;
}

.head .tips {
    font-size: 12px;
    color: #999;
    padding-left: 2em;
}

.login-form {
    width: 70%;
    margin: 0 auto;
}

.login-form>>>.el-form--label-top .el-form-item__label {
    padding: 0;
}

.login-form>>>.el-form-item {
    margin-bottom: 0;
}
</style>