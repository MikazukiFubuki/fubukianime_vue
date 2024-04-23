<template>
  <section class="app-container">
    <el-button class="dalfBut" type="primary" @click="selectComPeriod()">查询普通</el-button>
    <el-button class="dalfBut" type="primary" @click="selectSPPeriod()">查询特殊</el-button>
    <el-button class="dalfBut" type="primary" @click="selectCPeriod()">查询补完</el-button>
    <el-button class="dalfBut" type="primary" @click="selectRCPeriod()">查询实际补</el-button>
    <el-button class="dalfBut" type="primary" @click="selectBPeriod()">查询追番</el-button>
    <el-button class="dalfBut" type="primary" @click="selectYPeriod()">查询年终</el-button>
    <el-button type="success" class="butT" round @click="handleCreate()">新增时期点</el-button>

    <el-table size="big" current-row-key="id" :data="dataList" stripe highlight-current-row>

      <el-table-column type="index" align="center" label="序号" />
      <el-table-column prop="periodName" label="结束时间点" align="center" />
      <el-table-column prop="completeAmount" label="已补番数" sortable align="center" />
      <el-table-column prop="bingeWatchingAmount" label="已追番数" sortable align="center" />
      <el-table-column prop="reCompleteAmount" label="补不同番数" sortable align="center" />
      <el-table-column prop="periodComplete" label="期间补番" sortable align="center" />
      <el-table-column prop="periodBingeWatching" label="期间追番" sortable align="center" />
      <el-table-column prop="comparePeriodComplete" label="较上期补番" align="center" />
      <el-table-column prop="comparePeriodBingeWatching" label="较上期追番" align="center" />
      <el-table-column prop="averageDailyComplete" label="平均日补番" sortable align="center" />
      <el-table-column prop="averageDailyBingeWatching" label="平均日追番" sortable align="center" />
      <el-table-column prop="periods" label="结束日期" align="center" />
      <el-table-column prop="days" label="日数" align="center" />
      <el-table-column prop="comparePeriodAverageDailyComplete" label="较上期平均日补番" align="center" />
      <el-table-column prop="comparePeriodAverageDailyBingeWatching" label="较上期平均日追番" align="center" />
      <el-table-column prop="averageScoreComplete" label="期间补番平均分" sortable align="center" />
      <el-table-column prop="averageScoreBingeWatching" label="期间追番平均分" sortable align="center" />

    </el-table>

    <el-dialog title="新增时期点" :visible.sync="dialogFormVisible">

      <el-form ref="dataAddForm" :model="formData" :rules="rules" label-position="right" label-width="100px">

        <el-row>

          <el-col :span="10">

            <el-form-item label="结束时间点" prop="love">

              <el-input v-model="formData.periodName" />

            </el-form-item>

          </el-col>

        </el-row>

        <el-row>
          <el-form-item label="时间点类型" prop="sp">
            <el-select v-model="formData.sp" placeholder="时间点类型" size="small">
              <el-option
                v-for="item in spData"
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
  selectBPeriodAll,
  selectComPeriodAll,
  selectCPeriodAll,
  selectRCPeriodAll,
  selectSPPeriodAll,
  selectYPeriodAll,
  add
} from '@/api/anime/periods'

export default {
  data() {
    return {
      dataList: [], // 当前页要展示的列表数据
      dialogFormVisible: false, // 添加表单是否可见
      dialogFormVisible4Edit: false, // 编辑表单是否可见
      formData: {}, // 表单数据
      rules: {// 校验规则
        periodName: [{ required: true, message: '时期名称为必填项', trigger: 'blur' }],
        sp: [{ required: true, message: '时期类型为必填项', trigger: 'blur' }]
      },
      pagination: {// 分页相关模型数据
        currentPage: 1, // 当前页码
        pageSize: 20, // 每页显示的记录数
        total: 0, // 总记录数
        sp: '',
        spid: '',
        periods: '',
        periodName: '',
        completeAmount: '',
        reCompleteAmount: '',
        bingeWatchingAmount: '',
        periodComplete: '',
        periodBingeWatching: '',
        comparePeriodComplete: '',
        comparePeriodBingeWatching: '',
        averageDailyComplete: '',
        averageDailyBingeWatching: '',
        days: '',
        comparePeriodAverageDailyComplete: '',
        comparePeriodAverageDailyBingeWatching: '',
        averageScoreComplete: '',
        averageScoreBingeWatching: ''
      },
      spData: [{
        value: '0',
        label: '普通时间点'
      }, {
        value: '1',
        label: '特殊时间点'
      }, {
        value: '2',
        label: '补完时间点'
      }, {
        value: '3',
        label: '实际补完时间点'
      }, {
        value: '4',
        label: '追番时间点'
      }, {
        value: '5',
        label: '年终时间点'
      }],
      value: ''
    }
  },
  // 钩子函数，VUE对象初始化完成后自动执行
  created() {
    // 查询普通时期点
    this.selectComPeriod()
  },
  methods: {
    selectComPeriod() {
      const param = {}
      selectComPeriodAll(param).then(res => {
        this.dataList = res.data
      })
    },
    selectSPPeriod() {
      const param = {}
      selectSPPeriodAll(param).then(res => {
        this.dataList = res.data
      })
    },
    selectCPeriod() {
      const param = {}
      selectCPeriodAll(param).then(res => {
        this.dataList = res.data
      })
    },
    selectRCPeriod() {
      const param = {}
      selectRCPeriodAll(param).then(res => {
        this.dataList = res.data
      })
    },
    selectBPeriod() {
      const param = {}
      selectBPeriodAll(param).then(res => {
        this.dataList = res.data
      })
    },
    selectYPeriod() {
      const param = {}
      selectYPeriodAll(param).then(res => {
        this.dataList = res.data
      })
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
        if (this.formData.sp === '1') {
          this.selectSPPeriod()
        } else if (this.formData.sp === '0') {
          this.selectComPeriod()
        } else if (this.formData.sp === '2') {
          this.selectCPeriod()
        } else if (this.formData.sp === '3') {
          this.selectRCPeriod()
        } else if (this.formData.sp === '4') {
          this.selectBPeriod()
        } else if (this.formData.sp === '5') {
          this.selectYPeriod()
        }
      })
    },

    // 取消
    cancel() {
      this.dialogFormVisible = false
      this.$message.info('当前操作取消')
    }
  }
}
</script>

<style scoped>

</style>
