import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";
import Swal from 'sweetalert2'
import { ToastContainer } from "react-toastify";




export const eventUpdateRolesUser = (id, roles) =>{
    return async (dispatch) => {
        try {
            let rol= [];
            (!roles.Aprendiz)||rol.push("Aprendiz");
            (!roles.Vocero)||rol.push("Vocero");
            (!roles.Instructor)||rol.push("Instructor");
            (!roles.Administrador)||rol.push("Administrador");
            
            const resp = await fetchConToken(`usuarios/roles/${id}`,rol,"Put");
            if(resp.ok){
                //eventUpdatedRolesUser();
                Swal.fire(
                'Exitosa!',
                'Se modificaron los roles correctamente!',
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
export const eventLoadingUser = (size=null, number=null, orderBy=null) =>{
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`Usuarios?pageSize=${size}&pageNumber=${number}&orderBy=${orderBy}`,{});
            const body = await resp.json();
            console.log(body);
            dispatch(eventUserGet(body));
            

        } catch (error) {
            console.log(error);
        }
    }
} 
export const eventAddNewUser = (event)=>{
    

    return async (dispatch) => {
        try {
            const resp = await fetchConToken('usuarios',event,'Post');
            const body = await resp.json();
        
            if(resp.ok){
                //dispatch(eventPostUser(event));
                dispatch(closeModal());
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
            

        } catch (error) {
            console.log(error);
        }
    }
}

export const eventAddNewProgram = (event)=>{

    return async (dispatch) => {
        try {

            const data ={
                id:event.id,
                nombre:event.nombre,
                version:event.version,
                descripcion:event.descripcion,
                tipoProgramaId: event.tipoProgramaId,
            } 
            const resp = await fetchConToken('programas',data,'Post');

            if(resp.ok){
                //dispatch(eventPostprogram(event));
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

export const eventAddNewFicha = (event)=>{

    return async (dispatch) => {
        try {

            const resp = await fetchConToken('fichas',event,'Post');

            if(resp.ok){
                //dispatch(eventPostprogram(event));
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

export const eventDeleteFicha = (event)=>{
    
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('fichas/'+event,{},'Delete');
            
            if(resp.ok){
                //dispatch(eventDeletedProgram(event));
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

export const eventDeleteProgram = (event)=>{
    
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('programas/'+event,{},'Delete');
            
            if(resp.ok){
                //dispatch(eventDeletedProgram(event));
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

export const eventDeleteUser = (event)=>{
    
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('usuarios/'+event,{},'Delete');
            
            if(resp.ok){
                //dispatch(eventDeletedUser(event));
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

export const eventUpdateUser = (event)=>{
    
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('usuarios/'+event.id,event,'PUT');
            if(resp.ok){
                //dispatch(eventUpdatedUser(event));
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

export const eventUpdateProgram = (event)=>{
    
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('programas/'+event.id,event,'PUT');
            if(resp.ok){
                //dispatch(eventUpdatedProgram(event));
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

export const eventUpdateFicha = (event)=>{

    const data ={
        id:event.id,
        fechaInicio:event.fechaInicio,
        fechaFin:event.fechaFin,
        fechaInicioPracticas:event.fechaInicioPracticas,
        programaId: event.programaId,
    } 
    
    return async (dispatch) => {

        try {
            const resp = await fetchConToken('fichas/'+data.id,data,'PUT');
            if(resp.ok){
                //dispatch(eventUpdatedProgram(event));
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


const closeModalDelete = ()=> ({   type: types.uiModalDeleteClose });

const closeModal = ()=> ({ type: types.uiCloseModal});

const eventPostUser = (event)=> ({ type: types.eventAddUser, payload: event});
//const eventPostprogram = (event)=> ({ type: types.eventAddProgram, payload: event});


const eventUserGet = (event)=>{
    return{type: types.eventUserGet,
        payload: event}
} 



//const eventDeletedUser = (id) => ({ type: types.eventDeletedUser, payload:id });

//const eventDeletedCountry = (id) => ({ type: types.eventDeletedCountry, payload:id});

//const eventUpdatedUser = (event) => ({ type: types.eventUpdatedUser, payload:event });
//const eventUpdatedCountry = (event) => ({ type: types.eventUpdatedCountry, payload:event});

//const eventUpdatedRolesUser = (event) => ({ type: types.eventUpdatedCountry, payload:event});

export const evenModaltDeleted = () => ({ type: types.modalDelete });

export const eventClearActiveEvent = () => ({ type: types.eventClearActiveEvent });

export const eventLogout =() => ({ type: types.eventLogout });
