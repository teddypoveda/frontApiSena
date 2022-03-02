import React, { useState, useEffect } from 'react';
import {
  Modal, 
  InputLabel,
  TextField, 
  Button, 
  MenuItem, 
  Select, 
  List, 
  ListItem, 
  ListItemText } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {  eventAddNewFicha, eventUpdateFicha, eventDeleteFicha } from '../../../actions/events';
import '../../styles.css';
import { uiCloseModal, uiCloseModalDelete } from '../../../actions/ui';
import { ManageAccounts} from '@mui/icons-material';





  const useStyles = makeStyles((theme) => ({
    modal: {
      position: 'absolute',
      width: 500,
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #000',
      boxShadow: theme.shadows[12],
      borderRadius:'15px',
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    iconos:{
      cursor: 'pointer'
    }, 
    inputMaterial:{
      margin: '0 12px 0 0',
      width: '100%',
      color:'secondary'
    },
    valor:{
    }

  }));

  export const Bodies= () => {
    const styles= useStyles();
    const dispatch = useDispatch();
    const {resourceSelector,  modalNew, modalOpen, modalDelete, idSelector, modalDetails } = useSelector(state => state.ui);
    const [fichaSelect, setFichaSelect]=useState({})
 

    useEffect(() => {
        setFichaSelect(resourceSelector);
        console.log(fichaSelect)
      }, [resourceSelector]);

  
    const handleChange=e=>{
      const {name, value}=e.target;
      setFichaSelect(prevState=>({
        ...prevState,
        [name]: value
      })); 
    }
  

      const bodyDetails=(
      <div className={styles.modal}>
        { <h3><ManageAccounts fontSize="large"/> Detalles de la Ficha </h3>}
          
        <List sx={{ width: '30%', maxWidth: 100, bgcolor: 'background.paper' }}>
          <ListItem>
            <ListItemText secondary="Id" primary={fichaSelect.id} />
          </ListItem>
          <ListItem>
            <ListItemText secondary="Fecha Inicio de Formación" primary={fichaSelect.fechaInicio} />
          </ListItem>
          <ListItem>
            <ListItemText secondary="Fecha Fin de Formación" primary={fichaSelect.fechaFin} />
            <ListItemText secondary="Fecha Inicio de Practicas" primary={fichaSelect.fechaInicioPracticas} />
          </ListItem>
          <ListItem>
            <ListItemText secondary="Programa" primary={fichaSelect.programaId} />
          </ListItem>
        </List>

        <div align="right">
            <Button  onClick={()=>dispatch(uiCloseModal())}>Terminar</Button>
        </div>
      </div>
    ) 
    
    const bodyNewEdit=(
        <div className={styles.modal}>
            <h2>{ (modalNew)?'Nueva ':'Editar '} Ficha</h2>
       
            <InputLabel >Fecha Inicio de Formación</InputLabel>
            {(modalNew)?<TextField className={styles.inputMaterial} type="datetime-local" name="fechaInicio" onChange={handleChange} />:<TextField className={styles.inputMaterial} type="datetime-local" name="fechaInicio" onChange={handleChange} value={fichaSelect.fechaInicio}/>}
            <br/>
            <br/>
            <InputLabel >Fecha Fin de Formación</InputLabel>
            {(modalNew)?<TextField className={styles.inputMaterial} type="datetime-local" name="fechaFin" onChange={handleChange} />:<TextField className={styles.inputMaterial} type="datetime-local" name="fechaFin" onChange={handleChange} value={fichaSelect.fechaFin}/>}
            <br/>
            <br/>
            <InputLabel >Fecha Inicio de Practicas</InputLabel>
            {(modalNew)?<TextField className={styles.inputMaterial} type="datetime-local" name="fechaInicioPracticas" onChange={handleChange} />:<TextField className={styles.inputMaterial} type="datetime-local" name="fechaInicioPracticas" onChange={handleChange} value={fichaSelect.fechaInicioPracticas}/>}
            <br/>
            <br/> 
            <InputLabel >Programa</InputLabel>
            <Select
                className={styles.inputMaterial}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={fichaSelect.programaId}
                label="Tipo de Programa"
                name="tipoProgramaId"
                onChange={handleChange}
 
                >
                <MenuItem value={"1"}>Programa1</MenuItem>
                <MenuItem value={"2"}>Programa2</MenuItem>
                <MenuItem value={"3"}>Programa3</MenuItem>
              </Select>            

            
            <br/>
            <br/><br/>
            <div align="right">
                <Button color="primary" onClick={()=>(modalNew)?dispatch(eventAddNewFicha(fichaSelect)):dispatch(eventUpdateFicha(fichaSelect))}>{(modalNew)?'Agregar ':'Editar '} Programa</Button>
                <Button onClick={()=>dispatch(uiCloseModal())}>Cancelar</Button>
            </div>
        </div>
    ) 
    
      const bodyEliminar=(
        <div className={styles.modal}>
          <p>Estás seguro que deseas eliminar la ficha con el Id: <b>{resourceSelector.id}</b>? </p>
          <div align="right">
            <Button color="secondary" onClick={()=>dispatch(eventDeleteFicha(idSelector))}>Sí</Button>
            <Button onClick={()=>dispatch(uiCloseModalDelete())}>No</Button>
    
          </div>
    
        </div>
      )

      return(
        <> 
          <Modal
          open={modalOpen}>
          {bodyNewEdit}
          </Modal>

          <Modal
          open={modalDetails}>
            {bodyDetails}
          </Modal>
  
          <Modal
          open={modalDelete}>
            {bodyEliminar}
          </Modal>

      </>
      );
  }