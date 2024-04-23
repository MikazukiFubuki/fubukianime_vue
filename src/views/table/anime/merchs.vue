<template>
  <section class="app-container">
    <el-input v-model="pagination.animeName" placeholder="动画名" style="width: 200px;" class="filter-item" />
    <el-input v-model="pagination.merch" placeholder="周边名" style="width: 200px;" class="filter-item" />
    <el-select v-model="pagination.status" placeholder="状态" size="small">
      <el-option
        v-for="item in statusSelect"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-button class="dalfBut" @click="getAll()">查询</el-button>
    <el-button type="primary" class="butT" @click="handleCreate()">新建</el-button>

    <el-table size="big" current-row-key="id" :data="dataList" highlight-current-row>

      <el-table-column type="index" align="center" label="序号" />

      <el-table-column prop="animeName" label="动画名" align="center" />

      <el-table-column prop="merch" label="周边名" align="center">
        <template scope="scope">
          <span v-if="scope.row.status === '1' " style="color:#33cc33">{{ scope.row.merch }}</span>
          <span v-else-if="scope.row.status === '2' " style="color: #ff8000">{{ scope.row.merch }}</span>
          <span v-else-if="scope.row.status === '3' " style="color:red">{{ scope.row.merch }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">

        <template slot-scope="scope">

          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>

          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>

        </template>

      </el-table-column>

    </el-table>

    <!--分页组件-->

    <el-pagination
      class="pagiantion"

      :current-page="pagination.currentPage"

      :page-size="pagination.pageSize"

      layout="total, prev, pager, next, jumper"

      :total="pagination.total"

      @current-change="handleCurrentChange"
    />

    <el-dialog title="新增周边" :visible.sync="dialogFormVisible">

      <el-form ref="dataAddForm" :model="formData" :rules="rules" label-position="right" label-width="100px">

        <el-row>

          <el-col :span="18">

            <el-form-item label="动画名" prop="animeName">

              <el-input v-model="formData.animeName" />

            </el-form-item>

          </el-col>

        </el-row>

        <el-row>

          <el-col :span="18">

            <el-form-item label="周边名" prop="merch">

              <el-input v-model="formData.merch" />

            </el-form-item>

          </el-col>

        </el-row>

        <el-row>

          <el-col :span="6">
            <el-form-item label="周边状态">
              <el-select v-model="formData.status" placeholder="请选择状态">
                <el-option
                  v-for="item in statusSelect"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>

      </el-form>

      <div slot="footer" class="dialog-footer">

        <el-button @click="cancel()">取消</el-button>

        <el-button type="primary" @click="handleAdd()">确定</el-button>

      </div>

    </el-dialog>

    <el-dialog title="编辑检查项" :visible.sync="dialogFormVisible4Edit">

      <el-form ref="dataEditForm" :model="formData" :rules="rules" label-position="right" label-width="100px">

        <el-row>

          <el-col :span="18">

            <el-form-item label="动画名" prop="animeName">

              <el-input v-model="formData.animeName" />

            </el-form-item>

          </el-col>

        </el-row>

        <el-row>

          <el-col :span="18">

            <el-form-item label="周边名" prop="merch">

              <el-input v-model="formData.merch" />

            </el-form-item>

          </el-col>

        </el-row>

        <el-row>

          <el-col :span="6">
            <el-form-item label="周边状态">
              <el-select v-model="formData.status" placeholder="请选择状态">
                <el-option
                  v-for="item in statusSelect"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
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
  add,
  selectById,
  edit,
  remove
} from '@/api/anime/merchs.js'

export default {
  data() {
    return {
      dataList: [], // 当前页要展示的列表数据
      dialogFormVisible: false, // 添加表单是否可见
      dialogFormVisible4Edit: false, // 编辑表单是否可见
      formData: {}, // 表单数据
      rules: {// 校验规则
        animeName: [{ required: true, message: '动画名为必填项', trigger: 'blur' }],
        merch: [{ required: true, message: '周边名为必填项', trigger: 'blur' }],
        status: [{ required: true, message: '状态为必填项', trigger: 'blur' }]
      },
      pagination: {// 分页相关模型数据
        currentPage: 1, // 当前页码
        pageSize: 100, // 每页显示的记录数
        total: 0, // 总记录数
        animeName: '',
        merch: '',
        status: ''
      },
      statusSelect: [{
        value: '1',
        label: '现存、在用'
      }, {
        value: '2',
        label: '部分在、未使用'
      }, {
        value: '3',
        label: '已用过、不用、扔掉、卖掉'
      }]
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
      const pageSize = this.pagination.pageSize
      const currentPage = this.pagination.currentPage
      // 发送异步请求
      const param = {
        animeName: this.pagination.animeName,
        merch: this.pagination.merch,
        status: this.pagination.status
      }
      getListPage(param, pageSize, currentPage).then(res => {
        this.pagination.total = res.data.total
        this.dataList = res.data.records
      })
    },

    // 切换页码
    handleCurrentChange(currentPage) {
      // 修改页码值为当前选中的页码值
      this.pagination.currentPage = currentPage
      // 执行查询
      this.getAll()
    },

    // 弹出添加窗口
    handleCreate() {
      this.dialogFormVisible = true
      this.resetForm()
    },

    // 重置表单
    resetForm() {
      this.formData = {}
    },

    // 添加
    handleAdd() {
      this.$confirm('是否增加周边？', '提示', { type: 'info' }).then(() => {
        add(this.formData).then((res) => {
          // 判断当前操作是否成功
          if (res.flag) {
            // 1.关闭弹层
            this.dialogFormVisible = false
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
      this.dialogFormVisible = false
      this.dialogFormVisible4Edit = false
      this.$message.info('当前操作取消')
    },
    // 弹出编辑窗口
    handleUpdate(row) {
      const id = row.id
      const param = {}
      selectById(param, id).then((res) => {
        if (res.flag && res.data != null) {
          this.dialogFormVisible4Edit = true
          this.formData = res.data
        } else {
          this.$message.error('数据同步失败，自动刷新')
        }
      }).finally(() => {
        // 2.重新加载数据
        this.getAll()
      })
    },

    // 修改
    handleEdit() {
      edit(this.formData).then((res) => {
        // 判断当前操作是否成功
        if (res.flag) {
          // 1.关闭弹层
          this.dialogFormVisible4Edit = false
          this.$message.success('修改成功')
        } else {
          this.$message.error('修改失败')
        }
      }).finally(() => {
        // 2.重新加载数据
        this.getAll()
      })
    },
    // 删除
    handleDelete(row) {
      this.$confirm('此操作永久删除当前信息，是否继续？', '提示', { type: 'info' }).then(() => {
        const id = row.id
        const param = {}
        remove(param, id).then((res) => {
          if (res.flag) {
            this.$message.success('删除成功')
          } else {
            this.$message.error('数据同步失败，自动刷新')
          }
        }).finally(() => {
          // 2.重新加载数据
          this.getAll()
        })
      }).catch(() => {
        this.$message.info('取消操作')
      })
    }
  }
}
</script>

<style scoped>

.el-table .warning-row {
  background-color: #cf9236;
}

.el-table .success-row {
  background-color: #a4da89;
}
</style>
