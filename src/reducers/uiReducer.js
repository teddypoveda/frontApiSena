import { types } from "../types/types";

const initialState = {
    modalOpen: false,
    modalDetails: false,
    modalDelete:false,
    modalNew: true,
    idSelector:null,
    resourceSelector:{id:'',
    nombres:'',
    apellidos:'',
    rol:'',
    estado:'',
    numeroDoucmento:'',
    tipoDoucmento:'',
    email:'',
    emailConfirmed:'',
    nombre:'',
    version:'',
    descripcion:'',
    tipoProgramaId:'',
    fechaInicio:'',
    fechaFin:'',
    fechaInicioPracticas:'',
    programaId:'',},

}



export const uiReducer = ( state = initialState, action ) => {

    switch ( action.type ) {

        case types.uiOpenModal:
            if(action.select===null){
                return{
                    ...state,
                    modalNew:true,
                    modalOpen: true
                }
            }
            return {
                ...state,
                modalNew:false,
                modalOpen: true,
                resourceSelector:action.select
            }

        case types.uiOpenModalRolesUser:
            return {
                ...state,
                
            }
            
        case types.uiModalDelete:
            return {
                ...state,
                modalDelete: true,
                idSelector:action.resourceDelete.id,
                resourceSelector:action.resourceDelete
            }

        case types.uiOpenModalDetails:
            return {
                ...state,
                modalDetails: true,
                idSelector:action.select.id,
                resourceSelector:action.select
            }
        case types.uiModalDeleteClose:
            return {
                ...state,
                modalDelete: false
            }
        case types.uiCloseModal:
            return {
                ...state,
                modalOpen:false,
                modalDetails: false,

            }
        case types.eventClearActiveEvent:
            return {
                ...state
            }
    
        default:
            return state;
    }


}