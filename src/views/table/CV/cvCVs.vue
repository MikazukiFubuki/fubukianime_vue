<template>
  <section class="app-container">
    <!--搜索栏-->
    <el-input v-model="pagination.name" placeholder="声优名称" style="width: 150px;" class="filter-item" />
    <el-input v-model="pagination.hiragana" placeholder="声优平假名" style="width: 150px;" class="filter-item" />
    <el-select v-model="pagination.sex" filterable placeholder="性别">
      <el-option
        v-for="item in sexDataList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-input v-model="pagination.anotherName" placeholder="声优别名" style="width: 300px;" class="filter-item" />
    <el-input v-model="pagination.birthday" placeholder="声优生日，yyyy.mm.dd" style="width: 200px;" class="filter-item" />
    <el-input v-model="pagination.company" placeholder="声优所属公司" style="width: 150px;" class="filter-item" />
    <el-input v-model="pagination.debutYear" placeholder="声优出道年" style="width: 150px;" class="filter-item" />
    <el-button type="primary" class="dalfBut" @click="getAll()">查询</el-button>
    <el-button type="warning" class="dalfBut" @click="getAllAndDeath()">查询全部</el-button>
    <el-button type="success" class="butT" @click="handleCreate()">新增声优</el-button>

    <!--表格-->
    <el-table size="big" current-row-key="id" :data="dataList" stripe highlight-current-row>

      <el-table-column type="index" align="center" label="序号" />

      <el-table-column prop="name" label="声优名称" align="center">
        <template scope="scope">
          <span v-if="scope.row.lived ==1" style="color: red">{{ scope.row.name }}</span>
          <span v-else>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="hiragana" label="声优平假名" align="center" />
      <el-table-column prop="sex" label="声优性别" align="center" width="100">
        <template scope="scope">
          <span v-if="scope.row.sex =='男'" style="color: #0066ff">{{ scope.row.sex }}</span>
          <span v-else style="color:red">{{ scope.row.sex }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="anotherName" label="声优别名" align="center" width="500" />
      <el-table-column prop="birthday" label="声优生日" align="center" width="150" />
      <el-table-column prop="company" label="声优所属公司" align="center" />
      <el-table-column prop="debutYear" label="声优出道年" sortable align="center" width="150" />
      <el-table-column prop="roleNum" label="声优已看作品数" sortable align="center" width="100">
        <template scope="scope">
          <span v-if="scope.row.roleNum <40" style="color:#00ccff">{{ scope.row.roleNum }}</span>
          <span v-else-if="scope.row.roleNum >=40 && scope.row.roleNum <80" style="color:#33cc33">{{ scope.row.roleNum }}</span>
          <span v-else-if="scope.row.roleNum >=80 && scope.row.roleNum <120" style="color:#ff9933">{{ scope.row.roleNum }}</span>
          <span v-else style="color:red">{{ scope.row.roleNum }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="300">

        <template slot-scope="scope">

          <el-button type="warning" @click="handleUpdate(scope.row)">编辑信息</el-button>

          <el-dropdown>
            <el-button type="danger">
              删除或去世<i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-button type="danger" @click="handleReconfirm(scope.row)">删除声优</el-button>
              <el-button type="danger" @click="handleEditDeath(scope.row)">声优去世</el-button>
            </el-dropdown-menu>
          </el-dropdown>

        </template>

      </el-table-column>

    </el-table>

    <!--新增表单-->
    <el-dialog title="新增声优" :visible.sync="dialogFormVisible">

      <el-form ref="dataAddForm" :model="formData" :rules="rules" label-position="right" label-width="100px">

        <el-row>

          <el-col :span="12">

            <el-form-item label="声优名称" prop="name">

              <el-input v-model="formData.name" />

            </el-form-item>

          </el-col>

          <el-col :span="12">

            <el-form-item label="声优平假名" prop="hiragana">

              <el-input v-model="formData.hiragana" />

            </el-form-item>

          </el-col>

        </el-row>

        <el-row>

          <el-form-item label="声优性别">
            <el-select v-model="formData.sex" filterable placeholder="请选择声优性别">
              <el-option
                v-for="item in sexDataList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-row>

        <el-row>

          <el-col :span="24">

            <el-form-item label="声优别名" prop="anotherName">

              <el-input v-model="formData.anotherName" type="textarea" />

            </el-form-item>

          </el-col>

        </el-row>

        <el-row>

          <el-col :span="8">

            <el-form-item label="声优生日，yyyy.mm.dd" prop="birthday">

              <el-input v-model="formData.birthday" />

            </el-form-item>

          </el-col>

          <el-col :span="8">

            <el-form-item label="声优所属公司" prop="company">

              <el-input v-model="formData.company" />

            </el-form-item>

          </el-col>

          <el-col :span="8">

            <el-form-item label="声优出道年" prop="debutYear">

              <el-input v-model="formData.debutYear" />

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
    <el-dialog title="编辑声优信息" :visible.sync="dialogFormVisible4Edit">

      <el-form ref="dataEditForm" :model="formData" :rules="rules" label-position="right" label-width="100px">

        <el-row>

          <el-col :span="12">

            <el-form-item label="声优名称" prop="name">

              <el-input v-model="formData.name" />

            </el-form-item>

          </el-col>

          <el-col :span="12">

            <el-form-item label="声优平假名" prop="hiragana">

              <el-input v-model="formData.hiragana" />

            </el-form-item>

          </el-col>

        </el-row>

        <el-row>
          <el-form-item label="声优性别">
            <el-select v-model="formData.sex" filterable placeholder="请再次选择声优性别">
              <el-option
                v-for="item in sexDataList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-row>

        <el-row>

          <el-col :span="24">

            <el-form-item label="声优别名" prop="anotherName">

              <el-input v-model="formData.anotherName" type="textarea" />

            </el-form-item>

          </el-col>

        </el-row>

        <el-row>

          <el-col :span="8">

            <el-form-item label="声优生日，yyyy.mm.dd" prop="birthday">

              <el-input v-model="formData.birthday" />

            </el-form-item>

          </el-col>

          <el-col :span="8">

            <el-form-item label="声优所属公司" prop="company">

              <el-input v-model="formData.company" />

            </el-form-item>

          </el-col>

          <el-col :span="8">

            <el-form-item label="声优出道年" prop="debutYear">

              <el-input v-model="formData.debutYear" />

            </el-form-item>

          </el-col>

        </el-row>

      </el-form>

      <div slot="footer" class="dialog-footer">

        <el-button @click="cancel()">取消</el-button>

        <el-button type="primary" @click="handleEdit()">确定</el-button>

      </div>

    </el-dialog>
    <!-- 编辑声优去世 -->
    <el-dialog title="声优去世" :visible.sync="dialogFormVisible4Death">

      <el-form ref="dataEditForm" :model="formData" :rules="rules" label-position="right" label-width="100px">

        <el-row>

          <el-col :span="12">

            <el-form-item label="声优名称" prop="name">

              <el-input v-model="formData.name" />

            </el-form-item>

          </el-col>

        </el-row>

        <el-row>

          <el-col :span="12">

            <el-form-item label="声优忌日，yyyy.mm.dd" prop="deathDay">

              <el-input v-model="formData.deathDay" />

            </el-form-item>

          </el-col>

        </el-row>

      </el-form>

      <div slot="footer" class="dialog-footer">

        <el-button @click="cancel()">取消</el-button>

        <el-button type="danger" @click="handleDeath()">确定</el-button>

      </div>

    </el-dialog>
    <!-- 删除声优 -->
    <el-dialog title="删除声优信息" :visible.sync="dialogFormVisible4Reconfirm">

      <el-form ref="dataEditForm" :model="formData" :rules="rules" label-position="right" label-width="100px">

        <el-row>

          <el-col :span="12">

            <el-form-item label="声优名称" prop="name">

              <el-input v-model="formData.name" :disabled="true" />

            </el-form-item>

          </el-col>

          <el-col :span="24">

            <el-form-item label="声优平假名" prop="hiragana">

              <el-input v-model="formData.hiragana" :disabled="true" />

            </el-form-item>

          </el-col>

        </el-row>

        <el-row>
          <el-form-item label="声优性别">
            <el-select v-model="formData.sex" :disabled="true" filterable placeholder="请再次选择声优性别">
              <el-option
                v-for="item in sexDataList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-row>

        <el-row>

          <el-col :span="24">

            <el-form-item label="声优别名" prop="anotherName">

              <el-input v-model="formData.anotherName" :disabled="true" type="textarea" />

            </el-form-item>

          </el-col>

        </el-row>

        <el-row>

          <el-col :span="8">

            <el-form-item label="声优生日，yyyy.mm.dd" prop="birthday">

              <el-input v-model="formData.birthday" :disabled="true" />

            </el-form-item>

          </el-col>

          <el-col :span="8">

            <el-form-item label="声优所属公司" prop="company">

              <el-input v-model="formData.company" :disabled="true" />

            </el-form-item>

          </el-col>

          <el-col :span="8">

            <el-form-item label="声优出道年" prop="debutYear">

              <el-input v-model="formData.debutYear" :disabled="true" />

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
  add, getId, getListPageAndDeath, editDeath
} from '@/api/CV/cvCVs.js'

export default {
  data() {
    return {
      dataList: [], // 当前页要展示的列表数据
      dialogFormVisible: false, // 添加表单是否可见
      dialogFormVisible4Edit: false, // 编辑表单是否可见
      dialogFormVisible4Reconfirm: false, // 编辑表单是否可见
      dialogFormVisible4Death: false, // 编辑表单是否可见
      formData: {}, // 表单数据
      rules: {// 校验规则
        name: [{ required: true, message: '声优名字为必填项', trigger: 'blur' }],
        hiragana: [{ required: true, message: '声优平假名为必填项', trigger: 'blur' }],
        sex: [{ required: true, message: '声优性别为必填项', trigger: 'blur' }]

      },
      pagination: {// 分页相关模型数据
        name: '',
        hiragana: '',
        sex: '',
        anotherName: '',
        birthday: '',
        company: '',
        debutYear: '',
        lived: '',
        deathDay: '',
        roleNum: ''
      },
      sexDataList: [{
        value: '男',
        label: '男'
      }, {
        value: '女',
        label: '女'
      },
      {
        value: '',
        label: ''
      }

      ]
    }
  },
  // 钩子函数，VUE对象初始化完成后自动执行
  created() {
    // 调用查询全部数据的操作
    this.getAll()
  },
  methods: {
    // 取消
    cancel() {
      this.dialogFormVisible = false
      this.dialogFormVisible4Edit = false
      this.dialogFormVisible4Reconfirm = false
      this.dialogFormVisible4Death = false
      this.$message.info(' 当前操作取消')
    },
    // 获取用户列表
    getAll() {
      const para = {
        name: this.pagination.name,
        hiragana: this.pagination.hiragana,
        sex: this.pagination.sex,
        anotherName: this.pagination.anotherName,
        birthday: this.pagination.birthday,
        company: this.pagination.company,
        debutYear: this.pagination.debutYear
      }
      getListPage(para).then(res => {
        this.dataList = res.data
      })
    },
    getAllAndDeath() {
      const para = {
        name: this.pagination.name,
        hiragana: this.pagination.hiragana,
        sex: this.pagination.sex,
        anotherName: this.pagination.anotherName,
        birthday: this.pagination.birthday,
        company: this.pagination.company,
        debutYear: this.pagination.debutYear
      }
      getListPageAndDeath(para).then(res => {
        this.dataList = res.data
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
    // 弹出声优去世编辑窗口
    handleEditDeath(row) {
      if (row.id !== undefined) { // 确保 id 不是 undefined
        this.dialogFormVisible4Death = true
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
    // 确认已声优去世
    handleDeath() {
      this.$confirm('确认此声优已去世么？', '提示', {})
        .then(() => {
          editDeath(this.formData).then(res => {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.dialogFormVisible4Death = false
            this.getAll()
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
