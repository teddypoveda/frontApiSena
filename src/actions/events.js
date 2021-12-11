import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";
import Swal from 'sweetalert2'

export const eventLoadingHotel = () =>{
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('hotel?PageNumber=1&PageSize=19',{});
            const body = await resp.json();

            dispatch(eventHotelGet(body));
            

        } catch (error) {
            console.log(error);
        }

    
    }
} 
export const eventLoadingCountry = () =>{
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('country?PageNumber=1&PageSize=19',{});
            const body = await resp.json();
            console.log(body);
            dispatch(eventCountryGet(body));
            

        } catch (error) {
            console.log(error);
        }

    
    }
} 
export const eventAddNewHotel = (event)=>{
    
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('hotel',event,'Post');
            console.log(resp);
            if(resp.ok){
                dispatch(eventPostHotel(event));
                Swal.fire(
                'Exitosa!',
                'Se agregó correctamente!',
                'success'
            )}else{
                Swal.fire(
                'Error!',
                'No se puede agregar!',
                'error'
                );
            }
            dispatch(closeModal());

        } catch (error) {
            console.log(error);
        }
    }   
}
export const eventAddNewCountry = (event)=>{
    
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('country',event,'Post');
            console.log(resp);
            if(resp.ok){
                dispatch(eventPostCountry(event));
                Swal.fire(
                'Exitosa!',
                'Se agregó correctamente!',
                'success'
            )
            }else{
                Swal.fire(
                'Error!',
                'No se puede agregar!',
                'error'
                );
            }
            dispatch(closeModal());

        } catch (error) {
            console.log(error);
        }
    }   
}
export const eventDeleteHotel = (event)=>{
    
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('hotel/'+event,{},'Delete');
            
            if(resp.ok){
                dispatch(eventDeletedHotel(event));
                Swal.fire(
                'Exitosa!',
                'Se eliminó correctamente!',
                'success'
              )}else{
              Swal.fire(
                'Error!',
                'No se puede eliminar!',
                'error'
              );
              }

            dispatch(closeModalDelete());



        } catch (error) {
            console.log(error);
        }
    }   
}
export const eventDeleteCountry = (id)=>{
    
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('country/'+id,{},'Delete');
            if(resp.ok){
                dispatch(eventDeletedCountry(id));
                Swal.fire(
                'Exitosa!',
                'Se eliminó correctamente!',
                'success'
              )}else{
              Swal.fire(
                'Error!',
                'No se puede eliminar!',
                'error'
              );
              }

            dispatch(closeModalDelete());


        } catch (error) {
            console.log(error);
        }
    }   
}
export const eventUpdateHotel = (event)=>{
    
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('hotel/'+event.id,event,'PUT');
            if(resp.ok){
                dispatch(eventUpdatedHotel(event));
                Swal.fire(
                'Exitosa!',
                'Se modificó correctamente!',
                'success'
              )}else{
              Swal.fire(
                'Error!',
                'No se puede modificar!',
                'error'
              );
              }
            
            dispatch(closeModal());

        } catch (error) {
            console.log(error);
        }
    }   
}
export const eventUpdateCountry = (event)=>{
    
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('country/'+event.id,event,'PUT');
            if(resp.ok){
                dispatch(eventUpdatedCountry(event));
                Swal.fire(
                'Exitosa!',
                'Se modificó correctamente!',
                'success'
              )}else{
              Swal.fire(
                'Error!',
                'No se puede modificar!',
                'error'
              );
              }
            dispatch(eventUpdatedCountry());
            dispatch(closeModal());

        } catch (error) {
            console.log(error);
        }
    }   
}
const closeModalDelete = ()=> ({   type: types.uiModalDeleteClose });

const closeModal = ()=> ({ type: types.uiCloseModal});

const eventPostHotel = (event)=> ({ type: types.eventAddHotel, payload: event});
const eventPostCountry = (event)=> ({ type: types.eventAddCountry, payload: event });

const eventHotelGet = (event)=>{
    return{type: types.eventHotelGet,
        payload: event}
} 
const eventCountryGet = (event)=>{
    return{type: types.eventCountryGet,
        payload: event}
} 



const eventDeletedHotel = (id) => ({ type: types.eventDeletedHotel, payload:id });

const eventDeletedCountry = (id) => ({ type: types.eventDeletedCountry, payload:id});

const eventUpdatedHotel = (event) => ({ type: types.eventUpdatedHotel, payload:event });
const eventUpdatedCountry = (event) => ({ type: types.eventUpdatedCountry, payload:event});

export const evenModaltDeleted = () => ({ type: types.modalDelete });

export const eventClearActiveEvent = () => ({ type: types.eventClearActiveEvent });

export const eventLogout =() => ({ type: types.eventLogout });
