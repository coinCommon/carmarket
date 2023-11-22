import CarsStore from "../store/CarsStore";
import {Car} from "../graphql/generated";


export const addToFavorites = (car: Car) => {
    let check = true
    CarsStore.carsFavourites.filter(m => m.id === car.id).map(f => !f ? check = f : check = false)
    if (check && car.availability) {
        CarsStore.newCarsFavourites = car
        CarsStore.addFavourites()
    }
}
export const removeToFavourites = (id: number) => {
    CarsStore.newCarsFavouritesId = id
    CarsStore.removeFavourites()
}