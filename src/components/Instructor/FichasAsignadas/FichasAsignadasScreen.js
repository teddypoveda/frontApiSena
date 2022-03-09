import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
//import { AddNewResource } from '../ui/AddNewResource';
import { useDispatch, useSelector } from 'react-redux';
import { eventLoadingFichaClases } from '../../../actions/events';
import { ClasesItem } from './ClasesItem';
import { ResourceClasesModal } from '../Modal/ResourceClasesModal';
import { Button } from 'bootstrap';
import { uiOpenModal } from '../../../actions/ui';


export const FichasAsignadasScreen = () => {
    const dispatch = useDispatch();
    const {clases, claseSelector, fichaSelector} = useSelector(state => state.clase)



    useEffect(() => {
        
        dispatch(eventLoadingFichaClases());
    
    }, [dispatch]);

    return (
        <>
            <h2>Clases de la Ficha: </h2>
            <br />
            <div class="d-flex justify-content-center">
            <button class="btn btn-primary" type="button" onClick={()=>dispatch(uiOpenModal("new"))}>Asignar Nueva Clase</button>            
            </div>
            <br /><br />
            
            <div className="card-grid">
                
                    {clases.map( (clase) =>(
                         <ClasesItem
                            key={clase.id}
                            {...clase}
                        /> 
                    ))} 
                
            </div>
            <ResourceClasesModal/> 
        </>
    )
}
