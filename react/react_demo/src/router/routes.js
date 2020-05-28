import React from 'react';
import asyncComponent from '@/utils/asyncComponent';
// tab router
// const Home = asyncComponent(() => import('@/views/home/Home'));
import Home from '@/views/home/Home';
import About from '@/views/about/About';
import List from '@/views/list/List';
import Mine from '@/views/mine/Mine';

// default router
const Login = asyncComponent(() => import('@/views/login/Login'));
const Notfound = asyncComponent(() => import('@/views/notfound/Notfound'));

const tabConfig = [
    {
        path: '/home',
        name: 'home',
        exact: false,
        component: Home,
        meta: {
            keepAlive: true,
            requireAuth: true
        }
    },
    {
        path: '/about',
        name: 'about',
        exact: false,
        component: About,
        meta: {
            keepAlive: false,
            requireAuth: true
        }
    },
    {
        path: '/list',
        name: 'list',
        exact: false,
        component: List,
        meta: {
            keepAlive: false,
            requireAuth: true
        }
    }, 
    {
        path: '/mine',
        name: 'mine',
        exact: false,
        component: Mine,
        meta: {
            keepAlive: true,
            requireAuth: true
        }
    }
];

const defaultConfig = [
    {
        path: '/login',
        name: 'login',
        exact: false,
        component: Login,
    },
    {
        path: '/404',
        name: '404',
        exact: false,
        component: Notfound,
    }
]

export default tabConfig.concat(defaultConfig);