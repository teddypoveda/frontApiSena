import { combineReducers } from 'redux';
import { uiReducer } from './uiReducer';
import { authReducer } from './authReducer';
import { userReducer } from './UserReducer';
import { programReducer } from './ProgramReducer';
import { fichaReducer } from './FichaReducer';



export const rootReducer = combineReducers({
    ui: uiReducer,
    auth: authReducer,
    user: userReducer,
    program: programReducer,
    ficha: fichaReducer,
})
