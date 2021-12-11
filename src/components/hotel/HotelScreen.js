import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AddNewResource } from '../ui/AddNewResource';
import { eventLoadingHotel } from '../../actions/events';
import { useDispatch, useSelector } from 'react-redux';
import { HotelItem } from './HotelItem';
import { ResourceModalHotel } from '../modal/ResourceModalHotel';

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';


export const HotelScreen = () => {
    const dispatch = useDispatch();
    const {hotels} = useSelector(state => state.hotel)

    
    useEffect(() => {
        
        dispatch(eventLoadingHotel());
    
    }, [dispatch]);



    //const hotels = JSON.parse(localStorage.getItem('Hotels'));

    return (
        <>
            <h2>Hotel</h2>
            <AddNewResource  tipo="hotel"/>
            <ResourceModalHotel/>
            <div className="card-grid">
                {
                    hotels.map( (hot) =>(
                        <HotelItem
                            key={hot.id}
                            {...hot}
                        />
                    ))
                }
            </div>
                        
        </>
    )
}
