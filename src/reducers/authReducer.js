import { types } from '../types/types';

const initialState = {
    checking: false,
    fichasInstructor:[],
    rol:[],

    // uid: null,
    // name: null
}

export const authReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        
        case types.authLogin:
            return {
                ...state,
                ...action.payload,
                checking: true
            }
        case types.authFichaInstructor:
            return {
                ...state,
                fichasInstructor:action.payload,
            }

        case types.authCheckingFinish:
            return {
                ...state,
                checking: true
            }

        case types.authLogout:
            return {
                checking: false
            }


        default:
            return state;
    }

}


