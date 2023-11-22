import React from 'react';
import logo from '../img/logo.png'
import classes from "../styles/styles.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faHeart } from '@fortawesome/free-solid-svg-icons'
import {useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate()
    return (
        <header>
            <div className={classes.container}>
                <div className={classes.header}>

                    <div className={classes.head_left}>
                        <img onClick={() => navigate('/')} src={logo} alt={'logo'}/>
                            <button>
                                <FontAwesomeIcon className={classes.icon} icon={faBars} /> Каталог
                            </button>
                    </div>

                    <div className={classes.head_center}>
                        <span>Москва, Волгоградский пр-кт, 43, стр 1</span>
                        <span>+7 800 555 35 35</span>
                    </div>

                    <div className={classes.head_right}>
                        <button onClick={() => navigate('/favourites')}> <FontAwesomeIcon icon={faHeart} className={classes.icon_heart} /> Избранное</button>
                    </div>

                </div>
            </div>
        </header>
    );
};

export default Header;