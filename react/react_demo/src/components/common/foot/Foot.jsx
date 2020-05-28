import React from 'react';
import {NavLink} from 'react-router-dom';
// import {useState} from 'react';
import './foot.scss';

const Foot = (props) => {
    const list = [
        {
            path: '/home',
            name: 'home',
            icon: '',
            text: '首页'
        },
        {
            path: '/list',
            name: 'list',
            icon: '',
            text: '列表'
        },
        {
            path: '/about',
            name: 'about',
            icon: '',
            text: '关于'
        },
        {
            path: '/mine',
            name: 'mine',
            icon: '',
            text: '我的'
        }
    ]
    return (
        <div className="foot-container">
            {
             list.map((item, index) => {
                 return (
                 <NavLink to={item.path} key={index} className="foot-item">{item.text}</NavLink>
                 )
             })   
            }
        </div>
    )
}

export default Foot;