import { types } from '../types/types';

const initialState = {
    clases: [{
        id:'',
        fechaHora:'',
        aula:'',
        nombre:'',
        apiUserId:'',
        fichaId:'',
    }],
    fichaSelector:{
        id:'',
    },
    claseSelector: {
        id:'',
        fechaHora:'',
        aula:'',
        nombre:'',
        apiUserId:'',
        fichaId:'',
    },
    activeEvent: null
};
export const claseReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        
        case types.eventAddProgram:
            return {
                ...state,
                program:[
                    ...state.program,
                     action.payload
                ],
            }
        case types.eventFichaClasesGet:
            return {
                ...state,
                clases: action.payload                
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