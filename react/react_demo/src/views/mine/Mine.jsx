import React from 'react';
import Header from '@/components/common/header/Header';
import Foot from '@/components/common/foot/Foot';
const Mine = (props) => {
    return (
        <div className="mine-container">
            <Header title="我的"></Header>
            <p>这是我的页面</p>
            <Foot></Foot>
        </div>
    )
}
// class Mine extends React.Component {
//     render () {
//         return (
//             <div className="mine-container">
//                 <p>这是我的页面</p>
//             </div>
//         )
//     }
// }

export default Mine;