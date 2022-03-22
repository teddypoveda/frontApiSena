import React from 'react'
import { Navbar, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


export const LoginBotton = () => {
    const history = useHistory();
    return (
        <Navbar.Brand href="">
            <Button variant="secondary" onClick={()=>history.push("/login")}>Login</Button>
            {'  '}
            <Button variant="info" onClick={()=>history.push("/register")}>Registrarse</Button>
        </Navbar.Brand>
    )
}
