import React, {FC} from 'react';
import {Car} from "../graphql/generated";
import classes from "../styles/styles.module.scss";
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {addToFavorites, removeToFavourites} from "../hocks/hocks";

interface CarListProps {
    car: Car,
    favourites: Car[]
}

const CarMain: FC<CarListProps> = ({car, favourites}) => {
    return (
        <div className={classes.car}>
            <div className={classes.car_img}>
                {!car.availability ? <div className={classes.out_of_stock}><p>Нет в наличии</p></div> : ''}
                <img
                    style={!car.availability ? {opacity: 0.3, position: 'absolute', top: 0, left: 0, zIndex: -1} : {}}
                    src={process.env.REACT_APP_API_URL+car?.img_src ?? undefined}
                    alt={`${car.brand} ${car.model}`}
                />
            </div>
            <h2>
                {car.brand} {car.model}
            </h2>
            <div className={classes.quantity}>
                Год: {car.model_year} Цвет: {car.color}
            </div>
            <div className={classes.price}>
                от {car.price}
            </div>

            <div className={classes.flex}>
                <button
                    className={classes.btn_buy}
                    style={!car.availability ? {background: '#D9D9D9', cursor: 'default'} : {}}
                    disabled={!car.availability}
                >
                    Купить
                </button>
                {favourites.filter(m => m.id === car.id).length !== 0
                    ?
                    <FontAwesomeIcon
                        className={classes.icon_save}
                        icon={["fas", "heart"]}
                        onClick={() => removeToFavourites(car.id)}
                    />
                    :
                    <FontAwesomeIcon
                        className={classes.icon_save}
                        style={!car.availability ? {color: '#D9D9D9', cursor: 'default'} : {}}
                        icon={faHeart}
                        onClick={() => addToFavorites(car)}
                    />
                }
            </div>
        </div>
    );
};

export default CarMain;