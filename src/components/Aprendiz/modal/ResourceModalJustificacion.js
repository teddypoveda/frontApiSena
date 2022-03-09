import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { eventAddNewClase, eventClearActiveEvent, eventUpdateClase } from '../../../actions/events';
import { uiCloseModal, uiCloseModalDelete } from '../../../actions/ui';



export const ResourceModalJustificacion = () => {

  const dispatch = useDispatch();
  const { modalJustificacion, resourceSelector} = useSelector(state => state.ui);


  
  
    
  const closeModal = () => {
    // TODO: cerrar el modal
    dispatch( uiCloseModal() );
    dispatch(uiCloseModalDelete());
  }
      
    
  const handleChange=({target})=>{
    
  }


  const handleSubmitForm= async(e)=>{
    e.preventDefault();

    //dispatch(await eventAddNewClase(FormValues));
    dispatch(eventClearActiveEvent());

  }
  
  return (
    <Modal  isOpen={modalJustificacion}
            centered={true}
            onRequestClose={ closeModal }>
      <ModalHeader style={{display: 'block'}}>
        <span  onClick={()=>handleSubmitForm()}> Justificar</span>
      </ModalHeader>
      <ModalBody>
        <div className="form-group">
        <div class="mb-3">
            <label for="formFile" class="form-label">Adjunta un archivo valido:</label>
            <input class="form-control" type="file" id="formFile"/>
        </div>
          {/* <label htmlFor="fichaId">Programa</label>
          <input className="form-control" type="text" name="fichaId" id="fichaId" onChange={handleChange} value={fichaId}/> 
          */}
          
        </div>
      </ModalBody>

      <ModalFooter>
        <button className="btn btn-success" onClick={handleSubmitForm}>
          Enviar Jutificación 
        </button>
        <button className="btn btn-danger"onClick={()=>closeModal()} >Cancelar</button>
      </ModalFooter>
    </Modal>  
  )
}