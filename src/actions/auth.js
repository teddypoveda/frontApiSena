import { fetchSinToken,fetchConToken } from '../helpers/fetch';
import { types } from '../types/types';
import Swal from 'sweetalert2';
import { Alert,Button } from 'react-bootstrap';
import { uiChangeRol } from './ui';




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
                body.rol.map(e=>e==="Instructor"&&dispatch(fichasUser(usuario.id)));
                localStorage.setItem('email',usuario.email);
                localStorage.setItem('id',usuario.id);
                localStorage.setItem('nombres',usuario.nombres);
                localStorage.setItem('apellidos',usuario.apellidos);
                dispatch(uiChangeRol(body.rol[0]));
                localStorage.setItem('checking',true);
                Swal.fire('¡Ingreso Exitoso!', '¡Bienvenido al sistema de asistencia de aprendices!', 'success');
            
        }else{
            Swal.fire('Error', 'Email o Contraseña invalida', 'error');
        }
        

    }
}

const fichasUser = (id) => {
    
    return async(dispatch) => {
        try {

            const resp = await fetchConToken( 'usuariosFichas/usuario/instructor/'+id, { }, 'GET' );
            const body = await resp.json();
            var fichas=[];
            body.map(e=>fichas.push(e.fichaId))
            console.log(fichas)
            dispatch(authFichaInstructor(fichas));

            
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

const authFichaInstructor =(ids)=>({ type: types.authFichaInstructor, payload:ids })


export const startLogout = () => {
    return (  ) => {

        localStorage.clear();
        localStorage.setItem('tokenExpired', true);
        window.location.href = window.location.href;

    }
}

