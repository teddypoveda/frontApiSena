import React, { useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { eventAddNewClase, eventClearActiveEvent, eventDeleteClase, eventUpdateClase } from '../../../actions/events';
import { uiCloseModal, uiCloseModalDelete } from '../../../actions/ui';



export const ResourceClasesModal = () => {

  const dispatch = useDispatch();
  const { modalOpen, modalNew, modalDelete,idSelector, resourceSelector, modalDetails } = useSelector(state => state.ui);
  const {  claseSelector } = useSelector(state => state.clase);

  
  const [FormValues, setFormValues] = useState(claseSelector);
  const [errores, setErrores] = useState([]);
  const {id, fechaHora, aula, nombre, fichaId, apiUserId}  = FormValues||{};
  
  useEffect(() => {
    setFormValues({id:resourceSelector.id, fechaHora:resourceSelector.fechaHora, aula:resourceSelector.aula, nombre:resourceSelector.nombre, fichaId:resourceSelector.fichaId, apiUserId:resourceSelector.apiUserId})
  }, [ resourceSelector,eventClearActiveEvent ]);
  
    
  const closeModal = () => {
    // TODO: cerrar el modal
    dispatch( uiCloseModal() );
    dispatch(uiCloseModalDelete());
    setFormValues( claseSelector );
  }
      
    
  const handleChange=({target})=>{
    setFormValues({
      ...FormValues,
      [target.name]: target.value
  });
  }


  const handleSubmitForm= async(e)=>{
    e.preventDefault();
    Object.keys(FormValues).map(e=>{
      if (e==="id") {
        return;
      }
      FormValues[e]==="" && setErrores([{campo:e,message:"El campo "+e+" es requerido"}])}
    );   

      if(errores.length !== 0){
        return;
      }
     if(modalNew){
      delete FormValues.id; 
        dispatch(await eventAddNewClase(FormValues));
      
    }else{
      dispatch(await eventUpdateClase(FormValues));
    }
    dispatch(eventClearActiveEvent());

  }

    
  return (
    
  <>
    <Modal  isOpen={modalOpen}
            centered={true}
            onRequestClose={ closeModal }>
      <ModalHeader style={{display: 'block'}}>
        <span  onClick={()=>handleSubmitForm()}> { (modalNew)?'Nueva ':'Editar '} Clase</span>
      </ModalHeader>
      <ModalBody>
        <div className="form-group">
        {errores.length !== 0 && errores[0].message}
          <br />
          <br />
        {(modalNew)||<label htmlFor="id">id</label>}
        {(modalNew)||<input className="form-control" type="text" name="id" id="id" readOnly onChange={handleChange} value={id} disable/>}
          <br />
          <label htmlFor="fechaHora">Fecha y Hora de la Clae</label>
          <input className="form-control" type="datetime-local" name="fechaHora" id="fechaHora" onChange={handleChange} value={fechaHora} />
          <br />
          <label htmlFor="aula">Fecha Fin de Formación</label>
          <input className="form-control" type="text" name="aula" id="aula" onChange={handleChange} value={aula} />
          <br />
          <label htmlFor="nombre">Fecha de Incio Practicas</label>
          <input className="form-control" type="text" name="nombre" id="nombre" onChange={handleChange} value={nombre}/>
          <br />
          <label htmlFor="fichaId">Programa</label>
          <input className="form-control" type="text" name="fichaId" id="fichaId" onChange={handleChange} value={fichaId}/>
          
        </div>
      </ModalBody>

      <ModalFooter>
        {modalNew?
          <button className="btn btn-success" onClick={handleSubmitForm}>
          Crear Clases 
        </button>: <button className="btn btn-primary"onClick={handleSubmitForm} >
          Actualizar Clase
        </button>
        }
        <button className="btn btn-danger"onClick={()=>closeModal()} >Cancelar</button>
      </ModalFooter>
    </Modal>
{/* 
    <Modal  isOpen={modalDetails}
            centered={true}
            onRequestClose={ closeModal }>
      <ModalHeader style={{display: 'block'}}>
        <span > Detalles de Usuario </span>
      </ModalHeader>
      <ModalBody>
        <div className="form-group">
          <br />
          <label  htmlFor="id">ID Clase </label><br />
          <span class="text-primary"> {id}</span>
          <br />
          <label class="pt-4" htmlFor="fechaInicio">Fecha Inicio de Formación </label><br />
          <span class="text-primary"> {fechaInicio}</span>
          
          <br />
          <label class="pt-4" htmlFor="fechaFin">Fecha Fin de Formación</label><br />
          <span class="text-primary"> {fechaFin}</span>  
          <br />
          <label class="pt-4" htmlFor="fechaInicioPracticas">Fecha Inicio de Practicas</label><br />
          <span class="text-primary"> {fechaInicioPracticas}</span>

          <br />
          <label class="pt-4" htmlFor="programaId">Programa</label><br />
          <span class="text-primary"> {programaId}</span>          
          <br />

          
        </div> 
      </ModalBody>

      <ModalFooter>        
        <button className="btn btn-danger"onClick={()=>closeModal()} >Terminar</button>
      </ModalFooter>
    </Modal> */}

    <Modal isOpen={modalDelete}>
      <ModalBody>
          Estás seguro que deseas eliminar la Clase "{nombre}" id:{id}
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-danger" onClick={()=>eventDeleteClase(id)}>Sí</button>
        <button className="btn btn-secundary" onClick={()=>closeModal()}>No</button>
      </ModalFooter>
    </Modal>
  </>
)};