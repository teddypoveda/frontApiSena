import React,{useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { eventAddNewHotel, eventDeleteHotel,eventClearActiveEvent,eventUpdateHotel } from '../../actions/events';
import { uiCloseModal, uiCloseModalDelete } from '../../actions/ui';


export const ResourceModalHotel = () => {

  const dispatch = useDispatch();
  const { modalOpenHotel, modalDelete, modalNew, idSelector,hotelSelector } = useSelector(state => state.ui);
  const {hotels} = useSelector(state => state.hotel)

  const [formValues, setFormValues] = useState(hotels);
  const {id, name,address,rating,countryId} = formValues;
  
  useEffect(() => {

      setFormValues( hotels );
      setFormValues( hotelSelector );

}, [ setFormValues, modalOpenHotel, hotels,hotelSelector])
    
  
  const closeModal = () => {
    // TODO: cerrar el modal
    dispatch( uiCloseModal() );
    dispatch( eventClearActiveEvent() );
    //setFormValues( initialState );
}
  const modalDeleteCancel = () => {

    dispatch( uiCloseModalDelete() );

  }
  const hotelDelete = ()=>{
    dispatch(eventDeleteHotel(idSelector));
  }
      const handleChange=({target})=>{
        setFormValues({
          ...formValues,
          [target.name]: target.value
      });
      }

      const handleSubmitForm= async(e)=>{
        e.preventDefault();
        dispatch( (modalNew)?await eventAddNewHotel({...formValues}):await eventUpdateHotel({...formValues}));
      }
   
        
      return (
        
        < >

            <Modal  isOpen={modalOpenHotel}
                    centered={true}
                    onRequestClose={ closeModal }>
                    <ModalHeader style={{display: 'block'}}>
                      <span  onClick={()=>handleSubmitForm()}>nuevo</span>
                    </ModalHeader>
                    <ModalBody>
                      <div className="form-group">
                        <label htmlFor="nombre">id</label>
                        <input className="form-control" type="text" name="id" id="id" readOnly onChange={handleChange} value={id}/>
                        <br />
                        <label htmlFor="nombre">Nombre</label>
                        <input className="form-control" type="text" name="name" id="name" onChange={handleChange} value={name}/>
                        <br />
                        <label htmlFor="nombre">Dirección</label>
                        <input className="form-control" type="text" name="address" id="address" onChange={handleChange} value={address}/>
                        <br />
                        <label htmlFor="nombre">Estrellas</label>
                        <input className="form-control" type="text" name="rating" id="rating" onChange={handleChange} value={rating}/>
                        <br />
                        <label htmlFor="nombre">countryId</label>
                        <input className="form-control" type="text" name="countryId" id="countryId" onChange={handleChange} value={countryId}/>
                        <br />
                      </div>
                    </ModalBody>
    
                    <ModalFooter>
                      {modalNew?
                        <button className="btn btn-success" onClick={handleSubmitForm} >
                        Insertar
                      </button>: <button className="btn btn-primary" onClick={handleSubmitForm}>
                        Actualizar
                      </button>
                      }
                      <button className="btn btn-danger"onClick={()=>closeModal()} >Cancelar</button>
                  </ModalFooter>
              </Modal>
    
              <Modal isOpen={modalDelete}>
                <ModalBody>
                   Estás seguro que deseas eliminar el hotel {name}
                </ModalBody>
                <ModalFooter>
                  <button className="btn btn-danger" onClick={()=>hotelDelete()}>Sí</button>
                  <button className="btn btn-secundary" onClick={()=>modalDeleteCancel({modalDelete: false})}>No</button>
                </ModalFooter>
              </Modal>
        </>
    )
}
