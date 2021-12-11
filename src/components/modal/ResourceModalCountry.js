import React, { useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { eventAddNewCountry, eventUpdateCountry, eventDeleteCountry } from '../../actions/events';
import { uiCloseModal, uiCloseModalDelete } from '../../actions/ui';




export const ResourceModalCountry = () => {

  const dispatch = useDispatch();
  const { modalOpenCountry,countrySelector, modalNew, modalDelete,idSelector } = useSelector(state => state.ui);
  const { countries } = useSelector( state => state.country );
  
  const [FormValues, setFormValues] = useState(countries);
  const { id, name, shortName}  = FormValues||{};
  console.log(countrySelector);
  useEffect(() => {
    setFormValues(FormValues);
    setFormValues( countrySelector );

  }, [ countrySelector]);

  
    
  const closeModal = () => {
    // TODO: cerrar el modal
    dispatch( uiCloseModal() );
    dispatch(uiCloseModalDelete());
    setFormValues( countries );
  }
      
    
  const handleChange=({target})=>{
    setFormValues({
      ...FormValues,
      [target.name]: target.value
  });
  }
  const countryDelete = ()=>{
    dispatch(eventDeleteCountry(idSelector));
  }

  const handleSubmitForm= async(e)=>{
    e.preventDefault();
     if(modalNew){
      delete FormValues.id; 
      dispatch(await eventAddNewCountry(FormValues));
      
    }else{
      dispatch(await eventUpdateCountry(FormValues));
    }

  }

    
  return (
    
  <>
    <Modal  isOpen={modalOpenCountry}
            centered={true}
            onRequestClose={ closeModal }>
      <ModalHeader style={{display: 'block'}}>
        <span  onClick={()=>handleSubmitForm()}> { (modalNew)?'Nuevo evento':'Editar evento'}</span>
      </ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label htmlFor="nombre">id</label>
          <input className="form-control" type="text" name="id" id="id" readOnly onChange={handleChange} value={id}/>
          <br />
          <label htmlFor="nombre">Nombre</label>
          <input className="form-control" type="text" name="name" id="name" onChange={handleChange} value={name}/>
          <br />
          <label htmlFor="nombre">Indicativo</label>
          <input className="form-control" type="text" name="shortName" id="shortName" onChange={handleChange} value={shortName}/>
          <br />
        </div>
      </ModalBody>

      <ModalFooter>
        {modalNew?
          <button className="btn btn-success" onClick={handleSubmitForm}>
          Insertar
        </button>: <button className="btn btn-primary"onClick={handleSubmitForm} >
          Actualizar
        </button>
        }
        <button className="btn btn-danger"onClick={()=>closeModal()} >Cancelar</button>
      </ModalFooter>
    </Modal>

    <Modal isOpen={modalDelete}>
      <ModalBody>
          Estás seguro que deseas eliminar el país {name}
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-danger" onClick={()=>countryDelete()}>Sí</button>
        <button className="btn btn-secundary" onClick={()=>closeModal()}>No</button>
      </ModalFooter>
    </Modal>
  </>
  )
}
