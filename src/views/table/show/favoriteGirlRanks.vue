<template>
  <section class="app-container">
    <!--搜索栏-->
    <el-input v-model="pagination.season" placeholder="届数" style="width: 200px;" class="filter-item" />
    <el-button class="dalfBut" @click="getCondition()">查询</el-button>

    <!--表格-->
    <el-table size="big" current-row-key="id" :data="dataList" stripe highlight-current-row>
      <el-table-column prop="season" label="选举届数" align="center" />
      <el-table-column prop="time" label="选举时期" align="center" />
      <el-table-column type="index" align="center" label="排名" />
      <el-table-column prop="name" label="动画角色" align="center" />
      <el-table-column prop="cv" label="声优" align="center" />
    </el-table>
  </section>
</template>

<script>

import {
  getListPage
} from '@/api/anime/favoriteGirlRanks.js'

export default {
  data() {
    return {
      dataList: [], // 当前页要展示的列表数据
      dialogFormVisible: false, // 添加表单是否可见
      dialogFormVisible4Edit: false, // 编辑表单是否可见
      formData: {}, // 表单数据
      pagination: {// 分页相关模型数据
        season: '',
        time: '',
        ranking: '',
        name: '',
        cv: ''
      }
    }
  },
  // 钩子函数，VUE对象初始化完成后自动执行
  created() {
    // 调用查询全部数据的操作
    this.getAll()
  },
  methods: {
    // 获取用户列表
    getAll() {
      const para = {
        season: '1'
      }
      getListPage(para).then(res => {
        this.dataList = res.data
      })
    },
    getCondition() {
      const para = {
        season: this.pagination.season
      }
      getListPage(para).then(res => {
        this.dataList = res.data
      })
    }
  }
}
</script>

<style scoped>

</style>
