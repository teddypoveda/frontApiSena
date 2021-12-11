import React, { Component } from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


const url="https://localhost:44348/api/Country/";


export class DataTableCountry extends Component {
  state={
    data:[],
    modalInsertar: false,
    modalEliminar: false,
    form:{
      id:'',
      name:'',
      shortName:'',
      tipoModal:''
    }
  }
  
  peticionGet=()=>{
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    axios.get(url).then(response=>{
      this.setState({data:response.data})
    }).catch(error=>{
      console.log(error.message);
    })
  }
  peticionPost=async ()=>{
    delete this.state.form.id;
    await axios.post(url,this.state.form).then(response=>{
      this.modalInsertar();
      this.peticionGet();
    }).catch(error=>{
      console.log(error.message);
    })
  }
  peticionPut=async ()=>{
    await axios.put(url+this.state.form.id,this.state.form).then(response=>{
      this.modalInsertar();
      this.peticionGet();
    }).catch(error=>{
      console.log(error.message);
    })
  }
  peticionDelete=async ()=>{
    await axios.delete(url+this.state.form.id).then(response=>{
      this.setState({modalEliminar:false});
      this.peticionGet();
    }).catch(error=>{
      console.log(error.message);
    })
  }
  modalInsertar=()=>{
    this.setState({modalInsertar:!this.state.modalInsertar});
  }
  seleccionarPais=(pais)=>{
    this.setState({
      tipoModal: 'actualizar',
      form:{
        id:pais.id,
        name: pais.name,
        shortName: pais.shortName
      }
    })
  }

  handleChange=async e=>{
      e.persist();
      await this.setState({
        form:{
          ...this.state.form,
          [e.target.name]: e.target.value
        }
      })
  }

  componentDidMount(){
    this.peticionGet();
  }
  render(){
    const {form}=this.state;
    
  return (
    
    <div className="App">
    <br /><br /><br />
    <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar País</button>
    <br /><br /><br/>
    
    <table className="table ">
      <thead>
        <tr>
          <th>ID</th>
          <th>País</th>
          <th>Indicativo</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map(country=>{
          return(
            <tr>
          <td>{country.id}</td>
          <td>{country.name}</td>
          <td>{country.shortName}</td>
          {/* <td>{new Intl.NumberFormat("en-EN").format(empresa.capital_bursatil)}</td> */}
          <td>
            <button className="btn btn-primary" onClick={()=>{this.seleccionarPais(country);this.modalInsertar();}}><FontAwesomeIcon icon={faEdit}/></button>
            <button className="btn btn-danger"onClick={()=>{this.seleccionarPais(country);this.setState({modalEliminar:true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>    
                {/* <button className="btn btn-primary" onClick={()=>{this.seleccionarEmpresa(empresa); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{this.seleccionarEmpresa(empresa); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button> */}
            </td>
          </tr>
          )
        })}
      </tbody>
    </table>
  

    <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                    <label htmlFor="nombre">id</label>
                    <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form?form.id: ''}/>
                    <br />
                    <label htmlFor="nombre">Nombre</label>
                    <input className="form-control" type="text" name="name" id="name" onChange={this.handleChange} value={form?form.name: ''}/>
                    <br />
                    <label htmlFor="nombre">Indicativo</label>
                    <input className="form-control" type="text" name="shortName" id="shortName" onChange={this.handleChange} value={form?form.shortName: ''}/>
                    <br />
                  </div>
                </ModalBody>

                <ModalFooter>
                  {this.state.tipoModal==='insertar'?
                    <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                    Insertar
                  </button>: <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                    Actualizar
                  </button>
                  }
                  <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
              </ModalFooter>
          </Modal>

          <Modal isOpen={this.state.modalEliminar}>
            <ModalBody>
               Estás seguro que deseas eliminar a la empresa {form && form.nombre}
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
              <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
            </ModalFooter>
          </Modal>
  </div>
  );
}
}
