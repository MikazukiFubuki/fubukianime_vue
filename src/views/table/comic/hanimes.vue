<template>
  <section class="app-container">
    <!--搜索栏-->
    <el-input v-model="pagination.name" placeholder="动画名" style="width: 200px;" class="filter-item" />
    <el-input v-model="pagination.content" placeholder="动画内容" style="width: 200px;" class="filter-item" />
    <el-select v-model="pagination.type" placeholder="类型" size="small">
      <el-option
        v-for="item in selcetForm.typeDataList"
        :key="item.id"
        :label="item.type"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="pagination.dimensional" placeholder="维度" size="small">
      <el-option
        v-for="item in dimensional"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="pagination.status" placeholder="状态" size="small">
      <el-option
        v-for="item in status"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-button type="primary" class="dalfBut" @click="getAll()">查询</el-button>
    <el-button type="success" class="butT" @click="handleCreate()">新建</el-button>

    <!--表格-->
    <el-table size="big" current-row-key="id" :data="dataList" stripe highlight-current-row>

      <el-table-column type="index" align="center" label="序号" />

      <el-table-column prop="name" label="动画名" align="center" width="525" />
      <el-table-column prop="content" label="动画内容" align="center" width="625" />
      <el-table-column prop="type" label="类型" align="center" width="100" />
      <el-table-column prop="layout" label="形式" align="center" width="100" />
      <el-table-column prop="dimensional" label="维度" align="center" width="100" />
      <el-table-column prop="status" label="状态" align="center" width="100" />

      <el-table-column label="操作" align="center" width="350">

        <template slot-scope="scope">

          <el-button type="primary" @click="handleChasingAPlay(scope.row)">追更</el-button>

          <el-button type="success" @click="watchAnime(scope.row)">在线看</el-button>

          <el-button type="warning" circle @click="handleUpdate(scope.row)">改</el-button>

          <el-button type="danger" circle @click="handleReconfirm(scope.row)">删</el-button>

        </template>

      </el-table-column>

    </el-table>

    <!--新增表单-->
    <el-dialog title="新增H动画" :visible.sync="dialogFormVisible">

      <el-form ref="dataAddForm" :model="formData" :rules="rules" label-position="right" label-width="100px">

        <el-row>

          <el-col :span="24">

            <el-form-item label="动画名" prop="name">

              <el-input v-model="formData.name" />

            </el-form-item>

          </el-col>

        </el-row>

        <el-row>

          <el-col :span="24">

            <el-form-item label="动画内容" prop="content">

              <el-input v-model="formData.content" />

            </el-form-item>

          </el-col>

        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="动画类型">
              <el-select v-model="formData.type" placeholder="类型" size="small">
                <el-option
                  v-for="item in selcetForm.typeDataList"
                  :key="item.id"
                  :label="item.type"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">

            <el-form-item label="集数" prop="episodes">

              <el-input v-model="formData.episodes" />

            </el-form-item>

          </el-col>

        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="动画维度类型">
              <el-select v-model="formData.dimensional" placeholder="维度" size="small">
                <el-option
                  v-for="item in dimensional"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="动画状态">
              <el-select v-model="formData.status" placeholder="状态" size="small">
                <el-option
                  v-for="item in status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">

            <el-form-item label="EMBY ID" prop="embyId">

              <el-input v-model="formData.embyId" />

            </el-form-item>

          </el-col>

        </el-row>

      </el-form>

      <div slot="footer" class="dialog-footer">

        <el-button @click="cancel()">取消</el-button>

        <el-button type="primary" @click="handleAdd()">确定</el-button>

      </div>

    </el-dialog>
    <!-- 确定追更一集弹层 -->
    <el-dialog title="确定追更一集" :visible.sync="dialogFormVisible4ChasingAPlayEdit">

      <el-form
        ref="dataChasingAPlayEditForm"
        :model="formData"
        :rules="rules"
        label-position="left"
        label-width="100px"
      >

        <el-row>

          <el-col :span="6">

            <el-form-item label="当前已看集数" prop="episodes">

              <el-input v-model="formData.episodes" :disabled="true" />

            </el-form-item>

          </el-col>

        </el-row>

      </el-form>

      <div slot="footer" class="dialog-footer">

        <el-button @click="cancel()">取消</el-button>

        <el-button type="primary" @click="handleEditChasingAPlay()">确定追更</el-button>

      </div>

    </el-dialog>
    <!--编辑表单-->
    <el-dialog title="编辑H动画" :visible.sync="dialogFormVisible4Edit">

      <el-form ref="dataEditForm" :model="formData" :rules="rules" label-position="right" label-width="100px">

        <el-row>

          <el-col :span="24">

            <el-form-item label="动画名" prop="name">

              <el-input v-model="formData.name" />

            </el-form-item>

          </el-col>

        </el-row>

        <el-row>

          <el-col :span="24">

            <el-form-item label="动画内容" prop="content">

              <el-input v-model="formData.content" />

            </el-form-item>

          </el-col>

        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="动画类型">
              <el-select v-model="formData.type" placeholder="类型" size="small">
                <el-option
                  v-for="item in selcetForm.typeDataList"
                  :key="item.id"
                  :label="item.type"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">

            <el-form-item label="集数" prop="episodes">

              <el-input v-model="formData.episodes" />

            </el-form-item>

          </el-col>

        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="动画维度类型">
              <el-select v-model="formData.dimensional" placeholder="维度" size="small">
                <el-option
                  v-for="item in dimensional"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="动画状态">
              <el-select v-model="formData.status" placeholder="状态" size="small">
                <el-option
                  v-for="item in status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">

            <el-form-item label="EMBY ID" prop="embyId">

              <el-input v-model="formData.embyId" />

            </el-form-item>

          </el-col>

        </el-row>

      </el-form>

      <div slot="footer" class="dialog-footer">

        <el-button @click="cancel()">取消</el-button>

        <el-button type="primary" @click="handleEdit()">确定</el-button>

      </div>

    </el-dialog>
    <!-- 删除H动画 -->
    <el-dialog title="删除H动画" :visible.sync="dialogFormVisible4Reconfirm">

      <el-form ref="dataEditForm" :model="formData" :rules="rules" label-position="right" label-width="100px">

        <el-row>

          <el-col :span="24">

            <el-form-item label="动画名" prop="name">

              <el-input v-model="formData.name" :disabled="true" />

            </el-form-item>

          </el-col>

        </el-row>

        <el-row>

          <el-col :span="24">

            <el-form-item label="动画内容" prop="content">

              <el-input v-model="formData.content" :disabled="true" />

            </el-form-item>

          </el-col>

        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="动画类型">
              <el-select v-model="formData.type" :disabled="true" placeholder="类型" size="small">
                <el-option
                  v-for="item in selcetForm.typeDataList"
                  :key="item.id"
                  :label="item.type"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :disabled="true" :span="8">

            <el-form-item label="集数" prop="episodes">

              <el-input v-model="formData.episodes" :disabled="true" />

            </el-form-item>

          </el-col>

        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="动画维度类型">
              <el-select v-model="formData.dimensional" :disabled="true" placeholder="维度" size="small">
                <el-option
                  v-for="item in dimensional"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="动画状态">
              <el-select v-model="formData.status" :disabled="true" placeholder="状态" size="small">
                <el-option
                  v-for="item in status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">

            <el-form-item label="EMBY ID" prop="embyId">

              <el-input v-model="formData.embyId" :disabled="true" />

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
  getHTypeAll, chasingAPlay
} from '@/api/comic/hanimes.js'

export default {
  data() {
    return {
      dataList: [], // 当前页要展示的列表数据
      dialogFormVisible: false, // 添加表单是否可见
      dialogFormVisible4Edit: false, // 编辑表单是否可见
      dialogFormVisible4Reconfirm: false, // 编辑表单是否可见
      dialogFormVisible4ChasingAPlayEdit: false, // 追更一集表单是否可见
      formData: {}, // 表单数据
      selcetForm: {// 选项框要展示的列表数据
        typeDataList: [],
        layoutTypeDataList: [],
        sexLimitDataList: [],
        id: ''
      },
      rules: {// 校验规则
        name: [{ required: true, message: '动画名称为必填项', trigger: 'blur' }],
        type: [{ required: true, message: '动画类型为必填项', trigger: 'blur' }],
        dimensional: [{ required: true, message: '动画维度为必填项', trigger: 'blur' }],
        status: [{ required: true, message: '动画状态为必填项', trigger: 'blur' }]
      },
      pagination: {// 分页相关模型数据
        name: '',
        content: '',
        type: '',
        layout: '',
        episodes: '',
        dimensional: '',
        status: '',
        embyId: ''
      },
      dimensional: [{
        value: '2D',
        label: '2D'
      }, {
        value: '3D',
        label: '3D'
      }, {
        value: '',
        label: ''
      }],
      status: [{
        value: '下载',
        label: '下载'
      }, {
        value: '记录',
        label: '记录'
      }, {
        value: '',
        label: ''
      }]
    }
  },
  // 钩子函数，VUE对象初始化完成后自动执行
  created() {
    // 调用查询全部数据的操作
    this.getAll()
    getHTypeAll().then(res => {
      this.selcetForm.typeDataList = res.data.records
    })
  },
  methods: {
    // 取消
    cancel() {
      this.dialogFormVisible = false
      this.dialogFormVisible4Edit = false
      this.dialogFormVisible4ChasingAPlayEdit = false // 追更一集表单是否可见
      this.dialogFormVisible4Reconfirm = false
      this.$message.info(' 当前操作取消')
    },
    // 获取用户列表
    getAll() {
      const para = {
        name: this.pagination.name,
        content: this.pagination.content,
        type: this.pagination.type,
        dimensional: this.pagination.dimensional,
        status: this.pagination.status,
        embyId: this.pagination.embyId
      }
      getListPage(para).then(res => {
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
    // 弹出追更一集编辑窗口
    handleChasingAPlay(row) {
      if (row.id !== undefined) { // 确保 id 不是 undefined
        this.dialogFormVisible4ChasingAPlayEdit = true
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
    // 确定追更一集并修改信息
    handleEditChasingAPlay() {
      this.$confirm('是否追更一集？', '提示', {})
        .then(() => {
          chasingAPlay(this.formData).then(res => {
            this.$message({
              message: '追更成功',
              type: 'success'
            })
            this.dialogFormVisible4ChasingAPlayEdit = false
            this.getAll()
          }).catch(res => {
            this.$message({
              message: '追更失败',
              type: 'warning'
            })
          })
        })
    },
    // 在线看
    watchAnime(row) {
      // 弹出提示框，让用户选择跳转到内网还是外网
      this.$confirm('您想要跳转到内网还是外网？', '选择跳转地址', {
        confirmButtonText: '内网',
        cancelButtonText: '外网',
        type: 'info'
      }).then(() => {
        // 用户选择跳转到内网，则跳转到内网服务器地址
        const serverAddress = '192.168.3.100:8096' // 内网服务器地址
        const newUrl = `http://${serverAddress}/web/index.html#!/item?id=${row.embyId}&serverId=3b493c051cf34a7689de7f26b2ee5719&context=home`
        window.open(newUrl, '_blank')
      }).catch(() => {
        // 用户选择跳转到外网，则跳转到外网服务器地址
        const externalServerAddress = 'emby.mikazukifubukianime.com:8096' // 外网服务器地址
        const newUrl = `http://${externalServerAddress}/web/index.html#!/item?id=${row.embyId}&serverId=3b493c051cf34a7689de7f26b2ee5719&context=home`
        window.open(newUrl, '_blank')
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
