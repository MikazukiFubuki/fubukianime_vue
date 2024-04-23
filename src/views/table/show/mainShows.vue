<template>
  <section class="app-container">
    <!-- 0、工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="pagination" @submit.native.prevent>
        <el-form-item>
          <el-input
            v-model="pagination.name"
            placeholder="动画片名"
            style="width: 90px;"
            class="filter-item"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="pagination.source"
            placeholder="片源"
            style="width: 60px;"
            class="filter-item"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="pagination.layout"
            placeholder="形式"
            style="width: 60px;"
            class="filter-item"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="pagination.type"
            placeholder="类型"
            style="width: 60px;"
            class="filter-item"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="pagination.love"
            placeholder="恋爱"
            style="width: 60px;"
            class="filter-item"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="pagination.sexLimit"
            placeholder="工口"
            style="width: 60px;"
            class="filter-item"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="pagination.create"
            placeholder="创作"
            style="width: 60px;"
            class="filter-item"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="pagination.broadcastStartYear"
            placeholder="始播年"
            style="width: 75px;"
            class="filter-item"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="pagination.broadcastEndYear"
            placeholder="终播年"
            style="width: 75px;"
            class="filter-item"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="pagination.leaderGender"
            placeholder="主角"
            style="width: 60px;"
            class="filter-item"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="pagination.favoriteHeroine"
            placeholder="女主"
            style="width: 60px;"
            class="filter-item"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="pagination.animationEnd"
            placeholder="动画结局"
            style="width: 90px;"
            class="filter-item"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="pagination.originalEnd"
            placeholder="原作结局"
            style="width: 90px;"
            class="filter-item"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="pagination.bingeWatchingType"
            placeholder="追番情况"
            style="width: 90px;"
            class="filter-item"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="pagination.bingeWatchingYear"
            placeholder="追番年"
            style="width: 75px;"
            class="filter-item"
          />
        </el-form-item>
        <el-form-item>
          <el-select v-model="pagination.bingeWatchingQuarter" placeholder="追番季" style="width: 100px;">
            <el-option
              v-for="item in quarterCNs"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="pagination.completeYear"
            placeholder="补完年"
            style="width: 75px;"
            class="filter-item"
          />
        </el-form-item>
        <el-form-item>
          <el-select v-model="pagination.completeQuarter" placeholder="补完季" style="width: 100px;">
            <el-option
              v-for="item in quarterCNs"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="pagination.status" placeholder="状态" style="width: 100px;">
            <el-option
              v-for="item in statusData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="dalfBut" icon="el-icon-search" @click="selectALL()">属性
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="dalfBut" icon="el-icon-search" @click="handleSelectYear()">范围
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" class="butT" @click="handleCreate()">新增</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" icon="el-icon-circle-close" circle @click="selectByConditionDAI()">待</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-caret-right" circle @click="selectByConditionZAI()">在</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" icon="el-icon-circle-check" circle @click="selectByConditionYI()">已</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!-- 1、列表-->
    <el-table
      size="big"
      current-row-key="id"
      :data="dataList"
      style="width: 100%"
      max-height="1200"
      stripe
      highlight-current-row
      :default-sort="{prop: 'score', order: 'descending'}"
    >
      <el-table-column fixed prop="name" label="片名" align="center" width="260" />
      <el-table-column prop="score" label="评分" sortable align="center" width="80" />
      <el-table-column prop="scoreRank" label="排位" sortable align="center" width="60">
        <template slot-scope="scope">
          <span v-if="scope.row.scoreRank / 10 > 0 && scope.row.scoreRank / 10 <= 1" style="color: #ffffff; font-weight: bold; text-shadow: 0 0 4px #ff3300">{{ scope.row.scoreRank }}</span>
          <span v-else-if="scope.row.scoreRank / 10 > 1 && scope.row.scoreRank / 10 <= 5 " style="color: #ffffff; font-weight: bold; text-shadow: 0 0 4px #ac39ac">{{ scope.row.scoreRank }}</span>
          <span v-else-if="scope.row.scoreRank / 10 > 5 && scope.row.scoreRank / 10 <= 10 " style="color: #ffffff; font-weight: bold; text-shadow: 0 0 4px #3399ff">{{ scope.row.scoreRank }}</span>
          <span v-else-if="scope.row.scoreRank / 10 > 10 && scope.row.scoreRank / 10 <= 20 " style="color: #ffffff; font-weight: bold; text-shadow: 0 0 4px #00ff99">{{ scope.row.scoreRank }}</span>
          <span v-else-if="scope.row.scoreRank / 10 > 20 && scope.row.scoreRank / 10 <= 50 " style="color: #ffffff; font-weight: bold; text-shadow: 0 0 4px #ffd700">{{ scope.row.scoreRank }}</span>
          <span v-else-if="scope.row.scoreRank / 10 > 50 && scope.row.scoreRank / 10 <= 100 " style="color: #ffffff; font-weight: bold; text-shadow: 0 0 4px #c0c0c0">{{ scope.row.scoreRank }}</span>
          <span v-else-if="scope.row.scoreRank / 10 > 100 && scope.row.scoreRank / 10 <= 150 " style="color: #ffffff; font-weight: bold; text-shadow: 0 0 4px #B87333">{{ scope.row.scoreRank }}</span>
          <span v-else style="font-weight: normal;">{{ scope.row.scoreRank }}</span>
        </template>
      </el-table-column>
      <el-table-column label="片源" align="center">
        <el-table-column label="1" prop="source1" align="center" width="90" />
        <el-table-column label="2" prop="source2" align="center" width="90" />
        <el-table-column label="3" prop="source3" align="center" width="90" />
      </el-table-column>
      <el-table-column prop="layout" label="形式" align="center" width="400" />
      <el-table-column label="类型" align="center">
        <el-table-column label="1" prop="type1" align="center" width="70" />
        <el-table-column label="2" prop="type2" align="center" width="70" />
        <el-table-column label="3" prop="type3" align="center" width="70" />
      </el-table-column>
      <el-table-column prop="love" label="恋爱" align="center" width="80" />
      <el-table-column prop="sexLimit" label="工口" align="center" width="50" />
      <el-table-column prop="create" label="创作" align="center" width="80" />
      <el-table-column prop="completeId" label="补完" sortable align="center" width="70" />
      <el-table-column prop="bingeWatchingId" label="追番" sortable align="center" width="70" />
      <el-table-column prop="reviewId" label="重温" sortable align="center" width="70" />
      <el-table-column prop="leaderGender" label="主角" align="center" width="90" />
      <el-table-column prop="favoriteHeroine" label="最爱女主" align="center" width="130" />
      <el-table-column prop="animationEnd" label="动画结局" align="center" width="90" />
      <el-table-column prop="originalEnd" label="原作结局" align="center" width="90" />
      <el-table-column prop="broadcastYear" label="播出年份" align="center" width="120" />
      <el-table-column prop="bingeWatchingType" label="追番情况" align="center" width="80">
        <template scope="scope">
          <span v-if="scope.row.bingeWatchingType === '当季追番' " style="color:#ff8000">{{ scope.row.bingeWatchingType }}</span>
          <span v-else-if="scope.row.bingeWatchingType === '跨季追番' " style="color: #33cc33">{{ scope.row.bingeWatchingType }}</span>
          <span v-else-if="scope.row.bingeWatchingType === '停播续追' " style="color:#7030A0">{{ scope.row.bingeWatchingType }}</span>
          <span v-else-if="scope.row.bingeWatchingType === '长期更番' " style="color:#0066ff">{{ scope.row.bingeWatchingType }}</span>
          <span v-else>{{ scope.row.bingeWatchingType }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="bingeWatchingQuarter" label="追番季" align="center" width="90" />
      <el-table-column prop="completeQuarter" label="补完季" align="center" width="90" />
      <el-table-column prop="status" label="状态" align="center" width="70" />
    </el-table>

    <!-- 2、分页组件-->
    <el-pagination
background
      class="pagiantion"

      :current-page="pagination.currentPage"

      :hide-on-single-page="pagination.value"

      :page-size="pagination.pageSize"

      layout="total, prev, pager, next, jumper"

      :total="pagination.total"

      @current-change="handleCurrentChange"
    />

    <!-- 0.2、范围条件查询-->
    <el-dialog title="范围条件查询" :visible.sync="dialogFormVisible4SelectYear">

      <el-form
        ref="dataSelectYearForm"
        :model="selectYearData"
        :rules="rules"
        label-position="right"
        label-width="100px"
      >

        <el-row>

          <el-col :span="6">

            <el-form-item label="动画评分" prop="score">

              <el-input v-model="selectYearData.score" />

            </el-form-item>

          </el-col>

          <el-col :span="6">

            <el-form-item label="至" prop="score2">

              <el-input v-model="selectYearData.score2" />

            </el-form-item>

          </el-col>

        </el-row>

        <el-row>

          <el-col :span="6">

            <el-form-item label="动画补番ID" prop="completeId">

              <el-input v-model="selectYearData.completeId" />

            </el-form-item>

          </el-col>

          <el-col :span="6">

            <el-form-item label="至" prop="completeId2">

              <el-input v-model="selectYearData.completeId2" />

            </el-form-item>

          </el-col>

        </el-row>

        <el-row>

          <el-col :span="6">

            <el-form-item label="动画追番ID" prop="bingeWatchingId">

              <el-input v-model="selectYearData.bingeWatchingId" />

            </el-form-item>

          </el-col>

          <el-col :span="6">

            <el-form-item label="至" prop="bingeWatchingId2">

              <el-input v-model="selectYearData.bingeWatchingId2" />

            </el-form-item>

          </el-col>

        </el-row>

        <el-row>

          <el-col :span="6">

            <el-form-item label="动画重温ID" prop="reviewId">

              <el-input v-model="selectYearData.reviewId" />

            </el-form-item>

          </el-col>

          <el-col :span="6">

            <el-form-item label="至" prop="reviewId2">

              <el-input v-model="selectYearData.reviewId2" />

            </el-form-item>

          </el-col>

        </el-row>

        <el-row>

          <el-col :span="6">

            <el-form-item label="动画开始年份" prop="broadcastStartYear">

              <el-input v-model="selectYearData.broadcastStartYear" />

            </el-form-item>

          </el-col>

          <el-col :span="6">

            <el-form-item label="至" prop="broadcastStartYear2">

              <el-input v-model="selectYearData.broadcastStartYear2" />

            </el-form-item>

          </el-col>

        </el-row>

        <el-row>

          <el-col :span="6">

            <el-form-item label="动画结束年份" prop="broadcastEndYear">

              <el-input v-model="selectYearData.broadcastEndYear" />

            </el-form-item>

          </el-col>

          <el-col :span="6">

            <el-form-item label="至" prop="broadcastEndYear2">

              <el-input v-model="selectYearData.broadcastEndYear2" />

            </el-form-item>

          </el-col>

        </el-row>

        <el-row>

          <el-col :span="6">

            <el-form-item label="动画追番年" prop="bingeWatchingYear">

              <el-input v-model="selectYearData.bingeWatchingYear" />

            </el-form-item>

          </el-col>

          <el-col :span="6">

            <el-select v-model="selectYearData.bingeWatchingQuarter" placeholder="请选择季度">
              <el-option
                v-for="item in quarters"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>

          </el-col>

          <el-col :span="6">

            <el-form-item label="至" prop="bingeWatchingYear2">

              <el-input v-model="selectYearData.bingeWatchingYear2" />

            </el-form-item>

          </el-col>

          <el-col :span="6">

            <el-select v-model="selectYearData.bingeWatchingQuarter2" placeholder="请选择季度">
              <el-option
                v-for="item in quarters"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>

          </el-col>

        </el-row>

        <el-row>

          <el-col :span="6">

            <el-form-item label="动画补完年" prop="completeYear">

              <el-input v-model="selectYearData.completeYear" />

            </el-form-item>

          </el-col>

          <el-col :span="6">

            <el-select v-model="selectYearData.completeQuarter" placeholder="请选择季度">
              <el-option
                v-for="item in quarters"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>

          </el-col>

          <el-col :span="6">

            <el-form-item label="至" prop="completeYear2">

              <el-input v-model="selectYearData.completeYear2" />

            </el-form-item>

          </el-col>

          <el-col :span="6">

            <el-select v-model="selectYearData.completeQuarter2" placeholder="请选择季度">
              <el-option
                v-for="item in quarters"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>

          </el-col>

        </el-row>

      </el-form>

      <div slot="footer" class="dialog-footer">

        <el-button @click="cancel()">取消</el-button>

        <el-button type="primary" @click="selectMainByYearQuarterCondition()">确定</el-button>

      </div>

    </el-dialog>
  </section>
</template>

<script>
import {
  getAnimationEndAll,
  getBingeWatchingTypeAll,
  getCreateAll,
  getLayoutTypeAll,
  getLeaderGenderAll,
  getLoveAll,
  getOriginalEndAll,
  getQuarterAll,
  getSexLimitAll,
  getSourceAll,
  getTypeAll,
  selectByCondition,
  selectByYearQuarterCondition
} from '@/api/anime/mainManages'

export default {
  data() {
    return {
      dataList: [], // 当前页要展示的列表数据
      selcetForm: {// 选项框要展示的列表数据
        createDataList: [],
        sourceDataList: [],
        bingeWatchingTypeDataList: [],
        typeDataList: [],
        loveDataList: [],
        sexLimitDataList: [],
        leaderGenderDataList: [],
        animationEndDataList: [],
        originalEndDataList: [],
        layoutTypeDataList: [],
        quarterDataList: [],
        id: ''
      },
      dataLayoutList: [], // 动画形式要展示的列表数据
      dataAnimeWithScoreList: [], // 动画名与评分要展示的列表数据

      dialogFormVisible: false, // 添加表单是否可见
      dialogFormVisible4Edit: false, // 编辑表单是否可见
      dialogFormVisible4EditName: false, // 编辑动画名表单是否可见
      dialogFormVisible4EditScore: false, // 编辑动画评分表单是否可见
      dialogFormVisible4EditSource: false, // 编辑动画来源表单是否可见
      dialogFormVisible4EditType: false, // 编辑动画类型表单是否可见
      dialogFormVisible4EditLove: false, // 编辑动画恋爱表单是否可见
      dialogFormVisible4EditSexLimit: false, // 编辑动画工口表单是否可见
      dialogFormVisible4EditCreate: false, // 编辑动画创作表单是否可见
      dialogFormVisible4EditLeaderGender: false, // 编辑动画主角表单是否可见
      dialogFormVisible4EditFavoriteHeroine: false, // 编辑动画女主表单是否可见
      dialogFormVisible4EditAnimationEnd: false, // 编辑动画动画结局表单是否可见
      dialogFormVisible4EditBroadcastYear: false, // 编辑动画播出年份表单是否可见
      dialogFormVisible4EditBingeWatchingType: false, // 编辑动画播出类型表单是否可见
      dialogFormVisible4EditBingeWatching: false, // 编辑动画追番时间表单是否可见
      dialogFormVisible4EditComplete: false, // 编辑动画补完时间表单是否可见
      dialogFormVisible4EditStatus: false, // 编辑动画状态表单是否可见
      dialogFormVisible4StartAnimeEdit: false, // 编辑开始追番表单是否可见
      dialogFormVisible4AddSourceEdit: false, // 编辑新增来源表单是否可见
      dialogFormVisible4EndAnimeEdit: false, // 编辑番剧补完表单是否可见
      dialogFormVisible4LayoutEdit: false, // 编辑动画形式表单是否可见
      dialogFormVisible4SaveLayoutEdit: false, // 编辑动画形式编辑表单是否可见
      dialogFormVisible4CompleteIdEdit: false, // 编辑补番id编辑表单是否可见
      dialogFormVisible4BingeWatchingIdEdit: false, // 编辑追番id编辑表单是否可见
      dialogFormVisible4ReviewIdEdit: false, // 编辑重温id编辑表单是否可见
      dialogFormVisible4Reconfirm: false, // 确认删除表单是否可见
      dialogFormVisible4DeleteLayoutEdit: false, // 确认删除形式表单是否可见
      dialogFormVisible4SelectYear: false, // 条件查询年间表单是否可见
      dialogFormVisible4ExtendAnimeEdit: false, // 延长追番表单是否可见
      dialogFormVisible4ChasingAPlayEdit: false, // 追更一集表单是否可见
      dialogFormVisible4OriginalEndEdit: false, // 原作完结表单是否可见
      dialogFormVisible4OverYearEdit: false, // 动画跨年表单是否可见
      dialogFormVisible4AnimeWithScore: false, // 动画名与评分表单是否可见

      formData: {}, // 表单数据
      layoutFormData: {}, // 查询出形式表单数据
      animeScoreFormData: {}, // 查询出动画名与评分表单数据

      rules: {// 校验规则
        status: [{ required: true, message: '动画状态为必填项', trigger: 'blur' }],
        name: [{ required: true, message: '动画名称为必填项', trigger: 'blur' }],
        source1: [{ required: true, message: '必须添加一个来源', trigger: 'blur' }],
        type1: [{ required: true, message: '至少添加一个类型', trigger: 'blur' }],
        love: [{ required: true, message: '恋爱类型为必填项', trigger: 'blur' }],
        sexLimit: [{ required: true, message: '工口类型为必填项', trigger: 'blur' }],
        create: [{ required: true, message: '动画类型为必填项', trigger: 'blur' }],
        leaderGender: [{ required: true, message: '主角类型为必填项', trigger: 'blur' }],
        favoriteHeroine: [{ required: true, message: '没有请写无', trigger: 'blur' }],
        animationEnd: [{ required: true, message: '动画结局为必填项', trigger: 'blur' }],
        originalEnd: [{ required: true, message: '原作结局为必填项', trigger: 'blur' }],
        broadcastStartYear: [{ min: 4, max: 4, message: '年份为四位数', trigger: 'blur' }],
        broadcastStartYear2: [{ min: 4, max: 4, message: '年份为四位数', trigger: 'blur' }],
        broadcastEndYear: [{ min: 4, max: 4, message: '年份为四位数', trigger: 'blur' }],
        broadcastEndYear2: [{ min: 4, max: 4, message: '年份为四位数', trigger: 'blur' }],
        bingeWatchingType: [{ required: true, message: '追番类型为必填项', trigger: 'blur' }],
        bingeWatchingYear: [{ min: 4, max: 4, message: '年份为四位数', trigger: 'blur' }],
        bingeWatchingYear2: [{ min: 4, max: 4, message: '年份为四位数', trigger: 'blur' }],
        completeYear: [{ min: 4, max: 4, message: '年份为四位数', trigger: 'blur' }],
        completeYear2: [{ min: 4, max: 4, message: '年份为四位数', trigger: 'blur' }],
        layoutTypeId: [{ required: true, message: '必须选择一个动画形式', trigger: 'blur' }],
        episodes: [{ required: true, message: '动画集数为必填项', trigger: 'blur' }],
        modifyId: [{ required: true, message: '修改后id为必填项', trigger: 'blur' }]

      },
      pagination: {// 分页相关模型数据
        currentPage: 1, // 当前页码
        pageSize: 150, // 每页显示的记录数
        total: 0, // 总记录数
        name: '',
        score: '',
        scoreRank: '',
        score2: '',
        source: '',
        source1: '',
        source2: '',
        source3: '',
        layout: '',
        type: '',
        type1: '',
        type2: '',
        type3: '',
        love: '',
        sexLimit: '',
        create: '',
        completeId: '',
        completeId2: '',
        bingeWatchingId: '',
        bingeWatchingId2: '',
        reviewId: '',
        reviewId2: '',
        leaderGender: '',
        favoriteHeroine: '',
        animationEnd: '',
        originalEnd: '',
        broadcastStartYear: '',
        broadcastStartYear2: '',
        broadcastEndYear: '',
        broadcastEndYear2: '',
        bingeWatchingType: '',
        bingeWatchingYear: '',
        bingeWatchingYear2: '',
        completeYear: '',
        completeYear2: '',
        bingeWatchingQuarter: '',
        bingeWatchingQuarter2: '',
        completeQuarter: '',
        completeQuarter2: '',
        status: '',
        broadcastYear: '',
        modifyId: ''
      },
      layoutData: {// 动画形式相关模型数据
        id: '',
        name: '',
        layoutId: '',
        layoutTypeId: '',
        anotherName: '',
        quarterNum: '',
        part: '',
        episodes: '',
        embyId: ''
      },
      AnimeScoreData: {// 动画名与评分相关模型数据
        name: '',
        score: ''
      },
      selectYearData: {// 范围条件查询相关模型数据
        currentPage: 1, // 当前页码
        pageSize: 3000, // 每页显示的记录数
        total: 0, // 总记录数
        score: '',
        score2: '',
        completeId: '',
        completeId2: '',
        bingeWatchingId: '',
        bingeWatchingId2: '',
        reviewId: '',
        reviewId2: '',
        broadcastStartYear: '',
        broadcastStartYear2: '',
        broadcastEndYear: '',
        broadcastEndYear2: '',
        bingeWatchingYear: '',
        bingeWatchingYear2: '',
        completeYear: '',
        completeYear2: '',
        bingeWatchingQuarter: '',
        bingeWatchingQuarter2: '',
        completeQuarter: '',
        completeQuarter2: ''
      },
      quarters: [{
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
      }],

      quarterCNs: [{
        value: '冬',
        label: '冬'
      }, {
        value: '春',
        label: '春'
      }, {
        value: '夏',
        label: '夏'
      }, {
        value: '秋',
        label: '秋'
      }],

      statusData: [{
        value: '待看',
        label: '待看'
      }, {
        value: '在看',
        label: '在看'
      }, {
        value: '看完',
        label: '看完'
      }],
      value: ''
    }
  },
  // 钩子函数，VUE对象初始化完成后自动执行
  created() {
    // 调用查询全部数据的操作
    this.selectByConditionZAI()
    getCreateAll().then(res => {
      this.selcetForm.createDataList = res.data
    })
    getSourceAll().then(res => {
      this.selcetForm.sourceDataList = res.data
    })
    getBingeWatchingTypeAll().then(res => {
      this.selcetForm.bingeWatchingTypeDataList = res.data.records
    })
    getTypeAll().then(res => {
      this.selcetForm.typeDataList = res.data
    })
    getLoveAll().then(res => {
      this.selcetForm.loveDataList = res.data
    })
    getSexLimitAll().then(res => {
      this.selcetForm.sexLimitDataList = res.data
    })
    getLeaderGenderAll().then(res => {
      this.selcetForm.leaderGenderDataList = res.data
    })
    getAnimationEndAll().then(res => {
      this.selcetForm.animationEndDataList = res.data
    })
    getOriginalEndAll().then(res => {
      this.selcetForm.originalEndDataList = res.data
    })
    getLayoutTypeAll().then(res => {
      this.selcetForm.layoutTypeDataList = res.data
    })
    getQuarterAll().then(res => {
      this.selcetForm.quarterDataList = res.data.records
    })
  },
  methods: {
    // 0.1、条件查询
    selectALL() {
      this.dialogFormVisible4LayoutEdit = false
      const pageSize = this.pagination.pageSize
      const currentPage = this.pagination.currentPage
      const param = {
        name: this.pagination.name,
        score: this.pagination.score,
        source: this.pagination.source,
        layout: this.pagination.layout,
        type: this.pagination.type,
        love: this.pagination.love,
        sexLimit: this.pagination.sexLimit,
        create: this.pagination.create,
        completeId: this.pagination.completeId,
        bingeWatchingId: this.pagination.bingeWatchingId,
        reviewId: this.pagination.reviewId,
        leaderGender: this.pagination.leaderGender,
        favoriteHeroine: this.pagination.favoriteHeroine,
        animationEnd: this.pagination.animationEnd,
        originalEnd: this.pagination.originalEnd,
        broadcastStartYear: this.pagination.broadcastStartYear,
        broadcastEndYear: this.pagination.broadcastEndYear,
        bingeWatchingType: this.pagination.bingeWatchingType,
        bingeWatchingYear: this.pagination.bingeWatchingYear,
        completeYear: this.pagination.completeYear,
        bingeWatchingQuarter: this.pagination.bingeWatchingQuarter,
        completeQuarter: this.pagination.completeQuarter,
        status: this.pagination.status
      }
      selectByCondition(param, pageSize, currentPage).then(res => {
        this.pagination.total = res.data.total
        this.dataList = res.data.list
      })
    },

    // 0.4、待看按钮
    selectByConditionDAI() {
      const pageSize = this.pagination.pageSize
      const currentPage = this.pagination.currentPage
      const param = {
        status: '待看'
      }
      selectByCondition(param, pageSize, currentPage).then(res => {
        this.pagination.total = res.data.total
        this.dataList = res.data.list
      })
    },

    // 0.5、在看按钮
    selectByConditionZAI() {
      this.dialogFormVisible4LayoutEdit = false
      const pageSize = this.pagination.pageSize
      const currentPage = this.pagination.currentPage
      const param = {
        status: '在看'
      }
      selectByCondition(param, pageSize, currentPage).then(res => {
        this.pagination.total = res.data.total
        this.dataList = res.data.list
      })
    },

    // 0.6、已看按钮
    selectByConditionYI() {
      const pageSize = this.pagination.pageSize
      const currentPage = this.pagination.currentPage
      const param = {
        status: '看完'
      }
      selectByCondition(param, pageSize, currentPage).then(res => {
        this.pagination.total = res.data.total
        this.dataList = res.data.list
      })
    },

    // 0.2、弹出查询年间窗口
    handleSelectYear() {
      this.dialogFormVisible4SelectYear = true
    },

    // 0.2、范围条件查询
    selectMainByYearQuarterCondition() {
      // 组织参数，拼接url请求地址
      const pageSize = this.pagination.pageSize
      const currentPage = this.pagination.currentPage
      const param = {
        broadcastStartYear: this.selectYearData.broadcastStartYear,
        broadcastStartYear2: this.selectYearData.broadcastStartYear2,
        broadcastEndYear: this.selectYearData.broadcastEndYear,
        broadcastEndYear2: this.selectYearData.broadcastEndYear2,
        bingeWatchingYear: this.selectYearData.bingeWatchingYear,
        bingeWatchingYear2: this.selectYearData.bingeWatchingYear2,
        bingeWatchingQuarter: this.selectYearData.bingeWatchingQuarter,
        bingeWatchingQuarter2: this.selectYearData.bingeWatchingQuarter2,
        completeYear: this.selectYearData.completeYear,
        completeYear2: this.selectYearData.completeYear2,
        completeQuarter: this.selectYearData.completeQuarter,
        completeQuarter2: this.selectYearData.completeQuarter2,
        score: this.selectYearData.score,
        score2: this.selectYearData.score2,
        completeId: this.selectYearData.completeId,
        completeId2: this.selectYearData.completeId2,
        bingeWatchingId: this.selectYearData.bingeWatchingId,
        bingeWatchingId2: this.selectYearData.bingeWatchingId2,
        reviewId: this.selectYearData.reviewId,
        reviewId2: this.selectYearData.reviewId2
      }
      selectByYearQuarterCondition(param, pageSize, currentPage).then(res => {
        this.dialogFormVisible4SelectYear = false
        this.pagination.total = res.data.total
        this.dataList = res.data.list
      })
    },

    // 2、切换页码
    handleCurrentChange(currentPage) {
      // 修改页码值为当前选中的页码值
      this.pagination.currentPage = currentPage
      // 执行查询
      this.selectALL()
    },

    // 取消
    cancel() {
      this.dialogFormVisible = false
      this.dialogFormVisible4Edit = false
      this.dialogFormVisible4EditName = false
      this.dialogFormVisible4EditScore = false
      this.dialogFormVisible4EditSource = false// 编辑动画来源表单是否可见
      this.dialogFormVisible4EditType = false// 编辑动画类型表单是否可见
      this.dialogFormVisible4EditLove = false// 编辑动画恋爱表单是否可见
      this.dialogFormVisible4EditSexLimit = false// 编辑动画工口表单是否可见
      this.dialogFormVisible4EditCreate = false// 编辑动画创作表单是否可见
      this.dialogFormVisible4EditLeaderGender = false// 编辑动画主角表单是否可见
      this.dialogFormVisible4EditFavoriteHeroine = false// 编辑动画女主表单是否可见
      this.dialogFormVisible4EditAnimationEnd = false// 编辑动画动画结局表单是否可见
      this.dialogFormVisible4EditBroadcastYear = false// 编辑动画播出年份表单是否可见
      this.dialogFormVisible4EditBingeWatchingType = false// 编辑动画播出类型表单是否可见
      this.dialogFormVisible4EditBingeWatching = false// 编辑动画追番时间表单是否可见
      this.dialogFormVisible4EditComplete = false// 编辑动画补完时间表单是否可见
      this.dialogFormVisible4EditStatus = false// 编辑动画状态表单是否可见

      this.dialogFormVisible4StartAnimeEdit = false
      this.dialogFormVisible4AddSourceEdit = false
      this.dialogFormVisible4EndAnimeEdit = false
      this.dialogFormVisible4LayoutEdit = false
      this.dialogFormVisible4CompleteIdEdit = false
      this.dialogFormVisible4BingeWatchingIdEdit = false
      this.dialogFormVisible4ReviewIdEdit = false
      this.dialogFormVisible4Reconfirm = false
      this.dialogFormVisible4SelectYear = false // 条件查询年间表单是否可见
      this.dialogFormVisible4ExtendAnimeEdit = false // 延长追番表单是否可见
      this.dialogFormVisible4OriginalEndEdit = false // 原作完结表单是否可见
      this.dialogFormVisible4OverYearEdit = false // 原作完结表单是否可见

      this.$message.info('当前操作取消')
    }
  }
}
</script>

<style scoped>

</style>
