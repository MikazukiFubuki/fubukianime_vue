<template>
  <section class="app-container">
    <!--搜索栏-->
    <el-input v-model="pagination.musicName" placeholder="音乐名" style="width: 160px;" class="filter-item" />
    <el-input v-model="pagination.mid" placeholder="编号" style="width: 80px;" class="filter-item" />
    <el-input v-model="pagination.animeName" placeholder="原作名" style="width: 160px;" class="filter-item" />
    <el-select v-model="pagination.type" filterable placeholder="类型" style="width: 100px;">
      <el-option
        v-for="item in selcetForm.typeDataList"
        :key="item.id"
        :label="item.type"
        :value="item.id"
      />
    </el-select>

    <el-select v-model="pagination.time" filterable placeholder="时长" style="width: 100px;">
      <el-option
        v-for="item in timeDataList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>

    <el-input v-model="pagination.singer" placeholder="歌手" style="width: 160px;" class="filter-item" />

    <el-select v-model="pagination.score" filterable placeholder="评价" style="width: 100px;">
      <el-option
        v-for="item in scoreDataList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>

    <el-select v-model="pagination.form" filterable placeholder="格式" style="width: 100px;">
      <el-option
        v-for="item in formDataList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>

    <el-select v-model="pagination.source" filterable placeholder="来源" style="width: 100px;">
      <el-option
        v-for="item in sourceDataList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>

    <el-select v-model="pagination.downloadType" filterable placeholder="下载类型" style="width: 120px;">
      <el-option
        v-for="item in selcetForm.downloadTypeDataList"
        :key="item.id"
        :label="item.downloadType"
        :value="item.id"
      />
    </el-select>

    <el-select v-model="pagination.addType" filterable placeholder="添加类型" style="width: 120px;">
      <el-option
        v-for="item in selcetForm.addTypeDataList"
        :key="item.id"
        :label="item.addType"
        :value="item.id"
      />
    </el-select>

    <el-input v-model="pagination.year" placeholder="追番年" style="width: 100px;" class="filter-item" />

    <el-select v-model="pagination.quarter" filterable placeholder="季度" style="width: 100px;">
      <el-option
        v-for="item in quarters"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>

    <el-button type="primary" class="dalfBut" @click="getAll()">查询</el-button>
    <el-button type="success" class="butT" @click="handleCreate()">新增音乐</el-button>

    <!--表格-->
    <el-table size="big" current-row-key="id" :data="dataList" stripe highlight-current-row>

      <!--                <el-table-column type="index" align="center" label="序号"></el-table-column>-->
      <el-table-column prop="mid" label="编号" align="center" width="80" />
      <el-table-column prop="musicName" label="音乐名" align="center" width="260">
        <template scope="scope">
          <span v-if="scope.row.downloadType === 'APP下载' " style="color: #33ccff">{{ scope.row.musicName }}</span>
          <span v-else-if="scope.row.downloadType === 'VIP未下载' " style="color:#ff8000">{{ scope.row.musicName }}</span>
          <span v-else-if="scope.row.downloadType === '非完整下载' " style="color:#00cc00">{{ scope.row.musicName }}</span>
          <span v-else-if="scope.row.downloadType === '种子下载'" style="color:#ff80d4">{{ scope.row.musicName }}</span>
          <span v-else-if="scope.row.downloadType === '购买下载'" style="color:#7f00ff">{{ scope.row.musicName }}</span>
          <span v-else>{{ scope.row.musicName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="animeName" label="原作名" align="center" width="260">
        <template scope="scope">
          <span v-if="scope.row.addType === '追新番' && scope.row.quarter ==='冬'" style="color:#00ccff">{{ scope.row.animeName }}</span>
          <span v-else-if="scope.row.addType === '追新番' && scope.row.quarter === '春'" style="color:#00cc00">{{ scope.row.animeName }}</span>
          <span v-else-if="scope.row.addType === '追新番' && scope.row.quarter === '夏'" style="color:red">{{ scope.row.animeName }}</span>
          <span v-else-if="scope.row.addType === '追新番' && scope.row.quarter === '秋'" style="color:#ff9933">{{ scope.row.animeName }}</span>
          <span v-else-if="scope.row.addType === '特殊'" style="color:#7f00ff">{{ scope.row.animeName }}</span>
          <span v-else>{{ scope.row.animeName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型" align="center" width="80" />
      <el-table-column prop="time" label="时长" align="center" width="80" />
      <el-table-column prop="singer" label="歌手" align="center" width="260" />
      <el-table-column prop="score" label="评价" sortable align="center" width="80" />
      <el-table-column prop="form" label="格式" align="center" width="90" />
      <el-table-column prop="source" label="来源" align="center" width="90" />
      <el-table-column prop="downloadType" label="下载类型" align="center" width="120" />
      <el-table-column prop="addType" label="添加类型" align="center" width="100" />
      <el-table-column prop="bingeTime" label="追番季" align="center" width="100" />
      <el-table-column label="操作" align="center" width="400">

        <template slot-scope="scope">

          <el-button type="primary" @click="handleListenning(scope.row)">音乐鉴赏</el-button>
          <el-button type="warning" @click="handleUpdate(scope.row)">编辑音乐</el-button>
          <el-button type="danger" @click="handleReconfirm(scope.row)">删除音乐</el-button>

        </template>

      </el-table-column>

    </el-table>

    <!--新增表单-->
    <el-dialog title="新增音乐" :visible.sync="dialogFormVisible">

      <el-form ref="dataAddForm" :model="formData" :rules="rules" label-position="right" label-width="100px">

        <el-row>

          <el-col :span="12">

            <el-form-item label="音乐名" prop="musicName">

              <el-input v-model="formData.musicName" />

            </el-form-item>

          </el-col>

          <el-col :span="12">

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

          </el-col>
        </el-row>

        <el-row>

          <el-col :span="24">

            <el-form-item label="特殊名" prop="spName">

              <el-input v-model="formData.spName" />

            </el-form-item>

          </el-col>

        </el-row>

        <el-row>

          <el-col :span="24">

            <el-form-item label="歌手名" prop="singer">

              <el-input v-model="formData.singer" type="textarea" />

            </el-form-item>

          </el-col>

        </el-row>

        <el-row>

          <el-col :span="8">
            <el-form-item label="添加类型">
              <el-select v-model="formData.addType" placeholder="添加类型" size="small">
                <el-option
                  v-for="item in selcetForm.addTypeDataList"
                  :key="item.id"
                  :label="item.addType"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">

            <el-form-item label="追番年" prop="year">

              <el-input v-model="formData.year" />

            </el-form-item>

          </el-col>

          <el-col :span="8">
            <el-form-item label="追番季">
              <el-select v-model="formData.quarter" placeholder="添加季度" size="small">
                <el-option
                  v-for="item in quarters"
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
    <!-- 编辑鉴赏弹层 -->
    <el-dialog title="鉴赏音乐" :visible.sync="dialogFormVisible4Listen">

      <el-form ref="dataEditForm" :model="formData" :rules="rules" label-position="right" label-width="100px">

        <el-row>
          <el-col :span="12">
            <el-form-item label="音乐类型">
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

          <el-col :span="12">
            <el-form-item label="音乐时长">
              <el-select v-model="formData.time" placeholder="时长" size="small">
                <el-option
                  v-for="item in timeDataList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>

          <el-col :span="12">
            <el-form-item label="音乐评价">
              <el-select v-model="formData.score" placeholder="评价" size="small">
                <el-option
                  v-for="item in scoreDataList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="音乐格式">
              <el-select v-model="formData.form" placeholder="格式" size="small">
                <el-option
                  v-for="item in formDataList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>

          <el-col :span="12">
            <el-form-item label="音乐来源">
              <el-select v-model="formData.source" placeholder="来源" size="small">
                <el-option
                  v-for="item in sourceDataList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="下载类型">
              <el-select v-model="formData.downloadType" placeholder="下载类型" size="small">
                <el-option
                  v-for="item in selcetForm.downloadTypeDataList"
                  :key="item.id"
                  :label="item.downloadType"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>

      </el-form>

      <div slot="footer" class="dialog-footer">

        <el-button @click="cancel()">取消</el-button>

        <el-button type="primary" @click="handleListened()">确定</el-button>

      </div>

    </el-dialog>
    <!--编辑表单-->
    <el-dialog title="编辑音乐" :visible.sync="dialogFormVisible4Edit">

      <el-form ref="dataEditForm" :model="formData" :rules="rules" label-position="right" label-width="100px">

        <el-row>

          <el-col :span="12">

            <el-form-item label="音乐名" prop="musicName">

              <el-input v-model="formData.musicName" />

            </el-form-item>

          </el-col>

          <el-col :span="12">

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

          </el-col>
        </el-row>

        <el-row>

          <el-col :span="24">

            <el-form-item label="特殊名" prop="spName">

              <el-input v-model="formData.spName" />

            </el-form-item>

          </el-col>

        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="音乐类型">
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

          <el-col :span="12">
            <el-form-item label="音乐时长">
              <el-select v-model="formData.time" placeholder="时长" size="small">
                <el-option
                  v-for="item in timeDataList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>

          <el-col :span="24">

            <el-form-item label="歌手名" prop="singer">

              <el-input v-model="formData.singer" type="textarea" />

            </el-form-item>

          </el-col>

        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="音乐评价">
              <el-select v-model="formData.score" placeholder="评价" size="small">
                <el-option
                  v-for="item in scoreDataList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="音乐格式">
              <el-select v-model="formData.form" placeholder="格式" size="small">
                <el-option
                  v-for="item in formDataList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>

          <el-col :span="12">
            <el-form-item label="音乐来源">
              <el-select v-model="formData.source" placeholder="来源" size="small">
                <el-option
                  v-for="item in sourceDataList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="下载类型">
              <el-select v-model="formData.downloadType" placeholder="下载类型" size="small">
                <el-option
                  v-for="item in selcetForm.downloadTypeDataList"
                  :key="item.id"
                  :label="item.downloadType"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>

          <el-col :span="8">
            <el-form-item label="添加类型">
              <el-select v-model="formData.addType" placeholder="添加类型" size="small">
                <el-option
                  v-for="item in selcetForm.addTypeDataList"
                  :key="item.id"
                  :label="item.addType"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">

            <el-form-item label="追番年" prop="year">

              <el-input v-model="formData.year" />

            </el-form-item>

          </el-col>

          <el-col :span="8">

            <el-form-item label="追番季">
              <el-select v-model="formData.quarter" placeholder="添加季度" size="small">
                <el-option
                  v-for="item in quarters"
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
    <!-- 删除音乐 -->
    <el-dialog title="删除音乐" :visible.sync="dialogFormVisible4Reconfirm">

      <el-form ref="dataEditForm" :model="formData" :rules="rules" label-position="right" label-width="100px">

        <el-row>

          <el-col :span="12">

            <el-form-item label="音乐名" prop="musicName">

              <el-input v-model="formData.musicName" :disabled="true" />

            </el-form-item>

          </el-col>

          <el-col :span="12">

            <el-form-item label="动画名">
              <el-select v-model="formData.animeName" :disabled="true" filterable placeholder="请选择动画">
                <el-option
                  v-for="item in selcetForm.animeNameDataList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>

          </el-col>
        </el-row>

        <el-row>

          <el-col :span="24">

            <el-form-item label="特殊名" prop="spName">

              <el-input v-model="formData.spName" :disabled="true" />

            </el-form-item>

          </el-col>

        </el-row>

        <el-row>

          <el-col :span="12">
            <el-form-item label="音乐类型">
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

          <el-col :span="12">
            <el-form-item label="音乐时长">
              <el-select v-model="formData.time" :disabled="true" placeholder="时长" size="small">
                <el-option
                  v-for="item in timeDataList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>

          <el-col :span="24">

            <el-form-item label="歌手名" prop="singer">

              <el-input v-model="formData.singer" :disabled="true" type="textarea" />

            </el-form-item>

          </el-col>

        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="音乐评价">
              <el-select v-model="formData.score" :disabled="true" placeholder="评价" size="small">
                <el-option
                  v-for="item in scoreDataList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="音乐格式">
              <el-select v-model="formData.form" :disabled="true" placeholder="格式" size="small">
                <el-option
                  v-for="item in formDataList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="音乐来源">
              <el-select v-model="formData.source" :disabled="true" placeholder="来源" size="small">
                <el-option
                  v-for="item in sourceDataList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="下载类型">
              <el-select v-model="formData.downloadType" :disabled="true" placeholder="下载类型" size="small">
                <el-option
                  v-for="item in selcetForm.downloadTypeDataList"
                  :key="item.id"
                  :label="item.downloadType"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>

          <el-col :span="8">
            <el-form-item label="添加类型">
              <el-select v-model="formData.addType" :disabled="true" placeholder="添加类型" size="small">
                <el-option
                  v-for="item in selcetForm.addTypeDataList"
                  :key="item.id"
                  :label="item.addType"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">

            <el-form-item label="追番年" prop="year">

              <el-input v-model="formData.year" :disabled="true" />

            </el-form-item>

          </el-col>

          <el-col :span="8">
            <el-form-item label="追番季">
              <el-select v-model="formData.quarter" :disabled="true" placeholder="添加类型" size="small">
                <el-option
                  v-for="item in quarters"
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
  getAddTypes, getDownloadTypes, getMusicTypes, listened
} from '@/api/AniSong/musics'
import { getAnimeName } from '@/api/CV/cvWorks'

export default {
  data() {
    return {
      dataList: [], // 当前页要展示的列表数据
      selcetForm: {// 选项框要展示的列表数据
        typeDataList: [],
        downloadTypeDataList: [],
        addTypeDataList: [],
        animeNameDataList: [],
        id: ''
      },
      dialogFormVisible: false, // 添加表单是否可见
      dialogFormVisible4Edit: false, // 编辑表单是否可见
      dialogFormVisible4Reconfirm: false, // 编辑表单是否可见
      dialogFormVisible4Listen: false, // 编辑表单是否可见
      formData: {}, // 表单数据
      rules: {// 校验规则
        musicName: [{ required: true, message: '音乐名称为必填项', trigger: 'blur' }],
        animeName: [{ required: true, message: '原作名称为必填项', trigger: 'blur' }],
        type: [{ required: true, message: '音乐类型为必填项', trigger: 'blur' }],
        time: [{ required: true, message: '音乐时长为必填项', trigger: 'blur' }],
        singer: [{ required: true, message: '歌手为必填项', trigger: 'blur' }],
        score: [{ required: true, message: '评价为必填项', trigger: 'blur' }],
        form: [{ required: true, message: '格式为必填项', trigger: 'blur' }],
        source: [{ required: true, message: '来源为必填项', trigger: 'blur' }],
        downloadType: [{ required: true, message: '下载类型为必填项', trigger: 'blur' }],
        addType: [{ required: true, message: '添加类型为必填项', trigger: 'blur' }]

      },
      pagination: {// 分页相关模型数据
        mid: '',
        musicName: '',
        animeName: '',
        animeId: '',
        spName: '',
        type: '',
        time: '',
        singer: '',
        score: '',
        form: '',
        source: '',
        downloadType: '',
        addType: '',
        year: '',
        quarter: '',
        bingeTime: ''
      },
      timeDataList: [{
        value: '长',
        label: '长'
      }, {
        value: '中',
        label: '中'
      }, {
        value: '短',
        label: '短'
      }, {
        value: '',
        label: ''
      }
      ],
      scoreDataList: [{
        value: '1',
        label: '1'
      }, {
        value: '2',
        label: '2'
      }, {
        value: '3',
        label: '3'
      }, {
        value: '',
        label: ''
      }
      ],
      formDataList: [{
        value: 'flac',
        label: 'flac'
      }, {
        value: 'mp3',
        label: 'mp3'
      }, {
        value: '',
        label: ''
      }
      ],
      sourceDataList: [{
        value: 'QQ',
        label: 'QQ'
      }, {
        value: '网易云',
        label: '网易云'
      }, {
        value: '',
        label: ''
      }
      ],
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
      }]
    }
  },
  // 钩子函数，VUE对象初始化完成后自动执行
  created() {
    // 调用查询全部数据的操作
    this.getAll()
    getMusicTypes().then(res => {
      this.selcetForm.typeDataList = res.data.records
    })
    getDownloadTypes().then(res => {
      this.selcetForm.downloadTypeDataList = res.data.records
    })
    getAddTypes().then(res => {
      this.selcetForm.addTypeDataList = res.data.records
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
      this.dialogFormVisible4Reconfirm = false
      this.dialogFormVisible4Listen = false
      this.$message.info(' 当前操作取消')
    },
    // 获取用户列表
    getAll() {
      const para = {
        musicName: this.pagination.musicName,
        mid: this.pagination.mid,
        animeName: this.pagination.animeName,
        type: this.pagination.type,
        time: this.pagination.time,
        singer: this.pagination.singer,
        score: this.pagination.score,
        form: this.pagination.form,
        source: this.pagination.source,
        downloadType: this.pagination.downloadType,
        addType: this.pagination.addType,
        year: this.pagination.year,
        quarter: this.pagination.quarter
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
    // 弹出鉴赏窗口
    handleListenning(row) {
      if (row.id !== undefined) { // 确保 id 不是 undefined
        this.dialogFormVisible4Listen = true
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
    // 确认鉴赏
    handleListened() {
      this.$confirm('确认修改吗？', '提示', {})
        .then(() => {
          listened(this.formData).then(res => {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.dialogFormVisible4Listen = false
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
