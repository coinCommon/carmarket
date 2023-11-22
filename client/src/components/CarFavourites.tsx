import React, {FC} from 'react';
import classes from "../styles/styles.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {Car} from "../graphql/generated";
import {removeToFavourites} from "../hocks/hocks";


interface CarListProps {
    car: Car
}

const CarFavourites: FC<CarListProps> = ({car}) => {

    return (
        <div className={classes.car_favourites_card}>

            <div className={classes.car_img}>
                <img
                    src={process.env.REACT_APP_API_URL+car?.img_src ?? undefined}
                    alt={`${car.brand} ${car.model}`}
                />
            </div>

            <div className={classes.description_car}>
                <h2>
                    {car.brand} {car.model}
                </h2>
                <div className={classes.description}>
                    {car.description}
                </div>
                <div className={classes.quantity}>
                    <span>
                        Год: {car.model_year}
                    </span>
                    <span>
                        Цвет: {car.color}
                    </span>
                </div>
                <div className={classes.price}>
                    от {car.price}
                </div>
                <div className={classes.flex}>
                    <button className={classes.btn_buy}>Выбрать комплектацию</button>
                    <FontAwesomeIcon
                        className={classes.icon_save}
                        icon={faTrashCan}
                        onClick={() => removeToFavourites(car.id)}
                    />
                </div>
            </div>
        </div>
    );
};

export default CarFavourites;