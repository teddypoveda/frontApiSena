import { types } from '../types/types';

   


const initialState = {
    hotels: [{id:'',
    country:'',
    name:'',
    address:'',
    rating:'',
    countryId:''}],
    activeEvent: null
};


export const hotelReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        

        
        case types.eventAddHotel:
            return {
                ...state,
                hotels: [
                    ...state.hotels,
                    action.payload
                ],
                hola:'me ejecuto'
            }

        case types.eventHotelGet:
            return {
                ...state,
                hotels: action.payload
                
            }



        case types.eventUpdatedHotel:
            return {
                ...state,
                hotels: state.hotels.map(
                    e => ( e.id === action.payload.id ) ? action.payload : e
                ),
                datos: action.payload.id
            }
        
        case types.eventDeletedHotel:
            return {
                ...state,
                hotels: state.hotels.filter(
                    e => ( e.id !== action.payload )
                ),
                activeEvent: null
            }
        case types.eventLogout:
            return {
                ...initialState
            }

        default:
            return state;
    }


}
