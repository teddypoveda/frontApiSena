import { types } from "../types/types";

const initialState = {
    modalOpenHotel: false,
    modalOpenCountry: false,
    modalDelete:false,
    modalNew: true,
    idSelector:null,
    hotelSelector:{id:'',
    country:'',
    name:'',
    address:'',
    rating:'',
    countryId:''},
    countrySelector:{
        id:'',
        name:'',
        shortName:''
    }
}



export const uiReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        case types.uiOpenModalHotel:
            return {
                ...state,
                modalNew:true,
                modalOpenHotel: true
            }
        case types.uiOpenModalCountry:
            return {
                ...state,
                modalNew:true,
                modalOpenCountry: true
            }
        case types.uiOpenModalHotelId:
            return {
                ...state,
                modalOpenHotel: true,
                modalNew:false,
                hotelSelector:action.hotelUpdate
            }
        case types.uiOpenModalCountryId:
            return {
                ...state,
                modalOpenCountry: true,
                modalNew:false,
                countrySelector:action.countryUpdate
            }
            
        case types.uiModalDelete:
            return {
                ...state,
                modalDelete: true,
                idSelector:action.idDelete
            }
        case types.uiModalDeleteClose:
            return {
                ...state,
                modalDelete: false
            }
        case types.uiCloseModal:
            return {
                ...state,
                modalOpenCountry: false,
                modalOpenHotel:false,
                hotelSelector: {id:'',
                country:'',
                name:'',
                address:'',
                rating:'',
                countryId:''},
                countrySelector:{id:'', name:'',shortName:''}
            }
        case types.eventClearActiveEvent:
            return {
                ...state,
                hotel: {id:'',
                country:'',
                name:'',
                address:'',
                rating:'',
                countryId:''}
            }
    
        default:
            return state;
    }


}