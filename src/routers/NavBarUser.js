import React, { useEffect } from 'react'
import { Container, Navbar } from 'react-bootstrap';
import { useJwt } from 'react-jwt';
import { useDispatch, useSelector } from 'react-redux';
import { Dates } from '../components/ui/Dates';
import { LoginBotton } from '../components/ui/LoginBotton';


export const NavBarUser = () => {
    const dispatch = useDispatch();
    const {checking, rol} = useSelector(state => state.auth);
    const {rolSelect}= useSelector(state => state.ui);

    const token = localStorage.getItem('token')||'';
    const {  isExpired } = useJwt(token);

    useEffect(() => {
      
    }, [isExpired])
    
  return (
    <Navbar expand="lg" variant="light" bg="light">
        <Container fluid>
            <Navbar.Brand href="/">
                <img
                    src= "https://previews.123rf.com/images/djvstock/djvstock1702/djvstock170202599/70845774-icono-del-reloj-cuadrado-ilustraci%C3%B3n-imagen-del-dise%C3%B1o-del-vector.jpg?fj=1"
                    width= "50"
                    height="50"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                />{'  '}

            </Navbar.Brand>
            <span className="navbar-brand fontletter">
                No Falles, Asiste.
            </span>
            
            {(isExpired)?<LoginBotton/>:<Dates roles={rolSelect} />} 
            
        </Container>
  </Navbar> 
  )
}
