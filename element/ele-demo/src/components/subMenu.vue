<template>
  <el-submenu :index="subMenu.path">
      <!-- 一级标题 -->
      <template slot="title">
          <i class="el-icon-menu" v-if="showIcon"></i>
          <span>{{subMenu.title}}</span>
      </template>
      <!-- 二级标题 -->
      <template v-for="(item, index) in subMenu.children">
          <template v-if="item.children">
              <sub-menu :subMenu="item" :key="index"></sub-menu>
          </template>
          <template v-else>
              <el-menu-item :index="item.path" :key="index">{{item.title}}</el-menu-item>
          </template>
         <!-- <sub-menu :subMenu="item" :key="index"></sub-menu> -->
      </template>
  </el-submenu>
</template>
<script>
export default {
    name: 'subMenu',
    props: {
        subMenu: {
            type: Object,
            default () {
                return {}
            }
        },
        showIcon: {
            type: Boolean,
            default: false
        }
    }
}
</script>
