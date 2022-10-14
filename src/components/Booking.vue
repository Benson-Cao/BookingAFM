<template>
  <el-form ref="bookFormRef" class="book-form" :model="form" :rules="rules" label-width="120px" label-position="top">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="导师" prop="instructor">
      <el-input v-model="form.instructor" />
    </el-form-item>
    <el-form-item label="联系方式">
      <el-input v-model="form.link" />
    </el-form-item>
    <el-form-item label="预约时间" prop="date">
      <el-date-picker v-model="form.date" type="date" placeholder="Pick a date" style="width: 100%" />
    </el-form-item>
    <el-form-item label="样品个数">
      <el-input v-model="form.count" />
    </el-form-item>

    <el-form-item label="样品描述" prop="description">
      <el-input v-model="form.description" />
    </el-form-item>
    <el-form-item label="测试要求">
      <el-input v-model="form.demand" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit(bookFormRef)">提交</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
  
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import request from '../utils/request';
// do not use same name with ref
const form = reactive({
  userId: '',
  name: '',
  instructor: '',
  link: '',
  date: '',
  count: '',
  description: '',
  demand: '',
})

const bookFormRef = ref()
const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      // console.log('submit!')
      const id = localStorage.getItem('user-info')
      if (id) {
        form.userId = id
      }

      request({
        method: 'POST',
        url: '/book',
        data: form
      }).then(res => {
        const { status } = res
        if (status == 200) {
          ElMessage.success('预约成功！')
        }
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}



const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  instructor: [
    { required: true, message: '请输入课题组名', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  date: [
    {
      type: 'date',
      required: true,
      message: '请输入预约时间',
      trigger: 'change',
    },
  ],

  description: [
    { required: true, message: '请输入样品名称', trigger: 'blur' },
  ]
})

</script>

<style scoped>
.book-form {
  width: 60%;
  margin-left: 20%;
}
</style>
  