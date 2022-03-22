import React, { useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Form, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { eventAddNewClase, eventClearActiveEvent, eventDeleteClase, eventUpdateClase } from '../../../actions/events';
import { uiCloseModal } from '../../../actions/ui';

export const ResourceClasesModal = (props) => {

  const dispatch = useDispatch();
  const { modalTomarAsistencia } = useSelector(state => state.ui);
  const {  user } = useSelector(state => state.user);
  const [FormValues, setFormValues] = useState(user)


  
  
  useEffect(() => {
  
  }, [ ]);
  
    
  const closeModal = () => {
    // TODO: cerrar el modal
    dispatch( uiCloseModal() );
  }
      
    
  const handleChange=({target})=>{
    setFormValues({
      ...FormValues,
      [target.name]: target.value
  });
  }


  const handleSubmitForm= async(e)=>{
    e.preventDefault();
    console.log(e)
    dispatch(eventClearActiveEvent());

  }

    
  return (
    
  <>
    <Modal  isOpen={modalTomarAsistencia}
            centered={true}
            onRequestClose={ closeModal }>
      <ModalHeader style={{display: 'block'}}>
        <span  /* onClick={()=>handleSubmitForm()} */> Tomar Asistencia de la Clase: {props.nombreClase}</span>
      </ModalHeader>
      <ModalBody>
        <Form>
        {user.map(u=><p>{u.nombres} {u.apellidos} Numero de {u.tipoDocumentoId===1&&"Cédula"} {u.numeroDocumento} <input class="form-check-input" type="checkbox" role="switch" id={u.id} />
  <label class="form-check-label" for="flexSwitchCheckChecked">Asiste</label> </p>
          )}
        </Form>
       
          
        
        
      </ModalBody>

      <ModalFooter>
      <button className="btn btn-primary"onClick={handleSubmitForm} >
          Tomar Asistencia
        </button>
        
        <button className="btn btn-danger"onClick={()=>closeModal()} >Cancelar</button>
      </ModalFooter>
    </Modal>

  </>
)};