import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";
import Swal from 'sweetalert2'





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
export const eventLoadingFichaClases = (size=null, number=null, orderBy=null) =>{
    return async (dispatch) => {
        try {
            const id = localStorage.getItem('id');
            const idFicha= 2140041;
            const resp = await fetchConToken(`Clases/ficha?idUser=${id}&idFicha=${idFicha}`,{});
            const body = await resp.json();
            dispatch(eventFichaClasesGet(body.clases));
            

        } catch (error) {
            console.log(error);
        }
    }
} 

export const eventLoadingInasistencias = () =>{
    return async (dispatch) => {
        try {
            const id = localStorage.getItem('id');
            const resp = await fetchConToken(`Asistencias/inasistencias/${id}`,{});
            const body = await resp.json();
            dispatch(eventInasistenciasGet(body));
            

        } catch (error) {
            console.log(error);
        }
    }
} 



export const eventLoadingFichasInstructor = (id, size=null, number=null, orderBy=null) =>{
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`usuariosFichas/usuario/instructor/${id}?pageSize=${size}&pageNumber=${number}&orderBy=${orderBy}`,{});
            const body = await resp.json();
            console.log(body)            

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
            console.log(body)
            console.log(body.detail)
            if(body.ok){
                //dispatch(eventPostUser(event));
                dispatch(closeModal());
                Swal.fire(
                'Exitosa!',
                'Se ha registrado un nuevo usuario correctamente!',
                'success'
            )}else{
                Swal.fire(
                'Error!',
                body.detail,
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
            console.log(event)

            const resp = await fetchConToken('programas',event,'Post');

            if(resp.ok){
                //dispatch(eventPostprogram(event));
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

export const eventAddNewFicha = (event)=>{

    return async (dispatch) => {
        try {
            console.log(event)

            const resp = await fetchConToken('fichas',event,'Post');

            if(resp.ok){
                //dispatch(eventPostprogram(event));
                dispatch(closeModal());
                Swal.fire(
                'Exitosa!',
                'Se agrega correctamente!',
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

export const eventAddNewClase = (event)=>{

    return async (dispatch) => {
        try {
            console.log(event)

            const resp = await fetchConToken('clases',event,'Post');

            if(resp.ok){
                //dispatch(eventPostprogram(event));
                dispatch(closeModal());
                Swal.fire(
                'Exitosa!',
                'Se agrega correctamente!',
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

export const eventDeleteClase = (event)=>{
    
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
                'Se modificó el usuario correctamente!',
                'success'
              )}else{
              Swal.fire(
                'Error!',
                'No se puede modificar el usuario!',
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
                dispatch(closeModal());
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

        } catch (error) {
            console.log(error);
        } 
    }    
}

export const eventUpdateFicha = (event)=>{

    
    return async (dispatch) => {

        try {
            const resp = await fetchConToken('fichas/'+event.id,event,'PUT');
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

export const eventUpdateClase = (event)=>{

    
    return async (dispatch) => {

        try {
            const resp = await fetchConToken('fichas/'+event.id,event,'PUT');
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

const eventFichaClasesGet = (event)=>{
    return{type: types.eventFichaClasesGet,
        payload: event}
} 

const eventInasistenciasGet = (event)=>{
    return{type: types.eventInasistenciasGet,
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
