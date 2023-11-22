import React, {FC, useMemo, useState} from "react";
import {Car, QueryCarsArgs} from "../../graphql/generated";
import CarMain from "../../components/CarMain";
import classes from "../../styles/styles.module.scss";
import {useDebounce} from 'use-debounce';
import CarsStore from "../../store/CarsStore";
import {observer} from "mobx-react-lite";
import upDown from "../../img/sort.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

import {useQuery} from 'react-query';
import axios from "axios";
import Message from "../../components/Message";

const Cars: FC = observer(() => {
    const [searchValue, setSearchValue] = useState<string>('')
    const [value] = useDebounce<QueryCarsArgs['search']>(searchValue, 500);

    const CARS_QUERY: string = `
        query cars($search: String) {
            cars(search: $search) {
              availability
              brand
              color
              description
              id
              img_src
              model
              model_year
              price
          }
    }
`;
    const [cars, setCars] = useState<Car[]>([])
    const [isLoading, setIsLoading] = useState<boolean>()
    const [error, setError] = useState<boolean>()

    useQuery(["cars", value], () => {
        return axios({
            url: process.env.REACT_APP_GRAPHQL_API_URL,
            method: "POST",
            data: {
                query: CARS_QUERY,
                variables: {
                    search: value,
                },
                useErrorBoundary: true,
                keepPreviousData: true
            },
        }).then(response => {
            setIsLoading(true)
            setCars(response.data.data.cars)
        }).catch(() => {
            setError(true)
        }).finally(() => setIsLoading(false))
    });


    // Сортировка
    const [selectedSort, setSelectedSort] = useState<string>('availability')
    const sortedHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSort(e.target.value)
        if (e.target.value === 'availability') {
            setCars([...cars].sort((a, b) => Number(b['availability']) - Number(a['availability'])))
        }
        if (e.target.value === 'brandA') {
            setCars([...cars].sort((a, b) => a['brand'].localeCompare(b['brand'])))
        }
        if (e.target.value === 'brandZ') {
            setCars([...cars].sort((a, b) => b['brand'].localeCompare(a['brand'])))
        }
        if (e.target.value === 'model_year_new') {
            setCars([...cars].sort((a, b) => b['model_year'] - a['model_year']))
        }
        if (e.target.value === 'model_year_old') {
            setCars([...cars].sort((a, b) => a['model_year'] - b['model_year']))
        }
        if (e.target.value === 'price_min') {
            setCars([...cars].sort((a, b) => Number(a['price'].replace("$", "")) - Number(b['price'].replace("$", ""))))
        }
        if (e.target.value === 'price_max') {
            setCars([...cars].sort((a, b) => Number(b['price'].replace("$", "")) - Number(a['price'].replace("$", ""))))
        }
    }

    useMemo(() => {
        if (!value) {
            setCars([...cars].sort((a, b) => Number(b['availability']) - Number(a['availability'])))
            setSelectedSort('availability')
        }
    }, [value])


    if (isLoading) return <Message message={'Loading...'} />;
    if (error) return <Message message={'Network Error'} />;

    return (
      <div className={classes.main}>
          <div className={classes.container}>

              <div className={classes.params}>

                  <div className={classes.sorted}>
                        <img src={upDown} alt={'sorted'}/>
                        <select onChange={sortedHandler} value={selectedSort}>
                            <option value={'availability'}>
                                Сначала в наличии
                            </option>
                            <option value={'brandA'}>
                                По имени (A-Z)
                            </option>
                            <option value={'brandZ'}>
                                По имени (Z-A)
                            </option>
                            <option value={'model_year_new'}>
                                Сначала новые
                            </option>
                            <option value={'model_year_old'}>
                                Сначала старше
                            </option>
                            <option value={'price_min'}>
                                Сначала дешевле
                            </option>
                            <option value={'price_max'}>
                                Сначала дороже
                            </option>
                        </select>
                  </div>

                  <div className={classes.search}>
                        <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} type='search' placeholder='Найти авто'/>
                        <button>
                            <FontAwesomeIcon icon={faMagnifyingGlass} className={classes.icon_search} />
                        </button>
                  </div>
              </div>
          </div>


          <div className={classes.main_cars}>
              <div className={classes.container}>
                  <div className={classes.cars}>
                      {cars.map(car =>
                          <CarMain car={car} key={car.id} favourites={CarsStore.carsFavourites}/>
                      )}
                  </div>
              </div>
          </div>

      </div>
  );
});

export default Cars;
