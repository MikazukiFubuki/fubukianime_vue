<template>
  <section class="app-container">
    <!--搜索栏-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="pagination" @submit.native.prevent>
        <el-form-item>
          <el-input v-model="pagination.rebornType" placeholder="Gal重生类型" style="width: 200px;" class="filter-item" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="dalfBut" @click="getAll()">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" class="butT" @click="handleCreate()">新建</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--表格-->
    <el-table size="big" current-row-key="id" :data="dataList" stripe highlight-current-row>
      <el-table-column type="index" align="center" label="序号" />
      <el-table-column prop="rebornType" label="Gal重生类型" align="center" />
      <el-table-column label="操作" width="250" align="center">
        <template slot-scope="scope">
          <el-button type="warning" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页插件-->
    <el-pagination
      class="pagiantion"
      :current-page="pagination.currentPage"
      :page-size="pagination.pageSize"
      layout="total, prev, pager, next, jumper"
      :total="pagination.total"
      @current-change="handleCurrentChange"
    />

    <!--新增表单-->
    <el-dialog title="新增Gal重生类型" :visible.sync="dialogFormVisible">
      <el-form ref="dataAddForm" :model="formData" :rules="rules" label-position="right" label-width="100px" >
        <el-row>
          <el-col :span="12">
            <el-form-item label="Gal重生类型" prop="rebornType">
              <el-input v-model="formData.rebornType" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取消</el-button>
        <el-button type="primary" @click="handleAdd()">确定</el-button>
      </div>
    </el-dialog>

    <!--编辑表单-->
    <el-dialog title="编辑Gal重生类型" :visible.sync="dialogFormVisible4Edit">
      <el-form ref="dataEditForm" :model="formData" :rules="rules" label-position="right" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="Gal重生类型" prop="rebornType">
              <el-input v-model="formData.rebornType" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取消</el-button>
        <el-button type="primary" @click="handleEdit()">确定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>

import {
  getListPage,
  remove,
  edit,
  add, getId
} from '@/api/GalGame/ggRebornTypes.js'

export default {
  data() {
    return {
      dataList: [], // 当前页要展示的列表数据
      dialogFormVisible: false, // 添加表单是否可见
      dialogFormVisible4Edit: false, // 编辑表单是否可见
      formData: {}, // 表单数据
      rules: {// 校验规则
        rebornType: [{ required: true, message: 'Gal重生类型为必填项', trigger: 'blur' }]
      },
      pagination: {// 分页相关模型数据
        currentPage: 1, // 当前页码
        pageSize: 20, // 每页显示的记录数
        total: 0, // 总记录数
        rebornType: ''
      }
    }
  },
  // 钩子函数，VUE对象初始化完成后自动执行
  created() {
    // 调用查询全部数据的操作
    this.getAll()
  },
  methods: {
    // 切换页码
    handleCurrentChange(currentPage) {
      // 修改页码值为当前选中的页码值
      this.pagination.currentPage = currentPage
      // 执行查询
      this.getAll()
    },
    // 取消
    cancel() {
      this.dialogFormVisible = false
      this.dialogFormVisible4Edit = false
      this.$message.info(' 当前操作取消')
    },
    // 获取用户列表
    getAll() {
      const pageSize = this.pagination.pageSize
      const currentPage = this.pagination.currentPage
      const para = {
        rebornType: this.pagination.rebornType
      }
      getListPage(para, pageSize, currentPage).then(res => {
        this.pagination.total = res.data.total
        this.dataList = res.data.records
      })
    },
    // 删除
    handleDelete(row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      })
        .then(() => {
          const para = {}
          const id = row.id
          remove(para, id).then(res => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getAll()
          })
        })
        .catch(res => {
          this.$message({
            message: '删除失败',
            type: 'warning'
          })
        })
    },
    // 显示编辑界面
    handleUpdate(row) {
      if (row.id !== undefined) { // 确保 id 不是 undefined
        this.dialogFormVisible4Edit = true
        const para = {}
        const id = row.id
        getId(para, id).then(res => {
          this.formData = res.data
        })
      } else {
        // 处理 id 为 undefined 的情况
        console.error('行对象的ID属性为undefined。')
      }
    },
    // 编辑
    handleEdit() {
      this.$confirm('确认修改吗？', '提示', {})
        .then(() => {
          edit(this.formData).then(res => {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.dialogFormVisible4Edit = false
            this.getAll()
          }).catch(res => {
            this.$message({
              message: '修改失败',
              type: 'warning'
            })
          })
        })
    },
    // 显示新增界面
    handleCreate() {
      this.dialogFormVisible = true
      this.formData = {}
    },
    // 新增
    handleAdd: function() {
      this.$confirm('确认新增吗？', '提示', {})
        .then(() => {
          add(this.formData).then(res => {
            this.$message({
              message: '新增成功',
              type: 'success'
            })
            this.dialogFormVisible = false
            this.getAll()
          }).catch(res => {
            this.$message({
              message: '新增失败',
              type: 'warning'
            })
          })
        })
    }
  }
}
</script>

<style scoped>

</style>
