import React, {FC} from "react";
import classes from "../../styles/styles.module.scss";
import CarFavourites from "../../components/CarFavourites";
import CarsStore from "../../store/CarsStore";
import {observer} from "mobx-react-lite";

const CarsFavourites: FC = observer(() => {

    return (
        <div className={classes.favourites}>
            <div className={classes.container}>
                <div className={classes.favourites_title}>
                    <h1>Избранные товары — {CarsStore.carsFavourites.length} позиций</h1>
                </div>
            </div>

            <div className={classes.favourites_cars}>
                <div className={classes.container}>
                    <div className={classes.cars}>
                        {CarsStore.carsFavourites.map(car =>
                            <CarFavourites car={car} key={car.id}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default CarsFavourites;