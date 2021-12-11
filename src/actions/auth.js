import { fetchSinToken, fetchConToken } from '../helpers/fetch';
import { types } from '../types/types';
import Swal from 'sweetalert2';



export const startLogin = ( email, password ) => {
    return async( dispatch ) => {

        const resp = await fetchSinToken( 'account/login', { email, password }, 'POST' );
        const body = await resp.json();

        
        if( resp.ok) {
            localStorage.setItem('token', body.token );
            const response = await fetchConToken( 'account/tokenValid', {}, 'GET' );
            const bodies = await response.json();
            console.log(bodies);
            if(response.ok){
                dispatch( login({
                    firstName: bodies.firstName,
                    lastName: bodies.lastName,
                    rol: bodies.rol
                }) );
                localStorage.setItem('firstName',bodies.firstName);
                localStorage.setItem('lastName',bodies.lastName);
                localStorage.setItem('rol',bodies.rol);
                localStorage.setItem('checking',true);

                Swal.fire('Ingreso Exitoso!', 'Bienvenido al sisstema de hoteles!', 'success');
            }
        }else{
            Swal.fire('Error', 'Email o Contraseña invalida', 'error');
        }
        

    }
}

export const startRegister = (  email, firstName, lastName, rol, password ) => {
    return async(dispatch) => {
        (!rol==='')||(rol='Administrator');
        //console.log(rol);
        try {
            const roles=[rol];
            const resp = await fetchSinToken( 'account/register', { email, firstName, lastName,roles, password}, 'POST' );
            
            if( resp.ok ) {
                Swal.fire('Registro Exitoso!', 'Ahora puedes ingresar al sisstema!', 'success');
            } else {
                Swal.fire('Error', resp.msg, 'error');
            }
            
        } catch (error) {
            console.log(error);
        }


    }
}

export const startChecking = () => {
    return async(dispatch) => {

        localStorage.setItem('tokenExpired',false);

    
       

        // if( body.ok ) {
        //     // localStorage.setItem('token', body.token );
        //     // localStorage.setItem('token-init-date', new Date().getTime() );

        //     // dispatch( login({
        //     //     uid: body.uid,
        //     //     name: body.name
        //     // }) )
        // } else {
        //     //dispatch( checkingFinish() );
        // }
    }
}

//const checkingFinish = () => ({ type: types.authCheckingFinish });



const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});


export const startLogout = () => {
    return (  ) => {

        localStorage.clear();
        localStorage.setItem('tokenExpired', true);
        window.location.href = window.location.href;

    }
}

//const logout = () => ({ type: types.authLogout })