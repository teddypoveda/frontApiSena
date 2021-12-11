import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { startLogin } from '../../actions/auth';
import './login.css';

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [ formLoginValues, handleLoginInputChange ] = useForm({
        lEmail: '',
        lPassword: 'Contraseñ4.'
    });

    const { lEmail, lPassword } = formLoginValues;

    const handleLogin = async( e ) => {
        e.preventDefault();
        dispatch( startLogin( lEmail, lPassword ) );        
    }
    

    
    return (
        <div className="login">
            <div className=" mx-auto w-50 bg-light border shadow-lg bg-body rounded border border-secondary">
                <div className="p-7">
                    <h3 className="p-3 mb-2 bg-secondary text-white">Ingreso</h3>
                    <form onSubmit={ handleLogin } className="px-3">
                        <div className="form-group pt-4">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="lEmail"
                                value={ lEmail }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group pt-3">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="lPassword"
                                value={ lPassword }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group pt-5 pb-3">
                            <input 
                                type="submit"
                                className="btn btn-primary"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}