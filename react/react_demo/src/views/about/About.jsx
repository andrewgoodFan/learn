import React from 'react';
import Header from '@/components/common/header/Header';
import Foot from '@/components/common/foot/Foot';
const About = (props) => {
    return (
        <div className="abount-container">
            <Header title="关于"></Header>
            <p>这是about页面</p>
            <Foot></Foot>
        </div>
    )
}

// class About extends React.Component {
//     render () {
//         return (
//             <div className="abount-container">
//                 <p>这是about页面</p>
//             </div>
//         )
//     }
// }

export default About;