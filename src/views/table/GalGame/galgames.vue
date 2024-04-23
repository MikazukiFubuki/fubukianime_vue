<template>
  <section class="app-container">
    <!--搜索栏-->
    <el-input v-model="pagination.name" placeholder="GalGame名" style="width: 160px" class="filter-item" />
    <el-select v-model="pagination.storyScore" filterable placeholder="剧情评分" style="width: 100px">
      <el-option
        v-for="item in scoreDataList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="pagination.roleScore" filterable placeholder="角色评分" style="width: 100px">
      <el-option
        v-for="item in scoreDataList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="pagination.imgQualityScore" filterable placeholder="画质评分" style="width: 100px">
      <el-option
        v-for="item in scoreDataList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="pagination.musicScore" filterable placeholder="音乐评分" style="width: 100px">
      <el-option
        v-for="item in scoreDataList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="pagination.environmentType" filterable placeholder="环境类型" style="width: 100px">
      <el-option
        v-for="item in selcetForm.environmentTypeDataList"
        :key="item.id"
        :label="item.environmentType"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="pagination.type" filterable placeholder="剧情类型" style="width: 100px">
      <el-option
        v-for="item in selcetForm.typeDataList"
        :key="item.id"
        :label="item.type"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="pagination.rebornType" filterable placeholder="轮回类型" style="width: 100px">
      <el-option
        v-for="item in selcetForm.rebornTypeDataList"
        :key="item.id"
        :label="item.rebornType"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="pagination.loveType" filterable placeholder="恋爱类型" style="width: 100px">
      <el-option
        v-for="item in selcetForm.loveTypeDataList"
        :key="item.id"
        :label="item.loveType"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="pagination.branchType" filterable placeholder="分支类型" style="width: 100px">
      <el-option
        v-for="item in selcetForm.branchTypeDataList"
        :key="item.id"
        :label="item.branchType"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="pagination.spType" filterable placeholder="特殊类型" style="width: 100px">
      <el-option
        v-for="item in selcetForm.spTypeDataList"
        :key="item.id"
        :label="item.spType"
        :value="item.id"
      />
    </el-select>

    <el-select v-model="pagination.sexLevel" filterable placeholder="限制级" style="width: 100px">
      <el-option
        v-for="item in sexLevelDataList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="pagination.language" filterable placeholder="语言" style="width: 100px">
      <el-option
        v-for="item in languageDataList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="pagination.area" filterable placeholder="地区" style="width: 100px">
      <el-option
        v-for="item in areaDataList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="pagination.status" filterable placeholder="状态" style="width: 100px">
      <el-option
        v-for="item in statusDataList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>

    <el-button type="primary" class="dalfBut" @click="getAll()">查询</el-button>
    <el-button type="success" class="butT" @click="handleCreate()">新增GalGame</el-button>

    <!--表格-->
    <el-table size="big" current-row-key="id" :data="dataList" stripe highlight-current-row>

      <el-table-column type="index" align="center" label="序号" />

      <el-table-column prop="name" label="GalGame名称" align="center" width="270" />
      <el-table-column prop="allScore" label="总评价" sortable align="center" width="80" />
      <el-table-column prop="storyScore" label="剧情评分" sortable align="center" width="80" />
      <el-table-column prop="roleScore" label="角色评分" sortable align="center" width="80" />
      <el-table-column prop="imgQualityScore" label="画质评分" sortable align="center" width="80" />
      <el-table-column prop="musicScore" label="音乐评分" sortable align="center" width="80" />
      <el-table-column prop="environmentType" label="环境类型" align="center" width="80" />
      <el-table-column prop="type" label="剧情类型" align="center" width="80" />
      <el-table-column prop="rebornType" label="轮回类型" align="center" width="80" />
      <el-table-column prop="loveType" label="恋爱类型" align="center" width="80" />
      <el-table-column prop="branchType" label="分支类型" align="center" width="80" />
      <el-table-column prop="spType" label="特殊类型" align="center" width="80" />

      <el-table-column prop="sexLevel" label="限制级" align="center" width="80">
        <template scope="scope">
          <span v-if="scope.row.sexLevel === 'R' " style="color:#00ff00">{{ scope.row.sexLevel }}</span>
          <span v-else-if="scope.row.sexLevel === 'G' " style="color: red">{{ scope.row.sexLevel }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="language" label="语言" align="center" width="80">
        <template scope="scope">
          <span v-if="scope.row.language === '日版' " style="color:#ff9933">{{ scope.row.language }}</span>
          <span v-else-if="scope.row.language === '汉化' " style="color: #33ccff">{{ scope.row.language }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="area" label="地区" align="center" width="80">
        <template scope="scope">
          <span v-if="scope.row.area === '本区' " style="color:#ff66ff">{{ scope.row.area }}</span>
          <span v-else-if="scope.row.area === '转区' " style="color: #7f00ff">{{ scope.row.area }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center" width="80" />

      <el-table-column label="操作" align="center" width="200">

        <template slot-scope="scope">

          <el-button type="warning" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="danger" @click="handleReconfirm(scope.row)">删除</el-button>

        </template>

      </el-table-column>

    </el-table>

    <!--新增表单-->
    <el-dialog title="新增GalGame" :visible.sync="dialogFormVisible">

      <el-form ref="dataAddForm" :model="formData" :rules="rules" label-position="right" label-width="100px">

        <el-row>

          <el-col :span="24">

            <el-form-item label="GalGame名" prop="name">

              <el-input v-model="formData.name" />

            </el-form-item>

          </el-col>

        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="剧情评分">
              <el-select v-model="formData.storyScore" placeholder="剧情评分" size="small">
                <el-option
                  v-for="item in scoreDataList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="角色评分">
              <el-select v-model="formData.roleScore" placeholder="角色评分" size="small">
                <el-option
                  v-for="item in scoreDataList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="画质评分">
              <el-select v-model="formData.imgQualityScore" placeholder="画质评分" size="small">
                <el-option
                  v-for="item in scoreDataList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="音乐评分">
              <el-select v-model="formData.musicScore" placeholder="音乐评分" size="small">
                <el-option
                  v-for="item in scoreDataList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="环境类型">
              <el-select v-model="formData.environmentType" placeholder="环境类型" size="small">
                <el-option
                  v-for="item in selcetForm.environmentTypeDataList"
                  :key="item.id"
                  :label="item.environmentType"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="剧情类型">
              <el-select v-model="formData.type" placeholder="剧情类型" size="small">
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
            <el-form-item label="轮回类型">
              <el-select v-model="formData.rebornType" placeholder="轮回类型" size="small">
                <el-option
                  v-for="item in selcetForm.rebornTypeDataList"
                  :key="item.id"
                  :label="item.rebornType"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="恋爱类型">
              <el-select v-model="formData.loveType" placeholder="恋爱类型" size="small">
                <el-option
                  v-for="item in selcetForm.loveTypeDataList"
                  :key="item.id"
                  :label="item.loveType"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="分支类型">
              <el-select v-model="formData.branchType" placeholder="分支类型" size="small">
                <el-option
                  v-for="item in selcetForm.branchTypeDataList"
                  :key="item.id"
                  :label="item.branchType"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="特殊类型">
              <el-select v-model="formData.spType" placeholder="特殊类型" size="small">
                <el-option
                  v-for="item in selcetForm.spTypeDataList"
                  :key="item.id"
                  :label="item.spType"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="限制级">
              <el-select v-model="formData.sexLevel" placeholder="限制级" size="small">
                <el-option
                  v-for="item in sexLevelDataList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="语言">
              <el-select v-model="formData.language" placeholder="语言" size="small">
                <el-option
                  v-for="item in languageDataList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="地区">
              <el-select v-model="formData.area" placeholder="地区" size="small">
                <el-option
                  v-for="item in areaDataList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态">
              <el-select v-model="formData.status" placeholder="状态" size="small">
                <el-option
                  v-for="item in statusDataList"
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
    <!--编辑表单-->
    <el-dialog title="编辑GalGame" :visible.sync="dialogFormVisible4Edit">

      <el-form ref="dataEditForm" :model="formData" :rules="rules" label-position="right" label-width="100px">

        <el-row>

          <el-col :span="24">

            <el-form-item label="GalGame名" prop="name">

              <el-input v-model="formData.name" />

            </el-form-item>

          </el-col>

        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="剧情评分">
              <el-select v-model="formData.storyScore" placeholder="剧情评分" size="small">
                <el-option
                  v-for="item in scoreDataList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="角色评分">
              <el-select v-model="formData.roleScore" placeholder="角色评分" size="small">
                <el-option
                  v-for="item in scoreDataList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="画质评分">
              <el-select v-model="formData.imgQualityScore" placeholder="画质评分" size="small">
                <el-option
                  v-for="item in scoreDataList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="音乐评分">
              <el-select v-model="formData.musicScore" placeholder="音乐评分" size="small">
                <el-option
                  v-for="item in scoreDataList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="环境类型">
              <el-select v-model="formData.environmentType" placeholder="环境类型" size="small">
                <el-option
                  v-for="item in selcetForm.environmentTypeDataList"
                  :key="item.id"
                  :label="item.environmentType"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="剧情类型">
              <el-select v-model="formData.type" placeholder="剧情类型" size="small">
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
            <el-form-item label="轮回类型">
              <el-select v-model="formData.rebornType" placeholder="轮回类型" size="small">
                <el-option
                  v-for="item in selcetForm.rebornTypeDataList"
                  :key="item.id"
                  :label="item.rebornType"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="恋爱类型">
              <el-select v-model="formData.loveType" placeholder="恋爱类型" size="small">
                <el-option
                  v-for="item in selcetForm.loveTypeDataList"
                  :key="item.id"
                  :label="item.loveType"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="分支类型">
              <el-select v-model="formData.branchType" placeholder="分支类型" size="small">
                <el-option
                  v-for="item in selcetForm.branchTypeDataList"
                  :key="item.id"
                  :label="item.branchType"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="特殊类型">
              <el-select v-model="formData.spType" placeholder="特殊类型" size="small">
                <el-option
                  v-for="item in selcetForm.spTypeDataList"
                  :key="item.id"
                  :label="item.spType"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="限制级">
              <el-select v-model="formData.sexLevel" placeholder="限制级" size="small">
                <el-option
                  v-for="item in sexLevelDataList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="语言">
              <el-select v-model="formData.language" placeholder="语言" size="small">
                <el-option
                  v-for="item in languageDataList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="地区">
              <el-select v-model="formData.area" placeholder="地区" size="small">
                <el-option
                  v-for="item in areaDataList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态">
              <el-select v-model="formData.status" placeholder="状态" size="small">
                <el-option
                  v-for="item in statusDataList"
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
    <!-- 删除GalGame -->
    <el-dialog title="删除GalGame" :visible.sync="dialogFormVisible4Reconfirm">

      <el-form ref="dataEditForm" :model="formData" :rules="rules" label-position="right" label-width="100px">

        <el-row>

          <el-col :span="24">

            <el-form-item label="GalGame名" prop="name">

              <el-input v-model="formData.name" :disabled="true" />

            </el-form-item>

          </el-col>

        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="剧情评分">
              <el-select v-model="formData.storyScore" :disabled="true" placeholder="剧情评分" size="small">
                <el-option
                  v-for="item in scoreDataList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :disabled="true" label="角色评分">
              <el-select v-model="formData.roleScore" :disabled="true" placeholder="角色评分" size="small">
                <el-option
                  v-for="item in scoreDataList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="画质评分">
              <el-select v-model="formData.imgQualityScore" :disabled="true" placeholder="画质评分" size="small">
                <el-option
                  v-for="item in scoreDataList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="音乐评分">
              <el-select v-model="formData.musicScore" :disabled="true" placeholder="音乐评分" size="small">
                <el-option
                  v-for="item in scoreDataList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="环境类型">
              <el-select v-model="formData.environmentType" :disabled="true" placeholder="环境类型" size="small">
                <el-option
                  v-for="item in selcetForm.environmentTypeDataList"
                  :key="item.id"
                  :label="item.environmentType"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="剧情类型">
              <el-select v-model="formData.type" :disabled="true" placeholder="剧情类型" size="small">
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
            <el-form-item label="轮回类型">
              <el-select v-model="formData.rebornType" :disabled="true" placeholder="轮回类型" size="small">
                <el-option
                  v-for="item in selcetForm.rebornTypeDataList"
                  :key="item.id"
                  :label="item.rebornType"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="恋爱类型">
              <el-select v-model="formData.loveType" :disabled="true" placeholder="恋爱类型" size="small">
                <el-option
                  v-for="item in selcetForm.loveTypeDataList"
                  :key="item.id"
                  :label="item.loveType"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="分支类型">
              <el-select v-model="formData.branchType" :disabled="true" placeholder="分支类型" size="small">
                <el-option
                  v-for="item in selcetForm.branchTypeDataList"
                  :key="item.id"
                  :label="item.branchType"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="特殊类型">
              <el-select v-model="formData.spType" :disabled="true" placeholder="特殊类型" size="small">
                <el-option
                  v-for="item in selcetForm.spTypeDataList"
                  :key="item.id"
                  :label="item.spType"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="限制级">
              <el-select v-model="formData.sexLevel" :disabled="true" placeholder="限制级" size="small">
                <el-option
                  v-for="item in sexLevelDataList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="语言">
              <el-select v-model="formData.language" :disabled="true" placeholder="语言" size="small">
                <el-option
                  v-for="item in languageDataList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="地区">
              <el-select v-model="formData.area" :disabled="true" placeholder="地区" size="small">
                <el-option
                  v-for="item in areaDataList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :disabled="true" label="状态">
              <el-select v-model="formData.status" :disabled="true" placeholder="状态" size="small">
                <el-option
                  v-for="item in statusDataList"
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
  getGalGameEnvironmentTypes,
  getGalGameTypes,
  getGalGameRebornTypes,
  getGalGameLoveTypes, getGalGameBranchTypes, getGalGameSpTypes
} from '@/api/GalGame/galgames.js'

export default {
  data() {
    return {
      dataList: [], // 当前页要展示的列表数据
      selcetForm: {// 选项框要展示的列表数据
        environmentTypeDataList: [],
        typeDataList: [],
        rebornTypeDataList: [],
        loveTypeDataList: [],
        branchTypeDataList: [],
        spTypeDataList: [],
        id: ''
      },
      dialogFormVisible: false, // 添加表单是否可见
      dialogFormVisible4Edit: false, // 编辑表单是否可见
      dialogFormVisible4Reconfirm: false, // 编辑表单是否可见
      formData: {}, // 表单数据
      rules: {// 校验规则
        name: [{ required: true, message: 'GalGame名称为必填项', trigger: 'blur' }],
        storyScore: [{ required: true, message: '剧情评分为必填项', trigger: 'blur' }],
        roleScore: [{ required: true, message: '角色评分为必填项', trigger: 'blur' }],
        imgQualityScore: [{ required: true, message: '画质评分为必填项', trigger: 'blur' }],
        musicScore: [{ required: true, message: '音乐评分为必填项', trigger: 'blur' }],
        environmentType: [{ required: true, message: '环境类型为必填项', trigger: 'blur' }],
        type: [{ required: true, message: '剧情类型为必填项', trigger: 'blur' }],
        rebornType: [{ required: true, message: '轮回类型为必填项', trigger: 'blur' }],
        loveType: [{ required: true, message: '恋爱类型为必填项', trigger: 'blur' }],
        branchType: [{ required: true, message: '分支类型为必填项', trigger: 'blur' }],
        spType: [{ required: true, message: '特殊类型为必填项', trigger: 'blur' }],
        sexLevel: [{ required: true, message: '限制级为必填项', trigger: 'blur' }],
        language: [{ required: true, message: '语言为必填项', trigger: 'blur' }],
        area: [{ required: true, message: '地区为必填项', trigger: 'blur' }],
        status: [{ required: true, message: '状态为必填项', trigger: 'blur' }]

      },
      pagination: {// 分页相关模型数据
        name: '',
        allScore: '',
        storyScore: '',
        roleScore: '',
        imgQualityScore: '',
        musicScore: '',
        environmentType: '',
        type: '',
        rebornType: '',
        loveType: '',
        branchType: '',
        spType: '',
        sexLevel: '',
        language: '',
        area: '',
        status: ''
      },
      sexLevelDataList: [{
        value: 'R',
        label: 'R'
      }, {
        value: 'G',
        label: 'G'
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
        value: '4',
        label: '4'
      }, {
        value: '5',
        label: '5'
      }, {
        value: '',
        label: ''
      }
      ],
      languageDataList: [{
        value: '汉化',
        label: '汉化'
      }, {
        value: '日版',
        label: '日版'
      }, {
        value: '',
        label: ''
      }
      ],
      areaDataList: [{
        value: '本区',
        label: '本区'
      }, {
        value: '转区',
        label: '转区'
      }, {
        value: '',
        label: ''
      }
      ],
      statusDataList: [{
        value: '0',
        label: '未玩'
      }, {
        value: '1',
        label: '已玩'
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
    getGalGameEnvironmentTypes().then(res => {
      this.selcetForm.environmentTypeDataList = res.data.records
    })
    getGalGameTypes().then(res => {
      this.selcetForm.typeDataList = res.data.records
    })
    getGalGameRebornTypes().then(res => {
      this.selcetForm.rebornTypeDataList = res.data.records
    })
    getGalGameLoveTypes().then(res => {
      this.selcetForm.loveTypeDataList = res.data.records
    })
    getGalGameBranchTypes().then(res => {
      this.selcetForm.branchTypeDataList = res.data.records
    })
    getGalGameSpTypes().then(res => {
      this.selcetForm.spTypeDataList = res.data.records
    })
  },
  methods: {
    // 取消
    cancel() {
      this.dialogFormVisible = false
      this.dialogFormVisible4Edit = false
      this.dialogFormVisible4Reconfirm = false
      this.$message.info(' 当前操作取消')
    },
    // 获取用户列表
    getAll() {
      const para = {
        name: this.pagination.name,
        storyScore: this.pagination.storyScore,
        roleScore: this.pagination.roleScore,
        imgQualityScore: this.pagination.imgQualityScore,
        musicScore: this.pagination.musicScore,
        environmentType: this.pagination.environmentType,
        type: this.pagination.type,
        rebornType: this.pagination.rebornType,
        loveType: this.pagination.loveType,
        branchType: this.pagination.branchType,
        spType: this.pagination.spType,
        sexLevel: this.pagination.sexLevel,
        language: this.pagination.language,
        area: this.pagination.area,
        status: this.pagination.status
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
