<template>
  <section class="app-container">
    <!--搜索栏-->
    <el-select v-model="pagination.cvName" filterable placeholder="请选择声优">
      <el-option
        v-for="item in selcetForm.cvNameDataList"
        :key="item.name"
        :label="item.name"
        :value="item.name"
      />
    </el-select>
    <el-input v-model="pagination.animeId" placeholder="动画名" style="width: 200px;" class="filter-item" />
    <el-input v-model="pagination.animeRole" placeholder="角色名" style="width: 200px;" class="filter-item" />
    <el-button type="primary" class="dalfBut" @click="getAll()">查询</el-button>
    <el-button type="success" class="butT" @click="handleCreate()">新增作品</el-button>

    <!--表格-->
    <el-table size="big" current-row-key="id" :data="dataList" stripe highlight-current-row>

      <el-table-column type="index" align="center" label="序号" />

      <el-table-column prop="cvName" label="声优名称" align="center" width="320" />
      <el-table-column prop="animeId" label="动画名" align="center" width="500" />
      <el-table-column prop="animeRole" label="角色名" align="center" width="500" />
      <el-table-column prop="year" label="年份" align="center" width="160" />
      <el-table-column label="操作" align="center" width="500">

        <template slot-scope="scope">

          <el-button type="primary" @click="handleUpdateYear(scope.row)">修改年份</el-button>
          <el-button type="primary" @click="handleUpdateRole(scope.row)">修改角色</el-button>
          <el-button type="warning" @click="handleUpdate(scope.row)">编辑作品</el-button>
          <el-button type="danger" @click="handleReconfirm(scope.row)">删除作品</el-button>

        </template>

      </el-table-column>

    </el-table>

    <!-- 新增表单-->
    <el-dialog title="新增作品" :visible.sync="dialogFormVisible">

      <el-form ref="dataAddForm" :model="formData" :rules="rules" label-position="right" label-width="100px">

        <el-row>
          <el-form-item label="声优">
            <el-select v-model="formData.cvName" filterable placeholder="请选择声优">
              <el-option
                v-for="item in selcetForm.cvNameDataList"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="动画名">
            <el-select v-model="formData.animeId" filterable placeholder="请选择动画">
              <el-option
                v-for="item in selcetForm.animeNameDataList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-row>

        <el-row>

          <el-col :span="24">

            <el-form-item label="角色名" prop="animeRole">

              <el-input v-model="formData.animeRole" type="textarea" />

            </el-form-item>

          </el-col>

        </el-row>

        <el-row>

          <el-col :span="12">

            <el-form-item label="饰演开始年" prop="startYear">

              <el-input v-model="formData.startYear" />

            </el-form-item>

          </el-col>

          <el-col :span="12">

            <el-form-item label="饰演结束年" prop="endYear">

              <el-input v-model="formData.endYear" />

            </el-form-item>

          </el-col>

        </el-row>

      </el-form>

      <div slot="footer" class="dialog-footer">

        <el-button @click="cancel()">取消</el-button>

        <el-button type="primary" @click="handleAdd()">确定</el-button>

      </div>

    </el-dialog>
    <!-- 编辑作品表单-->
    <el-dialog title="编辑作品" :visible.sync="dialogFormVisible4Edit">

      <el-form ref="dataEditForm" :model="formData" :rules="rules" label-position="right" label-width="100px">

        <el-row>
          <el-form-item label="动画名">
            <el-select v-model="formData.animeId" filterable placeholder="请选择动画">
              <el-option
                v-for="item in selcetForm.animeNameDataList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-row>

        <el-row>

          <el-col :span="24">

            <el-form-item label="角色名" prop="animeRole">

              <el-input v-model="formData.animeRole" type="textarea" />

            </el-form-item>

          </el-col>

        </el-row>

        <el-row>

          <el-col :span="12">

            <el-form-item label="饰演开始年" prop="startYear">

              <el-input v-model="formData.startYear" />

            </el-form-item>

          </el-col>

          <el-col :span="12">

            <el-form-item label="饰演结束年" prop="endYear">

              <el-input v-model="formData.endYear" />

            </el-form-item>

          </el-col>

        </el-row>

      </el-form>

      <div slot="footer" class="dialog-footer">

        <el-button @click="cancel()">取消</el-button>

        <el-button type="primary" @click="handleEdit()">确定</el-button>

      </div>

    </el-dialog>
    <!-- 编辑年份弹层 -->
    <el-dialog title="编辑年份" :visible.sync="dialogFormVisible4EditYear">

      <el-form ref="dataEditForm" :model="formData" :rules="rules" label-position="right" label-width="100px">

        <el-row>

          <el-col :span="12">

            <el-form-item label="饰演开始年" prop="startYear">

              <el-input v-model="formData.startYear" />

            </el-form-item>

          </el-col>

          <el-col :span="12">

            <el-form-item label="饰演结束年" prop="endYear">

              <el-input v-model="formData.endYear" />

            </el-form-item>

          </el-col>

        </el-row>

      </el-form>

      <div slot="footer" class="dialog-footer">

        <el-button @click="cancel()">取消</el-button>

        <el-button type="primary" @click="handleEditYear()">确定</el-button>

      </div>

    </el-dialog>
    <!-- 编辑角色弹层 -->
    <el-dialog title="编辑角色" :visible.sync="dialogFormVisible4EditRole">

      <el-form ref="dataEditForm" :model="formData" :rules="rules" label-position="right" label-width="100px">

        <el-row>

          <el-col :span="24">

            <el-form-item label="角色名" prop="animeRole">

              <el-input v-model="formData.animeRole" type="textarea" />

            </el-form-item>

          </el-col>

        </el-row>

      </el-form>

      <div slot="footer" class="dialog-footer">

        <el-button @click="cancel()">取消</el-button>

        <el-button type="primary" @click="handleEditRole()">确定</el-button>

      </div>

    </el-dialog>
    <!-- 删除标签弹层 -->
    <el-dialog title="删除作品" :visible.sync="dialogFormVisible4Reconfirm">

      <el-form ref="dataEditForm" :model="formData" :rules="rules" label-position="right" label-width="100px">

        <el-row>
          <el-form-item label="声优">
            <el-select v-model="formData.cvName" :disabled="true" filterable placeholder="声优">
              <el-option
                v-for="item in selcetForm.cvNameDataList"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="动画名">
            <el-select v-model="formData.animeId" :disabled="true" filterable placeholder="请选择动画">
              <el-option
                v-for="item in selcetForm.animeNameDataList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-row>

        <el-row>

          <el-col :span="24">

            <el-form-item label="角色名" prop="animeRole">

              <el-input v-model="formData.animeRole" :disabled="true" type="textarea" />

            </el-form-item>

          </el-col>

        </el-row>

        <el-row>

          <el-col :span="12">

            <el-form-item label="饰演开始年" prop="startYear">

              <el-input v-model="formData.startYear" :disabled="true" />

            </el-form-item>

          </el-col>

          <el-col :span="12">

            <el-form-item label="饰演结束年" prop="endYear">

              <el-input v-model="formData.endYear" :disabled="true" />

            </el-form-item>

          </el-col>

        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">

        <el-button @click="cancel()">取消</el-button>

        <el-button type="danger" @click="handleDelete()">确定</el-button>

      </div>

    </el-dialog>
  </section>
</template>

<script>

import {
  getListPage,
  remove,
  edit,
  add,
  getId,
  getAnimeName,
  getCVName,
  selectAfterAdd,
  updateYear,
  selectAfterUpdate,
  updateRole
} from '@/api/CV/cvWorks.js'

export default {
  data() {
    return {
      dataList: [], // 当前页要展示的列表数据
      selcetForm: {// 选项框要展示的列表数据
        cvNameDataList: [],
        animeNameDataList: [],
        id: ''
      },
      dialogFormVisible: false, // 添加表单是否可见
      dialogFormVisible4Edit: false, // 编辑表单是否可见
      dialogFormVisible4EditYear: false, // 编辑年份表单是否可见
      dialogFormVisible4EditRole: false, // 编辑角色表单是否可见
      dialogFormVisible4Reconfirm: false, // 删除表单是否可见
      formData: {}, // 表单数据
      rules: {// 校验规则
        cvName: [{ required: true, message: '声优名字为必填项', trigger: 'blur' }],
        animeId: [{ required: true, message: '动画名称为必填项', trigger: 'blur' }],
        startYear: [{ required: true, message: '动画开始年为必填项', trigger: 'blur' }],
        endYear: [{ required: true, message: '动画结束年为必填项', trigger: 'blur' }]

      },
      pagination: {// 分页相关模型数据
        animeId: '',
        animeRole: '',
        startYear: '',
        endYear: '',
        year: '',
        cvName: ''
      }
    }
  },
  // 钩子函数，VUE对象初始化完成后自动执行
  created() {
    getCVName().then(res => {
      this.selcetForm.cvNameDataList = res.data
    })
    getAnimeName().then(res => {
      this.selcetForm.animeNameDataList = res.data
    })
  },
  methods: {
    // 取消
    cancel() {
      this.dialogFormVisible = false
      this.dialogFormVisible4Edit = false
      this.dialogFormVisible4EditYear = false
      this.dialogFormVisible4EditRole = false
      this.dialogFormVisible4Reconfirm = false
      this.$message.info(' 当前操作取消')
    },
    // 获取用户列表
    getAll() {
      const para = {
        cvName: this.pagination.cvName,
        animeId: this.pagination.animeId,
        animeRole: this.pagination.animeRole
      }
      if (this.pagination.cvName === '' && this.pagination.animeId === '' && this.pagination.animeRole === '') {
        this.$confirm('当前操作为查询全部作品，可能耗时过长，是否继续？', '提示', { type: 'info' }).then(() => {
          getListPage(para).then(res => {
            this.dataList = res.data
          })
        }).catch(() => {
          this.$message.info('取消操作')
        })
      } else {
        getListPage(para).then(res => {
          this.dataList = res.data
        })
      }
    },
    selectAfterAddAll() {
      if (this.pagination.cvName === '' && this.pagination.animeId === '' && this.pagination.animeRole === '') {
        const para = {
          animeId: this.formData.animeId
        }
        selectAfterAdd(para).then((res) => {
          this.dataList = res.data
        })
      } else {
        this.getAll()
      }
    },
    selectAfterUpdateAll() {
      if (this.pagination.cvName === '' && this.pagination.animeId === '' && this.pagination.animeRole === '') {
        const para = {
          animeId: this.formData.animeId
        }
        selectAfterUpdate(para).then((res) => {
          this.dataList = res.data
        })
      } else {
        this.getAll()
      }
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
            if (res.flag) {
              // 判断当前操作是否成功
              this.$message({
                message: '新增成功',
                type: 'success'
              })
              this.dialogFormVisible = false
            } else {
              this.$message.error(res.msg)
            }
          }).finally(() => {
            this.selectAfterAddAll()
          })
        }).catch(() => {
          this.$message.info('取消操作')
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
          }).finally(() => {
            this.selectAfterAddAll()
          }).catch(res => {
            this.$message({
              message: '修改失败',
              type: 'warning'
            })
          })
        })
    },
    // 弹出修改年份窗口
    handleUpdateYear(row) {
      if (row.id !== undefined) { // 确保 id 不是 undefined
        this.dialogFormVisible4EditYear = true
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
    // 确认修改年份
    handleEditYear() {
      this.$confirm('确认修改年份么？', '提示', {})
        .then(() => {
          updateYear(this.formData).then(res => {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.dialogFormVisible4EditYear = false
          }).finally(() => {
            this.selectAfterUpdateAll()
          }).catch(res => {
            this.$message({
              message: '修改失败',
              type: 'warning'
            })
          })
        })
    },
    // 弹出修改角色窗口
    handleUpdateRole(row) {
      if (row.id !== undefined) { // 确保 id 不是 undefined
        this.dialogFormVisible4EditRole = true
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
    // 确认修改角色
    handleEditRole() {
      this.$confirm('确认修改角色么？', '提示', {})
        .then(() => {
          updateRole(this.formData).then(res => {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.dialogFormVisible4EditRole = false
          }).finally(() => {
            this.selectAfterUpdateAll()
          }).catch(res => {
            this.$message({
              message: '修改失败',
              type: 'warning'
            })
          })
        })
    },
    // 弹出确定删除信息窗口
    handleReconfirm(row) {
      if (row.id !== undefined) { // 确保 id 不是 undefined
        this.dialogFormVisible4Reconfirm = true
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
    // 删除
    handleDelete(row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      })
        .then(() => {
          remove(this.formData).then(res => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.dialogFormVisible4Reconfirm = false
            this.getAll()
          })
        })
        .catch(res => {
          this.$message({
            message: '删除失败',
            type: 'warning'
          })
        })
    }
  }
}
</script>

<style scoped>

</style>
