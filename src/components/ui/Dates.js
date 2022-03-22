import { Nav, Button, Badge, NavDropdown } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fichasUser, startLogout } from '../../actions/auth';
import {useHistory} from 'react-router-dom'
import { uiChangeFicha, uiChangeRol } from '../../actions/ui';
import { eventLoadingFichaClases } from '../../actions/events';


export const Dates = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    

    //const {firstName, lastName, rol} = useSelector(state => state.auth);
    const firstName = localStorage.getItem('nombres');
    const lastName = localStorage.getItem('apellidos');
    const idUser = localStorage.getItem('id');
    const { rol, fichasInstructor} = useSelector(state => state.auth);
    const { idFichaSelect} = useSelector(state => state.ui);

    
    const [rolSelected, setRolSelected] = useState(props.roles);
    const [idFichaSelected, setIdFichaSelected] = useState(idFichaSelect);
    
    const handleSelectRol = (eventKey) => dispatch(uiChangeRol(eventKey));
    const handleSelectFicha = (eventKey) => {
        dispatch(uiChangeFicha(eventKey));
        dispatch(eventLoadingFichaClases(eventKey));
        history.push("/fichasasignadas");
    }


    useEffect(() => {
        setRolSelected(props.roles);
        setIdFichaSelected(idFichaSelect);
    }, [ props.roles, idFichaSelect]); 
   
    
    

    return (
        <>
            <span className="navbar-brand">
                {firstName+' '+lastName} {' '}
                
            </span>
            

            <Nav className="me-auto" >

                <NavDropdown title={rolSelected} id="rolSelected" onSelect={handleSelectRol} className='text-white P-0 rounded-pill bg-success' >
                    {rol.map(e=><NavDropdown.Item eventKey={e}>{e}</NavDropdown.Item>)}
                </NavDropdown>&nbsp;

                <Button variant="outline-info" onClick={()=>history.push("/dashboard")}>Dashboard </Button>&nbsp;
                {(!(rolSelected==="Administrador"))||<Button variant="outline-info" onClick={()=>history.push("/usuarios")}>Usuarios</Button>}&nbsp;
                {(!(rolSelected==="Administrador"))||<Button variant="outline-info" onClick={()=>history.push("/programas")}>Programas</Button>}&nbsp;
                {(!(rolSelected==="Administrador"))||<Button variant="outline-info" onClick={()=>history.push("/fichas")}>Fichas</Button>}&nbsp;
                {(!(rolSelected==="Instructor"))||<Button variant="outline-info" onClick={()=>history.push("/clases")}>Clases</Button>}&nbsp;
                {(!(rolSelected==="Instructor"))||
                <NavDropdown title='Ficha Asignada' id="fichas" onSelect={handleSelectFicha} className='text-white P-0' >
                    {fichasInstructor.map(e=><NavDropdown.Item eventKey={e}>{e}</NavDropdown.Item>)}
                </NavDropdown>}&nbsp;
                {(!(rolSelected==="Aprendiz"))||<Button variant="outline-info" onClick={()=>history.push("/inasistencias")}>Mis Inasistencias</Button> }&nbsp;
                {(!(rolSelected==="Vocero"))||<Button variant="outline-info" onClick={()=>history.push("/inasistenciasficha")}>Inasistencias</Button> }
            &nbsp;

            </Nav>
            <Button onClick={startLogout()}>
                <i className="fas fa-sign-out-alt"></i> 
                <span> salir</span>
            </Button>
            
        </>
    )
}
