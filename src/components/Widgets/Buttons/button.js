import React from 'react';
import style from './button.css'
import { Link } from 'react-router-dom'

const Button = (props) => {
    let template = null;

    switch (props.type) {
        case ('loadmore'):
            template = (
                <div className={style.blue_btn}
                    onClick={props.loadMore}
                >
                    {props.cta}
                </div>
            );
            break;
        case ('linkto'):
            template = (
                <Link to={props.linkTo} className={style.blue_btn}>
                    {props.cta}
                </Link>
            );
            break;
        default:
            template = null;
    }

    return template;

};

export default Button;