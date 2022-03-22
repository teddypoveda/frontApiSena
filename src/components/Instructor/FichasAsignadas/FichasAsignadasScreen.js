import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
//import { AddNewResource } from '../ui/AddNewResource';
import { useDispatch, useSelector } from 'react-redux';
import { eventLoadingFichaClases, eventTomarAsistencia } from '../../../actions/events';
import { ClasesItem } from './ClasesItem';
import { ResourceClasesModal } from '../Modal/ResourceClasesModal';
import { Button } from 'bootstrap';
import { uiOpenModal } from '../../../actions/ui';
import { Badge, Spinner } from 'react-bootstrap';


export const FichasAsignadasScreen = () => {
    const dispatch = useDispatch();
    const {clases, claseSelector} = useSelector(state => state.clase)
    const {idFichaSelect} = useSelector(state => state.ui)



    useEffect(() => {
        
        dispatch(eventTomarAsistencia(idFichaSelect));        
    
    }, [idFichaSelect]);

    
//765767

    return (
        <>
            <h2>Clases de la Ficha <Badge bg="light"text="dark">{idFichaSelect}</Badge></h2>{': '}
            <br />
            <div class="d-flex justify-content-center">
            <button class="btn btn-primary" type="button" onClick={()=>dispatch(uiOpenModal("new"))}>Asignar Nueva Clase</button>            
            </div>
            <br /><br />
            
            <div className="card-grid">

                    {(clases==='')?<Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>:clases.map( (clase) =>(
                         <ClasesItem
                            key={clase.id}
                            {...clase}
                        /> 
                    ))} 
                
            </div>
            <ResourceClasesModal /> 
        </>
    )
}
