import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AddNewResource } from '../ui/AddNewResource';
import { eventLoadingCountry } from '../../actions/events';
import { useDispatch, useSelector } from 'react-redux';
import { CountryItem } from './CountryItem';
import { ResourceModalCountry } from '../modal/ResourceModalCountry';





export const CountryScreen = () => {
    const dispatch = useDispatch();
    const {countries} = useSelector(state => state.country)||{};
    

    
    useEffect(() => {
        
        dispatch(eventLoadingCountry());
    
    }, [dispatch]);

    return (
        <>
            <h2>Paises</h2>
            <AddNewResource  tipo="Country"/>
            <ResourceModalCountry/>
            <div className="card-grid">
                {
                    countries.map( (hot) =>(
                        <CountryItem
                            key={hot.id}
                            {...hot}
                        />
                    ))
                }
            </div>
                        
        </>
    )
}
