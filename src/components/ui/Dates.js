import { Nav, Button, Badge, NavDropdown } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fichasUser, startLogout } from '../../actions/auth';


export const Dates = () => {
    const dispatch = useDispatch();
    

    //const {firstName, lastName, rol} = useSelector(state => state.auth);
    const firstName = localStorage.getItem('nombres');
    const lastName = localStorage.getItem('apellidos');
    const idUser = localStorage.getItem('id');
    const roles = localStorage.getItem('rol');

    
    const [rolState, setRolState] = useState(['Instructor', 'Administrador']);
    const [fichasState, setFichasState] = useState([2141041, 21410041]);
    const { rol } = useSelector(state => state.auth);
    const handleSelect = (eventKey) => console.log(eventKey);
    

    useEffect(() => {
        setRolState(['Instructor', 'Administrador']); 
    }, [ ]); 
   
    

    return (
        <>
            <span className="navbar-brand">
                {firstName+' '+lastName} {' '}
                
            </span>
            
            <Nav className="me-auto" >

                <NavDropdown title={roles} id="roles" onSelect={handleSelect} className='text-white P-0 rounded-pill bg-success' >
                    {rolState.map(e=><NavDropdown.Item eventKey={e}>{e}</NavDropdown.Item>)}
                </NavDropdown>

                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                {(!(roles==="Administrador"))||<Nav.Link href="/usuarios">Usuarios</Nav.Link>}
                {(!(roles==="Administrador"))||<Nav.Link href="/programas">Programas</Nav.Link>}
                {(!(roles==="Administrador"))||<Nav.Link href="/fichas">Fichas</Nav.Link>}
                {(!(roles==="Instructor"))||<Nav.Link href="/clases">Clases</Nav.Link>}
                {(!(roles==="Instructor"))||
                <NavDropdown title="Fichas Asignadas" id="fichas" onSelect={handleSelect} className='text-white P-0' >
                    {fichasState.map(e=><NavDropdown.Item eventKey={e}>{e}</NavDropdown.Item>)}
                </NavDropdown>}
                {(!(roles==="Aprendiz"))||<Nav.Link href="/inasistencias">Mis Inasistencias</Nav.Link>}

            </Nav>
            <Button onClick={startLogout()}>
                <i className="fas fa-sign-out-alt"></i> 
                <span> salir</span>
            </Button>
        </>
    )
}
