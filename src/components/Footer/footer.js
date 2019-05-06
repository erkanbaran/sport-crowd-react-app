import React from 'react';
import { Link } from 'react-router-dom';
import style from './footer.css';
import {CURRENT_YEAR} from '../../config';

const Footer = (props) => {


    return (
        <div className={style.footer}>
            <Link to='/' className={style.logo}>
                <img alt="logo" src="/images/ball-logo.png"></img>
            </Link>
            <div className={style.right}>
                @ {CURRENT_YEAR} All rights reserved by Erkan Baran
            </div>
        </div>
    );
};

export default Footer;