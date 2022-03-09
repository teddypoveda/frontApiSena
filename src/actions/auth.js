import { fetchSinToken,fetchConToken } from '../helpers/fetch';
import { types } from '../types/types';
import Swal from 'sweetalert2';
import { Alert,Button } from 'react-bootstrap';




export const startLogin = ( email, password ) => {
    return async( dispatch ) => {

        const resp = await fetchSinToken( 'account/login', { email, password }, 'POST' );
        const body = await resp.json();

        
        if( resp.ok) {
            localStorage.setItem('token', body.token );
            var usuario = body.usuario;
            dispatch( login({
                    email:usuario.email,
                    nombres: usuario.nombres,
                    apellidos: usuario.apellidos,
                    id:usuario.id,
                    rol: body.rol
                }) );
                localStorage.setItem('email',usuario.email);
                localStorage.setItem('id',usuario.id);
                localStorage.setItem('nombres',usuario.nombres);
                localStorage.setItem('apellidos',usuario.apellidos);
                localStorage.setItem('rol',body.rol[0]);
                localStorage.setItem('checking',true);
                Swal.fire('¡Ingreso Exitoso!', '¡Bienvenido al sistema de asistencia de aprendices!', 'success');
            
        }else{
            Swal.fire('Error', 'Email o Contraseña invalida', 'error');
        }
        

    }
}

export const fichasUser = (id) => {
    
    return async() => {
        try {

            const resp = await fetchConToken( 'usuariosfichas/usuario/'+id, { }, 'GET' );
            return await resp.json();
            
        } catch (error) {
            console.log(error);
        }


    }
}

export const startRegister = (  email, nombres, apellidos, nroDocumento, tipoDocumento, rol, password ) => {
    return async(dispatch) => {
        (!rol==='')||(rol='Aprendiz');
        //console.log(rol);
        try {
            var numeroDocumento = Number(nroDocumento);
            var tipoDocumentoId = Number(tipoDocumento);
            const resp = await fetchSinToken( 'account/register', { email, nombres, apellidos, numeroDocumento, tipoDocumentoId, password, rol}, 'POST' );
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

