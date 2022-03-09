import React, { useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { eventAddNewUser, eventClearActiveEvent, eventDeleteProgram, eventAddNewProgram, eventUpdateProgram } from '../../../actions/events';
import { uiCloseModal, uiCloseModalDelete } from '../../../actions/ui';


export const ResourceProgramasModal = () => {

  const dispatch = useDispatch();
  const { modalOpen, modalNew, modalDelete,idSelector, resourceSelector, modalDetails } = useSelector(state => state.ui);
  const {  userSelector } = useSelector(state => state.user);

  
  const [FormValues, setFormValues] = useState(userSelector);
  const [errores, setErrores] = useState([]);
  const {id, nombre, descripcion, version, tipoProgramaId}  = FormValues||{};
  
  useEffect(() => {
    setFormValues({id:resourceSelector.id, nombre:resourceSelector.nombre, descripcion:resourceSelector.descripcion, version:resourceSelector.version, tipoProgramaId:resourceSelector.tipoProgramaId})
  }, [ resourceSelector, eventClearActiveEvent ]);

  
    
  const closeModal = () => {
    // TODO: cerrar el modal
    dispatch( uiCloseModal() );
    dispatch(uiCloseModalDelete());
    setFormValues( userSelector );
  }
      
    
  const handleChange=({target})=>{
    setFormValues({
      ...FormValues,
      [target.name]: target.value
  });
  }


  const handleSubmitForm= async(e)=>{
    e.preventDefault();
    setErrores([]);
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
        dispatch(await eventAddNewProgram(FormValues));
      
    }else{
      dispatch(await eventUpdateProgram(FormValues));
    }
    dispatch(eventClearActiveEvent());

  }

    
  return (
    
  <>
    <Modal  isOpen={modalOpen}
            centered={true}
            onRequestClose={ closeModal }>
      <ModalHeader style={{display: 'block'}}>
        <span  onClick={()=>handleSubmitForm()}> { (modalNew)?'Nuevo ':'Editar '} Programa</span>
      </ModalHeader>
      <ModalBody>
        <div className="form-group">
        {errores.length !== 0 && errores[0].message}
          <br />
          <br />
        {(modalNew)||<label htmlFor="id">id</label>}
        {(modalNew)||<input className="form-control" type="text" name="id" id="id" readOnly onChange={handleChange} value={id} disable/>}
          <br />
          <label htmlFor="nombres">Nombre</label>
          <input className="form-control" type="text" name="nombre" id="nombre" onChange={handleChange} value={nombre} />
          <br />
          <label htmlFor="nombre">Descripcion</label>
          <input className="form-control" type="text" name="descripcion" id="descripcion" onChange={handleChange} value={descripcion} />
          <br />
          <label htmlFor="nombre">Version</label>
          <input className="form-control" type="text" name="version" id="version" onChange={handleChange} value={version} />
          <br />
          <label htmlFor="numeroDocumento">Tipo de Programa</label>
          <input className="form-control" type="text" name="tipoProgramaId" id="tipoProgramaId" onChange={handleChange} value={tipoProgramaId}/>
          
        </div>
      </ModalBody>

      <ModalFooter>
        {modalNew?
          <button className="btn btn-success" onClick={handleSubmitForm}>
          Crear Programa 
        </button>: <button className="btn btn-primary"onClick={handleSubmitForm} >
          Actualizar Programa
        </button>
        }
        <button className="btn btn-danger"onClick={()=>closeModal()} >Cancelar</button>
      </ModalFooter>
    </Modal>

    {/* <Modal  isOpen={modalDetails}
            centered={true}
            onRequestClose={ closeModal }>
      <ModalHeader style={{display: 'block'}}>
        <span > Detalles de Usuario </span>
      </ModalHeader>
      <ModalBody>
        <div className="form-group">
          <br />
          <label  htmlFor="id">ID Usuario </label><br />
          <span class="text-primary"> {id}</span>
          <br />
          <label class="pt-4" htmlFor="nombres">Nombres</label><br />
          <span class="text-primary"> {nombres}</span>
          
          <br />
          <label class="pt-4" htmlFor="nombre">Apellidos</label><br />
          <span class="text-primary"> {apellidos}</span>  
          <br />
          <label class="pt-4" htmlFor="tipoDocumentoId">Tipo de Documento</label><br />
          <span class="text-primary"> {tipoDocumentoId}</span>

          <br />
          <label class="pt-4" htmlFor="numeroDocumento">Numero de Documento</label><br />
          <span class="text-primary"> {numeroDocumento}</span>          
          <br />
          <label class="pt-4" htmlFor="nombre">Email</label><br />
          <span class="text-primary"> {email}</span>
          <br />
          <label class="pt-4" for="rol">Rol</label><br />
          <span class="text-primary"> {roles}</span>   
          <br/>
          <CheckboxesRoles/>       
          <br/>
          
        </div> 
      </ModalBody>

      <ModalFooter>        
        <button className="btn btn-danger"onClick={()=>closeModal()} >Terminar</button>
      </ModalFooter>
    </Modal> */}

    <Modal isOpen={modalDelete}>
      <ModalBody>
          Estás seguro que deseas eliminar el programa "{nombre}" Versión: "{version}"
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-danger" onClick={()=>eventDeleteProgram(id)}>Sí</button>
        <button className="btn btn-secundary" onClick={()=>closeModal()}>No</button>
      </ModalFooter>
    </Modal>
  </>
)};