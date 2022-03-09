import React, { useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { eventAddNewFicha, eventClearActiveEvent, eventDeleteFicha, eventUpdateFicha } from '../../../actions/events';
import { uiCloseModal, uiCloseModalDelete } from '../../../actions/ui';



export const ResourceFichasModal = () => {

  const dispatch = useDispatch();
  const { modalOpen, modalNew, modalDelete,idSelector, resourceSelector, modalDetails } = useSelector(state => state.ui);
  const {  fichaSelector } = useSelector(state => state.ficha);

  
  const [FormValues, setFormValues] = useState(fichaSelector);
  const [errores, setErrores] = useState([]);
  const {id, fechaInicio, fechaFin, fechaInicioPracticas, programaId}  = FormValues||{};
  
  useEffect(() => {
    setFormValues({id:resourceSelector.id, fechaInicio:resourceSelector.fechaInicio, fechaFin:resourceSelector.fechaFin, fechaInicioPracticas:resourceSelector.fechaInicioPracticas, programaId:resourceSelector.programaId})
  }, [ resourceSelector,eventClearActiveEvent ]);

  
    
  const closeModal = () => {
    // TODO: cerrar el modal
    dispatch( uiCloseModal() );
    dispatch(uiCloseModalDelete());
    setFormValues( fichaSelector );
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
        dispatch(await eventAddNewFicha(FormValues));
      
    }else{
      dispatch(await eventUpdateFicha(FormValues));
    }
    dispatch(eventClearActiveEvent());

  }

    
  return (
    
  <>
    <Modal  isOpen={modalOpen}
            centered={true}
            onRequestClose={ closeModal }>
      <ModalHeader style={{display: 'block'}}>
        <span  onClick={()=>handleSubmitForm()}> { (modalNew)?'Nuevo ':'Editar '} Clase</span>
      </ModalHeader>
      <ModalBody>
        <div className="form-group">
        {errores.length !== 0 && errores[0].message}
          <br />
          <br />
        {(modalNew)||<label htmlFor="id">id</label>}
        {(modalNew)||<input className="form-control" type="text" name="id" id="id" readOnly onChange={handleChange} value={id} disable/>}
          <br />
          <label htmlFor="fechaInicio">Fecha Fin de Formación</label>
          <input className="form-control" type="datetime-local" name="fechaInicio" id="fechaInicio" onChange={handleChange} value={fechaInicio} />
          <br />
          <label htmlFor="nombre">Fecha Fin de Formación</label>
          <input className="form-control" type="datetime-local" name="fechaFin" id="fechaFin" onChange={handleChange} value={fechaFin} />
          <br />
          <label htmlFor="fechaInicioPracticas">Fecha de Incio Practicas</label>
          <input className="form-control" type="datetime-local" name="fechaInicioPracticas" id="fechaInicioPracticas" onChange={handleChange} value={fechaInicioPracticas}/>
          <br />
          <label htmlFor="programaId">Programa</label>
          <input className="form-control" type="text" name="programaId" id="programaId" onChange={handleChange} value={programaId}/>
          
        </div>
      </ModalBody>

      <ModalFooter>
        {modalNew?
          <button className="btn btn-success" onClick={handleSubmitForm}>
          Crear Fichas 
        </button>: <button className="btn btn-primary"onClick={handleSubmitForm} >
          Actualizar Ficha
        </button>
        }
        <button className="btn btn-danger"onClick={()=>closeModal()} >Cancelar</button>
      </ModalFooter>
    </Modal>

    <Modal  isOpen={modalDetails}
            centered={true}
            onRequestClose={ closeModal }>
      <ModalHeader style={{display: 'block'}}>
        <span > Detalles de la Ficha </span>
      </ModalHeader>
      <ModalBody>
        <div className="form-group">
          <br />
          <label  htmlFor="id">ID Ficha </label><br />
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
    </Modal>

    <Modal isOpen={modalDelete}>
      <ModalBody>
          Estás seguro que deseas eliminar la Ficha "{id}"
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-danger" onClick={()=>eventDeleteFicha(id)}>Sí</button>
        <button className="btn btn-secundary" onClick={()=>closeModal()}>No</button>
      </ModalFooter>
    </Modal>
  </>
)};