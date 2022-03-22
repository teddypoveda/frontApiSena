import React, { useEffect, useState } from 'react'
import { FormControl, InputGroup, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Badge } from 'reactstrap';
import { eventAddFichaUser, eventLoadingFichasUser } from '../../../actions/events';



export const AsociarFicha = ({idUser}) => {
    const dispatch = useDispatch();
    const {  userFichas } = useSelector(state => state.userFichas);
    const {  resourceSelector } = useSelector(state => state.ui);
    const [FormValues, setFormValues] = useState({});
    const [error, setError] = useState()

    const handleChange=({target})=>{
        setFormValues({
          ...FormValues,
          [target.name]: target.value
      });
    }
    const handleSubmitForm= async(e)=>{
        e.preventDefault();
        const regex = /^[0-9]*$/;
        const onlyNumbers = regex.test(FormValues.fichaId);
        setError(onlyNumbers)
        if(!error){return;}
        dispatch(eventAddFichaUser(idUser, FormValues.fichaId));
        //dispatch(eventClearActiveEvent());
    
      }


    useEffect(() => {
        dispatch(eventLoadingFichasUser(resourceSelector.id))
    }, [])
    

    
  return (
    <>
    <h5>Fichas Asociadas</h5>
    {userFichas.map(e=><div className='border border-secondary mt-1 mb-2 p-1'><p><Badge pill bg="primary">Ficha:</Badge> {e.fichaId} <Badge pill bg="primary">Estado:</Badge>  
    <select class="form-select form-select-sm form-select-sm w-auto d-inline ml-2 pl-2" >
        <option selected>Estado</option>
        <option value="1">Aprendiz en Formación</option>
        <option value="2">Certificado</option>
        <option value="3">Instrctor en Formación</option>
        <option value="4">Instrctor Fuera de Formación</option>
    </select>
    <Button size='sm' variant="outline-secondary" id="button-addon2" onClick={handleSubmitForm}>
      Cambiar Estado 
    </Button></p></div>)}
    <InputGroup className="mb-3" onChange={handleChange} >
    
    <FormControl 
      placeholder="Ingresa un numero de Ficha"
      aria-label="Recipient's username"
      aria-describedby="basic-addon2"
      name="fichaId"
    />
    
    <Button variant="outline-secondary" id="button-addon2" onClick={handleSubmitForm}>
      Agregar 
    </Button>
  </InputGroup>
  {error&&"Ingrese solo Numeros para agregar el Usuario a la ficha"}<br/>
    </>
  )
}
