<template>
    <div class="search">
        <el-input v-model="searchValue" class="w-50 m-2" placeholder="Please Input" />
        <el-button type="primary" @click="search">搜索</el-button>
    </div>
    <el-table :data="bookFilter" border style="width: 100%">
        <el-table-column prop="name" label="姓名" width="100" />
        <el-table-column prop="instructor" label="导师" width="100" />
        <el-table-column prop="date" label="预约时间" />
        <el-table-column prop="link" label="联系方式" />
        <el-table-column prop="count" label="样品数量" />
        <el-table-column prop="demand" label="测试要求" />
        <el-table-column prop="description" label="测试描述" />
        <el-table-column label="Operations">
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-popconfirm confirm-button-text="Yes" cancel-button-text="No" icon-color="#626AEF"
                    title="Are you sure to delete this?" @confirm="confirmEvent(scope.$index, scope.row)"
                    @cancel="cancelEvent">
                    <template #reference>
                        <el-button size="small" type="danger">删除</el-button>
                    </template>
                </el-popconfirm>

            </template>
        </el-table-column>
    </el-table>
    <!-- 编辑信息框 -->
    <el-dialog v-model="dialogVisible" title="编辑信息" width="50%">
        <el-form>
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
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="updateBook">确认修改</el-button>
            </span>
        </template>
    </el-dialog>

</template>
  
<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { computed, onMounted, reactive, ref } from 'vue';
import request from '../../utils/request';

interface Book {
    name: '',
    instructor: '',
    date: '',
    link: '',
    demand: '',
    description: '',
}
let bookData = reactive<Book[]>([])
let bookFilter = reactive<Book[]>([])
onMounted(() => {
    load();
})

const load = () => {
    const userId = window.localStorage.getItem('user-info')
    request.get(`/getBook/${userId}`).then(res => {
        // console.log(res.data)
        bookData.length = 0
        res.data.forEach((item: any) => {
            bookData.push(item)
        });
        bookFilter.length = 0
        bookData.forEach(item => {
            bookFilter.push(item)
        })
    })
}
const form = reactive({
    id: Number,
    name: '',
    instructor: '',
    link: '',
    date: '',
    count: '',
    description: '',
    demand: '',
})
const dialogVisible = ref(false)

const handleEdit = (index: number, row: any) => {
    dialogVisible.value = true
    // console.log(index, row)
    form.id = row.id
    form.name = row.name
    form.instructor = row.instructor
    form.link = row.link
    form.date = row.date
    form.count = row.count
    form.description = row.description
    form.demand = row.demand

}


const updateBook = () => {
    dialogVisible.value = false
    request.post('/updatebook', form).then(res => {
        // console.log(res)
        if (res.data.status == 200) {
            ElMessage.success(res.data.msg)
            load()
        }
    })

}
// 提交表单修改
const confirmEvent = (index: number, row: any) => {
    // console.log(index, row.id)
    request.delete(`/book/${row.id}`).then(res => {
        // console.log(res)
        if (res.data.status == 200) {
            ElMessage.success(res.data.msg)
            load()

        }
    })
}
const cancelEvent = () => {
    console.log('cancel!')
}

// 搜索
const searchValue = ref('')
const search = () => {

    const a = computed(() => {
        return bookData.filter(item => item.name.includes(searchValue.value))
    }).value

    bookFilter.length = 0
    a.forEach(item => {
        return bookFilter.push(item)
    })
    searchValue.value = ''

}

</script>
  
<style scoped>
.search{
    display: flex;
    flex-direction: row;
}
</style>