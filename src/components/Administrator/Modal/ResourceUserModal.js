import React, { useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { eventAddNewProgram, eventAddNewUser, eventClearActiveEvent, eventDeleteUser, eventUpdateUser } from '../../../actions/events';
import { uiCloseModal, uiCloseModalDelete } from '../../../actions/ui';
import { CheckboxesRoles } from '../user/CheckBoxesRoles';


export const ResourceUserModal = () => {

  const dispatch = useDispatch();
  const { modalOpen, modalNew, modalDelete,idSelector, resourceSelector, modalDetails } = useSelector(state => state.ui);
  const {  userSelector } = useSelector(state => state.user);

  
  const [FormValues, setFormValues] = useState(userSelector);
  const [errores, setErrores] = useState([]);
  const {id, nombres, apellidos, tipoDocumentoId, numeroDocumento, email, password, roles}  = FormValues||{};
  
  useEffect(() => {
    setFormValues({id:resourceSelector.id, nombres:resourceSelector.nombres, apellidos:resourceSelector.apellidos, tipoDocumentoId:resourceSelector.tipoDocumentoId, numeroDocumento:resourceSelector.numeroDocumento, email:resourceSelector.email, password:resourceSelector.password, roles:resourceSelector.roles})
  }, [ resourceSelector ]);

  
    
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
        dispatch(await eventAddNewUser(FormValues));
      
    }else{
      dispatch(await eventUpdateUser(FormValues));
    }
    dispatch(eventClearActiveEvent());

  }

    
  return (
    
  <>
    <Modal  isOpen={modalOpen}
            centered={true}
            onRequestClose={ closeModal }>
      <ModalHeader style={{display: 'block'}}>
        <span  onClick={()=>handleSubmitForm()}> { (modalNew)?'Nuevo ':'Editar '} usuario</span>
      </ModalHeader>
      <ModalBody>
        <div className="form-group">
        {errores.length !== 0 && errores[0].message}
          <br />
          <br />
        {(modalNew)||<label htmlFor="id">id</label>}
        {(modalNew)||<input className="form-control" type="text" name="id" id="id" readOnly onChange={handleChange} value={id} disable/>}
          <br />
          <label htmlFor="nombres">Nombres</label>
          <input className="form-control" type="text" name="nombres" id="nombres" onChange={handleChange} value={nombres} />
          <br />
          <label htmlFor="nombre">Apellidos</label>
          <input className="form-control" type="text" name="apellidos" id="apellidos" onChange={handleChange} value={apellidos} />
          <br />
          <label htmlFor="tipoDocumentoId">Tipo de Documento</label>
          <select className='form-control' name="tipoDocumentoId" id='tipoDocumentoId' onChange={handleChange} value={tipoDocumentoId} >
            <option value="0">Seleccione el Tipo de Documento</option>
            <option value="1">Cédula de ciudadania</option>
            <option value="2">Tarjeta de identidad</option>
            <option value="3">Pasporte</option>
          </select>
          <br />
          <label htmlFor="numeroDocumento">Numero de Documento</label>
          <input className="form-control" type="text" name="numeroDocumento" id="numeroDocumento" onChange={handleChange} value={numeroDocumento}/>
          <br />
          <label htmlFor="nombre">Email</label>
          <input className="form-control" type="text" name="email" id="email" onChange={handleChange} value={email}/>
          <br />
          {(!modalNew)||<label htmlFor="nombre">Constraseña</label>}
          {(!modalNew)||<input className="form-control" type="password" name="password" id="password" onChange={handleChange} value={password}/>}
          <br />
          <label for="rol">Rol</label>
          {(modalNew)?<select  className="form-control" name="roles" id="roles" onChange={handleChange} value={roles}>
            
            <option  value="instructor">Seleccione el Rol</option>
            <option  value="administrador">Administrador</option>
            <option  value="instructor">Instructor</option>
            <option  value="aprendiz">Aprendiz</option>
          </select>:<input className="form-control" type="input" onChange={handleChange}  value={resourceSelector.roles} disabled/>}
        </div>
      </ModalBody>

      <ModalFooter>
        {modalNew?
          <button className="btn btn-success" onClick={handleSubmitForm}>
          Crear Usuario 
        </button>: <button className="btn btn-primary"onClick={handleSubmitForm} >
          Actualizar Usuario
        </button>
        }
        <button className="btn btn-danger"onClick={()=>closeModal()} >Cancelar</button>
      </ModalFooter>
    </Modal>

    <Modal  isOpen={modalDetails}
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
    </Modal>

    <Modal isOpen={modalDelete}>
      <ModalBody>
          Estás seguro que deseas eliminar el usuario "{nombres} {apellidos}"
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-danger" onClick={()=>eventDeleteUser(id)}>Sí</button>
        <button className="btn btn-secundary" onClick={()=>closeModal()}>No</button>
      </ModalFooter>
    </Modal>
  </>
)};