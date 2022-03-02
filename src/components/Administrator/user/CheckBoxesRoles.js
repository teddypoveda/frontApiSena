import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useSelector, useDispatch } from 'react-redux';
import { eventUpdateRolesUser } from '../../../actions/events';


export const CheckboxesRoles = ()=> {
  const { resourceSelector } = useSelector(state => state.ui);
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    Aprendiz: (resourceSelector.roles.indexOf("Aprendiz")!==-1),
    Vocero: (resourceSelector.roles.indexOf("Vocero")!==-1),
    Instructor: (resourceSelector.roles.indexOf("Instructor")!==-1),
    Administrador: (resourceSelector.roles.indexOf("Administrador")!==-1),
  });


  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { Aprendiz, Vocero, Instructor, Administrador } = state;
  //const error = [Aprendiz, Vocero, Instructor, Administrador].filter((v) => v).length !== 2;

  return (
    <Box sx={{ display: 'flex' }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Roles</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox size='small' checked={Aprendiz} onChange={handleChange} name="Aprendiz" />
            }
            label="Aprendiz"
          />
          <FormControlLabel
            control={
              <Checkbox size='small' checked={Vocero} onChange={handleChange} name="Vocero" />
            }
            label="Vocero"
          />
          <FormControlLabel
            control={
              <Checkbox size='small' checked={Instructor} onChange={handleChange} name="Instructor" />
            }
            label="Instructor"
          />
          <FormControlLabel
            control={
              <Checkbox size='small' checked={Administrador} onChange={handleChange} name="Administrador" />
            }
            label="Administrador"
          />
        </FormGroup>
      </FormControl>
      <Button color="primary" onClick={()=>dispatch(eventUpdateRolesUser(resourceSelector.id, state))}> Actualizar Roles</Button>
    </Box>
  );
}
