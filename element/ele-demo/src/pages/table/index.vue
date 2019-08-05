<template>
  <div class="custom-table-container">
    <el-table
    :data="list">
      <el-table-column
        v-for="(item, index) in tableHeader"
        :key="index"
        :prop="tableKeys[index]"
        :label="item">
      </el-table-column>
      <el-table-column fix="right" v-if="isAction">
        <template slot-scope="scope">
          <!-- <el-button type="text" @click="scan(scope.row, scope.$index)">查看</el-button>
          <el-button type="text" @click="edit(scope.row, scope.$index)">编辑</el-button>
          <el-button type="text" @click="del(scope.row, scope.$index)">删除</el-button> -->
          <!-- 可以根据具体需求配置响应的操作按钮, 暂时没找到添加slot,执行方法 -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      @current-change="changePage">
    </el-pagination>
  </div>
</template>
<script>
export default {
  data () {
    return {
    tableHeader: [], // 表头
    tableKeys: [], // 数据关联key
    list: [], // 表格数据
    total: 0, // 总数
    isAction: false // 显示操作栏
    }
  },
  methods: {
    changePage (current) {}
  },
}
</script>
<style>
  /* 自定义样式 */
</style>

