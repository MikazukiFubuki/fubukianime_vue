<template>
  <section class="app-container">
    <el-input v-model="pagination.largeVersion" placeholder="大版本" style="width: 200px;" class="filter-item" />
    <el-input v-model="pagination.minorVersion" placeholder="小版本" style="width: 200px;" class="filter-item" />
    <el-input v-model="pagination.content" placeholder="内容" style="width: 200px;" class="filter-item" />
    <el-input v-model="pagination.newContent" placeholder="新增内容" style="width: 200px;" class="filter-item" />
    <el-input v-model="pagination.obsoleteContent" placeholder="删除内容" style="width: 200px;" class="filter-item" />
    <el-input v-model="pagination.onlineTime" placeholder="更新时间" style="width: 200px;" class="filter-item" />
    <el-button type="primary" class="dalfBut" @click="getAll()">查询</el-button>
    <el-button type="success" class="butT" @click="handleCreateLarge()">新增大版本</el-button>
    <el-button type="warning" class="butT" @click="handleCreateMinor()">新增小版本</el-button>

    <el-table size="big" current-row-key="id" :data="dataList" stripe highlight-current-row>
      <el-table-column type="index" align="center" label="序号" />
      <el-table-column prop="version" label="版本" align="center" />
      <el-table-column prop="content" label="内容" align="center" />
      <el-table-column prop="newContent" label="新增内容" align="center" />
      <el-table-column prop="obsoleteContent" label="删除内容" align="center" />
      <el-table-column prop="onlineTime" label="更新时间" align="center" />
    </el-table>

    <el-dialog title="新增大版本" :visible.sync="dialogFormVisibleLarge">

      <el-form ref="dataAddForm" :model="formData" :rules="rules" label-position="right" label-width="100px">

        <el-row>

          <el-col :span="18">

            <el-form-item label="版本介绍" prop="create">

              <el-input v-model="formData.content" type="textarea" />

            </el-form-item>

          </el-col>

        </el-row>

        <el-row>

          <el-col :span="18">

            <el-form-item label="新增内容" prop="create">

              <el-input v-model="formData.newContent" type="textarea" />

            </el-form-item>

          </el-col>

        </el-row>

        <el-row>

          <el-col :span="18">

            <el-form-item label="删除内容" prop="create">

              <el-input v-model="formData.obsoleteContent" type="textarea" />

            </el-form-item>

          </el-col>

        </el-row>

      </el-form>

      <div slot="footer" class="dialog-footer">

        <el-button @click="cancel()">取消</el-button>

        <el-button type="primary" @click="handleAddLarge()">确定</el-button>

      </div>

    </el-dialog>

    <el-dialog title="新增小版本" :visible.sync="dialogFormVisibleMinor">

      <el-form ref="dataAddForm" :model="formData" :rules="rules" label-position="right" label-width="100px">

        <el-row>

          <el-col :span="18">

            <el-form-item label="版本介绍" prop="create">

              <el-input v-model="formData.content" type="textarea" />

            </el-form-item>

          </el-col>

        </el-row>

        <el-row>

          <el-col :span="18">

            <el-form-item label="新增内容" prop="create">

              <el-input v-model="formData.newContent" type="textarea" />

            </el-form-item>

          </el-col>

        </el-row>

        <el-row>

          <el-col :span="18">

            <el-form-item label="删除内容" prop="create">

              <el-input v-model="formData.obsoleteContent" type="textarea" />

            </el-form-item>

          </el-col>

        </el-row>

      </el-form>

      <div slot="footer" class="dialog-footer">

        <el-button @click="cancel()">取消</el-button>

        <el-button type="primary" @click="handleAddMinor()">确定</el-button>

      </div>

    </el-dialog>
  </section>
</template>

<script>

import {
  getListPage,
  addLarge, addMinor
} from '@/api/AniSong/mEditions.js'

export default {
  data() {
    return {
      dataList: [], // 当前页要展示的列表数据
      dialogFormVisibleLarge: false, // 添加大版本表单是否可见
      dialogFormVisibleMinor: false, // 添加小版本表单是否可见
      dialogFormVisible4Edit: false, // 编辑表单是否可见
      formData: {}, // 表单数据
      rules: {// 校验规则
        content: [{ required: true, message: '版本内容为必填项', trigger: 'blur' }]
      },
      pagination: {// 分页相关模型数据
        largeVersion: '',
        minorVersion: '',
        content: '',
        newContent: '',
        obsoleteContent: '',
        onlineTime: '',
        version: ''
      }
    }
  },
  // 钩子函数，VUE对象初始化完成后自动执行
  created() {
    // 调用查询全部数据的操作
    this.getAll()
  },
  methods: {
    // 分页查询
    getAll() {
      // 发送异步请求
      const param = {
        largeVersion: this.pagination.largeVersion,
        minorVersion: this.pagination.minorVersion,
        content: this.pagination.content,
        newContent: this.pagination.newContent,
        obsoleteContent: this.pagination.obsoleteContent,
        onlineTime: this.pagination.onlineTime
      }
      getListPage(param).then(res => {
        this.dataList = res.data
      })
    },

    // 切换页码
    handleCurrentChange(currentPage) {
      // 修改页码值为当前选中的页码值
      this.pagination.currentPage = currentPage
      // 执行查询
      this.getAll()
    },

    // 弹出添加大版本窗口
    handleCreateLarge() {
      this.dialogFormVisibleLarge = true
      this.resetForm()
    },

    // 弹出添加小版本窗口
    handleCreateMinor() {
      this.dialogFormVisibleMinor = true
      this.resetForm()
    },

    // 重置表单
    resetForm() {
      this.formData = {}
    },

    // 添加大版本
    handleAddLarge() {
      this.$confirm('是否增加大版本？', '提示', { type: 'info' }).then(() => {
        addLarge(this.formData).then((res) => {
          // 判断当前操作是否成功
          if (res.flag) {
            // 1.关闭弹层
            this.dialogFormVisibleLarge = false
            this.$message.success(res.msg)
          } else {
            this.$message.error(res.msg)
          }
        }).finally(() => {
          // 2.重新加载数据
          this.getAll()
        })
      }).catch(() => {
        this.$message.info('取消操作')
      })
    },
    // 添加小版本
    handleAddMinor() {
      this.$confirm('是否增加小版本？', '提示', { type: 'info' }).then(() => {
        addMinor(this.formData).then((res) => {
          // 判断当前操作是否成功
          if (res.flag) {
            // 1.关闭弹层
            this.dialogFormVisibleMinor = false
            this.$message.success(res.msg)
          } else {
            this.$message.error(res.msg)
          }
        }).finally(() => {
          // 2.重新加载数据
          this.getAll()
        })
      }).catch(() => {
        this.$message.info('取消操作')
      })
    },

    // 取消
    cancel() {
      this.dialogFormVisibleLarge = false
      this.dialogFormVisibleMinor = false
      this.dialogFormVisible4Edit = false
      this.$message.info('当前操作取消')
    }
  }
}
</script>

<style scoped>

</style>
