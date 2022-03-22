import { types } from '../types/types';

const initialState = {
    user: [{
        rol:'',
        id:'',
        nombres:'',
        apellidos:'',
        estado:'',
        nroDocumento:'',
        tipoDocumentoId:'',
        email:'',
        emailConfirmed:''

    }],
    userSelector:{
        roles:'',
        id:'',
        nombres:'',
        apellidos:'',
        numeroDocumento:'',
        tipoDocumentoId:'',
        email:''
    },

    activeEvent: null
};
export const userReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        
        case types.eventAddUser:
            return {
                ...state,
                user:[
                    ...state.user,
                     action.payload
                ],
            }
        case types.eventUserGet:
            return {
                ...state,
                user:action.payload,               
            }

        case types.eventClearModal:
            return {
                ...state,
                activeEvent: null
            }


        case types.eventUpdatedUser:
            return {
                ...state,
                user: state.user.map(
                    e => ( e.id === action.payload.id ) ? action.payload : e
                )
            }
        
        case types.eventDeletedUser:
            return {
                ...state,
                User: state.user.filter(
                    e=>(e.id !== action.payload )
                ),
                activeEvent: null
            }

        default:
            return state;
    }


}