import React from 'react';
import Header from '@/components/common/header/Header';
import Foot from '@/components/common/foot/Foot';

const List = (props) => {
    return (
        <div className="list-container">
                <Header title="列表"></Header>
                <p>这是列表页</p>
                <Foot></Foot>
            </div>
    )
}
export default List;
// export default class List extends React.Component {
//     render () {
//         return (
//             <div className="list-container">
//                 <Header title="列表"></Header>
//                 <p>这是列表页</p>
//                 <Foot></Foot>
//             </div>
//         )
//     }
// }