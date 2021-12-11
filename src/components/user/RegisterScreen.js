import React from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import {  startRegister } from '../../actions/auth';
import './register.css';

export const RegisterScreen = ({history}) => {

    const dispatch = useDispatch();

    const initialState={
        email: '',
        firstName:'',
        lastName:'',
        rol:'',
        password: ''

    }
    const [ formRegisterValues, handleLoginInputChange, reset ] = useForm(initialState);

    const { email, firstName, lastName,rol,password } = formRegisterValues;

    const rolle=((localStorage.getItem('rol')==="Administrator"))||("visually-hidden");


    const handleLogin = ( e ) => {
        e.preventDefault();
        dispatch( startRegister( email, firstName, lastName, rol, password ) );
        reset();
        return (<Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>);
    }
    

    
    return (
        <div className="register">
            <div className="position-absolute w-50  top-55 start-50 translate-middle border border-dark d-grid gap-3 shadow-lg bg-body rounded"  >
                <div className="">
                    <h3 className="p-4 bg-secondary text-white ">Nuevo usuario</h3>
                    <form onSubmit={ handleLogin } className="row p-3 g-3 needs-validation">
                        <div className="input-group has-validation mt-3 mb-2">
                            <input 
                                type="text"
                                className="form-control bg-light border"
                                placeholder="Correo"
                                name="email"
                                id="validationCustom01"
                                value={ email }
                                onChange={ handleLoginInputChange }
                                aria-describedby="validationCustomUsername"
                                required
                            />
                            <div class="invalid-feedback">
                                Please choose a username.
                            </div>
                        </div>
                        <div className="form-group mt-4">
                            <input 
                                type="text"
                                className="form-control bg-light border"
                                placeholder="Nombres"
                                name="firstName"
                                value={ firstName }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group mt-4">
                            <input 
                                type="text"
                                className="form-control bg-light border"
                                placeholder="Apellidos"
                                name="lastName"
                                value={ lastName }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className={`input-group mb-3 mt-4 ${rolle}`} >
                        <label className="input-group-text" >Rol</label>
                        <select className="form-select" name="rol" defaultValue={ rol } onChange={ handleLoginInputChange }  required aria-label="select example">
                            <option >roles...</option>
                            <option defaultValue="user">usuario</option>
                            <option defaultValue="Administrator">Administrador</option>

                        </select>
                        <div class="invalid-feedback">Example invalid select feedback</div>
                        </div>
                        <div className="form-group mt-4">
                            <input
                                type="password"
                                className="form-control bg-light border"
                                placeholder="Contraseña"
                                name="password"
                                value={ password }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className=" pt-4 w-50  ">
                            <input 
                                type="submit"
                                className=" btn btn-success" 
                                value="Crear usuario" 
                            />
                        </div>
                    </form>
                </div>
        </div>
    </div>
    )
}