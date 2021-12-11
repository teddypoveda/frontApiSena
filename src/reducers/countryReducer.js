//import moment from 'moment';

import { types } from '../types/types';

const initialState = {
    countries: [{
        id:'',
        name:'',
        shortName:''
    }],
    activeEvent: null
};


export const countryReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        
        case types.eventAddCountry:
            return {
                ...state,
                countries:[
                    ...state.countries,
                     action.payload
                ],
                hola:'me ejecuto'
            }
        case types.eventCountryGet:
            return {
                ...state,
                countries: action.payload                
            }

        case types.eventClearModal:
            return {
                ...state,
                activeEvent: null
            }


        case types.eventUpdatedCountry:
            return {
                ...state,
                countries: state.countries.map(
                    e => ( e.id === action.payload.id ) ? action.payload : e
                )
            }
        
        case types.eventDeletedCountry:
            return {
                ...state,
                countries: state.countries.filter(
                    e=>(e.id !== action.payload )
                ),
                activeEvent: null
            }

        default:
            return state;
    }


}
