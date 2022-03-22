import { types } from '../types/types';

const initialState = {
    userFichas: [{
        id:'',
        apiUserId:'',
        estadoId:'',
        fichaId:'',
    }],

    activeEvent: null
};
export const UserFichasReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        
        case types.eventAddUserFichas:
            return {
                ...state,
                userFichas:[
                    ...state.program,
                     action.payload
                ],
            }
        case types.eventUserFichasGet:
            return {
                ...state,
                userFichas: action.payload                
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