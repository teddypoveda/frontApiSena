import React,{useEffect} from 'react'
import { BrowserRouter as Router,
    Switch,
    Route
    } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Container } from 'react-bootstrap';
import { LoginScreen } from '../components/auth/LoginScreen';
import { Dates } from '../components/ui/Dates';
import { useJwt } from "react-jwt";
import { LoginBotton } from '../components/ui/LoginBotton';
import { CountryScreen } from '../components/country/CountryScreen';
import { Dashboard } from '../components/dashboard/Dashboard';
import { HotelScreen } from '../components/hotel/HotelScreen';
import { PublicRoute } from './PublicRoute';
import { RegisterScreen } from '../components/user/RegisterScreen';
import { PrivateRoute } from './PrivateRoute';


export const AppRouters = () => {
    const dispatch = useDispatch();
    const {checking} = useSelector(state => state.auth);
    
    const token = localStorage.getItem('token')||'';
    const {  isExpired } = useJwt(token);
    localStorage.setItem('tokenExpired', isExpired);
    
    useEffect(() => {
         //dispatch(startChecking());
    }, [!isExpired,checking]);

    return (
    <>

    <Navbar bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="/">
                <img
                    src="https://www.shareicon.net/data/512x512/2016/07/10/119874_apps_512x512.png"
                    width="50"
                    height="50"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                />
            Hotels
            </Navbar.Brand>
            
            
             {(isExpired)?<LoginBotton/>:<Dates />} 
            
        </Container>
  </Navbar>
  
    <Router>
   
        <Switch>
            <Route path="/register" component={ RegisterScreen } />

            <PrivateRoute 
                exact 
                path="/login" 
                component={ LoginScreen }
                isAuthenticated={ isExpired }
 
            /> 

            <PublicRoute 
                exact 
                path="/dashboard" 
                component={ Dashboard }
                isAuthenticated={ isExpired }
 
            />
            

            <Route path="/dashboard" render={()=>{
                return (isExpired)?<Dashboard/>:<LoginScreen/>;
            }
            }/>
            <Route path="/hotel" render={()=>{
                return (isExpired)?<HotelScreen/>:<LoginScreen/>;
            }
            }/>
            <Route path="/country" render={()=>{
                return (isExpired)?<CountryScreen/>:<LoginScreen/>;
            }
            }/>


        </Switch> 
        
    </Router>
  </>  
  );
}    
       
    

