<template>
    <el-breadcrumb separator="/">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
      <el-breadcrumb-item v-for="(item ,index) in list" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script>
export default {
  data () {
    return {
      list: []
    }
  },
  mounted () {
    console.log(this.$route)
    this.list = this.$route.meta.breadList
  },
  watch: {
    '$route' () {
      console.log('router-change')
      this.list = this.$route.meta.breadList
    }
  }
}
</script>