<template>
  <section class="app-container">
    <el-button type="primary" class="butT" @click="handleCreate()">新建</el-button>

    <el-table size="big" current-row-key="id" :data="dataList" stripe highlight-current-row>

      <el-table-column type="index" align="center" label="序号" />

      <el-table-column prop="bingeWatchingQuarter" label="追番季" align="center" />
      <el-table-column prop="bingeWatchingSUM" label="当季追番和" sortable align="center" />
      <el-table-column prop="bingeWatchingCompare" label="较上季追番数比" align="center" />
      <el-table-column prop="currentSeasonNum" label="当季追番数" sortable align="center" />
      <el-table-column prop="lastSeasonNum" label="跨季追番数" sortable align="center" />
      <el-table-column prop="stopLiveNum" label="停播追番数" sortable align="center" />
      <el-table-column prop="averageScore" label="当季追番平均分" sortable align="center" />

    </el-table>

    <el-dialog title="新增追番补完季" :visible.sync="dialogFormVisible">

      <el-form ref="dataAddForm" :model="formData" :rules="rules" label-position="right" label-width="100px">

        <el-row>

          <el-col :span="12">

            <el-form-item label="动画追番年" prop="years">

              <el-input v-model="formData.years" />

            </el-form-item>

          </el-col>

        </el-row>

        <el-row>
          <el-form-item label="动画追番季">
            <el-select v-model="formData.quarter" placeholder="动画追番季" size="small">
              <el-option
                v-for="item in quarterCNs"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

        </el-row>

      </el-form>

      <div slot="footer" class="dialog-footer">

        <el-button @click="cancel()">取消</el-button>

        <el-button type="primary" @click="handleAdd()">确定</el-button>

      </div>

    </el-dialog>
  </section>
</template>

<script>

import {
  getListPage,
  add
} from '@/api/anime/quarters.js'

export default {
  data() {
    return {
      dataList: [], // 当前页要展示的列表数据
      dialogFormVisible: false, // 添加表单是否可见
      dialogFormVisible4Edit: false, // 编辑表单是否可见
      formData: {}, // 表单数据
      rules: {// 校验规则
        quarter: [{ required: true, message: '动画追番补完季为必填项', trigger: 'blur' }]
      },
      pagination: {// 分页相关模型数据
        currentPage: 1, // 当前页码
        pageSize: 20, // 每页显示的记录数
        total: 0, // 总记录数
        years: '',
        quarter: '',
        bingeWatchingQuarter: '',
        bingeWatchingSUM: '',
        bingeWatchingCompare: '',
        currentSeasonNum: '',
        lastSeasonNum: '',
        stopLiveNum: '',
        averageScore: ''
      },
      quarterCNs: [{
        value: '01',
        label: '冬'
      }, {
        value: '04',
        label: '春'
      }, {
        value: '07',
        label: '夏'
      }, {
        value: '10',
        label: '秋'
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
      // 发送异步请求
      const param = {
        years: this.pagination.years,
        quarter: this.pagination.quarter,
        bingeWatchingQuarter: this.pagination.bingeWatchingQuarter,
        bingeWatchingSUM: this.pagination.bingeWatchingSUM,
        bingeWatchingCompare: this.pagination.bingeWatchingCompare,
        currentSeasonNum: this.pagination.currentSeasonNum,
        lastSeasonNum: this.pagination.lastSeasonNum,
        stopLiveNum: this.pagination.stopLiveNum,
        averageScore: this.pagination.averageScore
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
      this.$confirm('是否增加此追番点？', '提示', { type: 'info' }).then(() => {
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
    }
  }
}
</script>

<style scoped>

</style>
