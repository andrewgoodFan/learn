<template>
    <el-container>
        <el-aside width="200px">
            <el-menu
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                @select="select"
                router
                unique-opened>
                    <template v-for="(item, index) in menuList">
                        <template v-if="item.children">
                            <sub-menu :subMenu="item" :key="index" :showIcon="true"></sub-menu>
                        </template>
                        <template v-else>
                            <el-menu-item :key="index" :index="item.path">
                                <i :class="item.icon"></i>
                                <span slot="title">{{item.title}}</span>
                            </el-menu-item>
                        </template>
                    </template>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header>
                <bread-menu></bread-menu>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import subMenu from '@/components/subMenu'
import breadMenu from '@/components/bread'
export default {
    data () {
        return {
            menuList: [
                {
                    path: '/index/index',
                    title: '首页',
                    icon: 'el-icon-home',
                    children: [
                        {
                            path: '/index/detail1',
                            title: '详情1'
                        },
                        {
                            path: '/index/detail2',
                            title: '详情2'
                        }
                    ]
                },
                {
                    path: '/about/index',
                    title: '关于',
                    icon: 'el-icon-menu',
                    children: [
                        {
                            path: '/about/detail1',
                            title: '二级关于1'
                        },
                        {
                            path: '/about/detail2',
                            title: '二级关于2',
                            children: [
                                {
                                    path: '/about/detail3',
                                    title: '三级关于'
                                }
                            ]
                        }
                    ]
                },
                {
                    path: '/tag/index',
                    title: '标签',
                    icon: 'el-icon-menu'
                }
            ]
        };
    },
    methods: {
        select (index, indexPath) {
            console.log('index', index);
            console.log('indexPath', indexPath);
            console.log('mathc', this.$route.matched)
        }
    },
    components: {
        subMenu,
        breadMenu
    }
};
</script>
<style>
    .el-menu {
        border-right: none;
    }
    .el-menu-vertical-demo {
        height: 100%;
    }
    .el-header {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #C0C4CC;
    }
</style>
