import { combineReducers } from 'redux';

import { uiReducer } from './uiReducer';
import { countryReducer } from './countryReducer';
import { authReducer } from './authReducer';
import { hotelReducer } from './hotelReducer';



export const rootReducer = combineReducers({
    ui: uiReducer,
    country: countryReducer,
    hotel: hotelReducer,
    auth: authReducer
})
