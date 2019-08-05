import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '*',
            redirect: '/menu'
        },
        {
            path: '/menu',
            component: () => import('@/pages/menu'),
            children: [
                {
                    path: '/index/detail1',
                    component: () => import('@/pages/index/detail1'),
                    meta: {
                        breadList: ['首页', '详情1']
                    }
                },
                {
                    path: '/index/detail2',
                    component: () => import('@/pages/index/detail1'),
                    meta: {
                        breadList: ['首页', '详情2']
                    }
                },
                {
                    path: '/about/detail1',
                    component: () => import('@/pages/about/detail1'),
                    meta: {
                        breadList: ['关于', '详情1']
                    }
                },
                {
                    path: '/about/detail2',
                    component: () => import('@/pages/index/detail2'),
                    meta: {
                        breadList: ['关于', '详情2']
                    }
                }, {
                    path: '/about/detail3',
                    component: () => import('@/pages/about/detail3'),
                    meta: {
                        breadList: ['首页', '二级关于', '详情']
                    }
                },
                {
                    path: '/tag/index',
                    component: () => import('@/pages/tag/index'),
                    meta: {
                        breadList: ['标签', '详情']
                    }
                }
            ]
        },
        {
            path: '/table/index',
            component: () => import('@/pages/table/index'),
            meta: {
                breadList: ['首页', '表格']
            }
        }
    ]
})
export default router
