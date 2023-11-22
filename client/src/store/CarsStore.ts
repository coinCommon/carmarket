import {makeAutoObservable} from "mobx";
import {Car, QueryCarArgs} from "../graphql/generated";


// export const addDataCars = (car: any): Car[] => car;
export const addFavourites = (carsFavourites: Car[], car: any): Car[] => [
    ...carsFavourites, car,
];
export const removeFavourites = (carsFavourites: Car[], id: QueryCarArgs['id']): Car[] =>
    carsFavourites.filter((m) => m.id !== id);



class CarsStore {
    // dataCars: Car[] = []
    // newDataCars: object = {}

    carsFavourites: Car[] = []
    newCarsFavourites: object = {}
    newCarsFavouritesId: number = 0
    constructor() {
        makeAutoObservable(this)
    }
    // addDataCars() {
    //     this.dataCars = addDataCars(this.newDataCars)
    //     this.newDataCars = {}
    // }
    addFavourites() {
        this.carsFavourites = addFavourites(this.carsFavourites, this.newCarsFavourites)
        this.newCarsFavourites = {}
    }
    removeFavourites() {
        this.carsFavourites = removeFavourites(this.carsFavourites, this.newCarsFavouritesId)
        this.newCarsFavouritesId = 0
    }

}

export default new CarsStore()