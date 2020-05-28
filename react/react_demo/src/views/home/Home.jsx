import React from 'react';
import Header from '@/components/common/header/Header';
import Foot from '@/components/common/foot/Foot';

const Home = (props) => {
    return (
        <div className="home-container">
            <Header title="首页"></Header>
            <p>这是首页</p>
            <Foot></Foot>
        </div>
    )
}
// class Home extends React.Component {
//     render () {
//         return (
//             <div className="home-container">
//                 <Header title="首页"></Header>
//                 <p>这是首页</p>
//                 <Foot></Foot>
//             </div>
//         )
//     }
// }

export default Home;