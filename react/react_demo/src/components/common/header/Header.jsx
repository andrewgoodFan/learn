import React from 'react';
import './header.scss';
const Header = (props) => {
    return (
        <div className="header-container">
            {props.showBack ? <a href="">&lt;</a> : ''}
            <p>{props.title ? props.title : document.title}</p>
        </div>
    )
}

export default Header;