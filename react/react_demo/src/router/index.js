import React, {Component} from 'react';
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom';
import routerList from './routes.js';
import {Provider as KeepAliveProvider, KeepAlive} from 'react-keep-alive';
import asyncComponent from '@/utils/asyncComponent';
import PrivateRouter from '@/utils/auth';

// const Home = asyncComponent(() => import('@/views/home/Home'));
// const List = asyncComponent(() => import('@/views/list/List'));
// const About = asyncComponent(() => import('@/views/about/About'));
// const Mine = asyncComponent(() => import('@/views/mine/Mine'));
const RouterConfig = () => {
        return (
            <HashRouter>
                <KeepAliveProvider>
                <Switch>  
                    {/* <Route path="/home">
                        <KeepAlive name="home">
                            <Home></Home>
                        </KeepAlive>
                    </Route>
                    <Route path="/list" component={List}></Route>
                    <Route path="/about" component={About}></Route>
                    <Route path="/mine" component={Mine}></Route> */}
                    {
                    routerList.map((item, index) => {
                        let MainComponent = item.component;
                        let CurrentComponent = item.meta && item.meta.keepAlive ? 
                        <KeepAlive name={item.name}>
                            <MainComponent></MainComponent>
                        </KeepAlive> : 
                        <MainComponent></MainComponent>;
                        return (
                            item.meta && item.meta.requireAuth ?
                            <PrivateRouter exact={item.exact} 
                            key={index} path={item.path} needKeepAlive={item.meta && item.meta.keepAlive || false} component={MainComponent}></PrivateRouter>
                            :
                            <Route path={item.path} exact={item.exact} 
                            key={index}>
                                <MainComponent></MainComponent>
                            </Route>
                        )
                       
                    })
                    }
                    <Redirect from="/" to="/home" exact ></Redirect>
                    <Redirect to="/404"></Redirect>
                </Switch>
                </KeepAliveProvider>
            </HashRouter>
        )
}

export default RouterConfig;