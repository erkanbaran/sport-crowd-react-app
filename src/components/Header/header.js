import React from 'react';
import { Link } from 'react-router-dom';
import style from './header.css';
import FontAwesome from 'react-fontawesome';
import SideNav from './SideNav/sideNav';

const Header = (props) => {

    const logo = () => (
        <Link to="/" className={style.logo}>
            <img alt="logo" src="/images/ball-logo.png"></img>
        </Link>
    )

    const navBars = () => (
        <div className={style.bars}>
            <FontAwesome name="bars"
                onClick={props.onOpenNav}
                style={{
                    padding: '10px',
                    cursor: 'pointer'
                }} />
        </div>
    )

    return (
        <header className={style.header}>
            <SideNav {...props}></SideNav>

            <div className={style.headerOpt}>
                {navBars()}
                {logo()}
            </div>
        </header>
    );
};

export default Header;