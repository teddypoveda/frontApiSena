import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
//import { AddNewResource } from '../ui/AddNewResource';
import { useDispatch, useSelector } from 'react-redux';
import { eventLoadingInasistencias } from '../../actions/events';
import { InasistenciasItem } from './InasistenciasItem';


export const InasistenciasScreen = () => {
    const dispatch = useDispatch();
    const {inasistencias} = useSelector(state => state.asistencias)


    useEffect(() => {
        
        dispatch(eventLoadingInasistencias());
    
    }, [dispatch]);

    return (
        <>
            <h2>Mis Inasistencias: </h2>
            <br />
            
            <div className="card-grid">
                
                    {inasistencias.map( (e) =>(
                         <InasistenciasItem
                            key={e.id}
                            {...e}
                        /> 
                    ))}
                
            </div>
        </>
    )
}
