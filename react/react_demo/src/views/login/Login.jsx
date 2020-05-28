import React from 'react';
import {useState} from 'react';
import api from '@/api';
import {setToken} from '@/utils/cookies';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userRef, setUserRef] = useState('');
    const [passRef, setPassRef] = useState('');

    const getUser = (e) => {
        setUsername(e.target.value)
    } 

    const getPass = (e) => {
        setPassword(e.target.value)
    }
    const getUser2 = () => {
        console.log(userRef.value);
    } 
    const getPass2 = () => {
        console.log(passRef.value);
    }
    const login = () => {
        api.login({
            username,
            password
        }).then(res => {
            console.log(res)
            setToken(res.data.token);
            console.log('react-component', this);
        })
    }
    const regester = () => {
        api.regester({
            username,
            password
        }).then(res => {
            console.log(res);
        })
    }
    return (
        <div className="login-container">
            {/* 受控组件 */}
            <form action="">
                <label htmlFor="">
                    用户名: <input onChange={ (e) => getUser(e)} value={username} type="text"/>
                </label>
                <label htmlFor="">
                    密码: <input type="password" onChange={ e => getPass(e)} value={password} />
                </label>
                <label htmlFor="">
                    <input type="button" value="登录" onClick={login} />
                </label>
                <label htmlFor="">
                    <input type="button" value="注册" onClick={regester} />
                </label>
            </form>
            {/* 非受控组件 */}
            <form action="">
                <label htmlFor="">
                    用户名: <input
                    defaultValue=''
                    placeholder="请输入用户名"
                    ref={(userInput) => setUserRef(userInput)}
                    onChange={getUser2} type="text"/>
                </label>
                <label htmlFor="">
                    密码: <input
                    defaultValue=''
                    placeholder="请输入密码"
                    ref={(passInput) => setPassRef(passInput)}
                    type="password" onChange={getPass2} />
                </label>
                <label htmlFor="">
                    <input type="button" value="登录" />
                </label>
            </form>
        </div>
    )
}

export default Login;