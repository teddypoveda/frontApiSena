import React from 'react'
import { Stack, Button, Card, Badge, Spinner, Tooltip,Image, OverlayTrigger } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { eventTomarAsistencia, uiModalAsistencia } from '../../../actions/events';
import { ResourceClasesModal } from '../Modal/TomarAsistenciaModal';
//import { uiOpenModalDelete,uiOpenModalHotelId } from '../../actions/ui';


export const ClasesItem = (props) => {
    const dispatch = useDispatch();
    /* const Update = (guid)=>(dispatch(uiOpenModalHotelId(guid))); 
    const Delete = (guid)=>(dispatch(uiOpenModalDelete(guid)));  */
    
    

    if (props.id==='') {
        return (<Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
    </Spinner>);
    } 

    
    return (
       <>
        <Card 
        bg='Primary'
        key={props.id}
        text='dark'
        style={{ width: '18rem' }} 
        className="mb-2 card animate__animated animate__bounce shadow p-3 mb-5 bg-body rounded"
        >
         <Card.Body>
            <Card.Title>{props.nombre}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{props.fichaId}</Card.Subtitle>
            <Card.Text className="mb-2 text-muted">
            Aula:<Badge pill bg="info">{props.aula} </Badge><br/><br/>
            Fecha y Hora de Incio:<input type="datetime-local" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={props.fechaHora} disabled></input>
            </Card.Text>
            <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="button-tooltip-2">Revisar Asistencia</Tooltip>}
            >
                {({ ref, ...triggerHandler }) => (
                <Button
                    variant="light"
                    {...triggerHandler}
                    className="d-inline-flex align-items-center"
                    onClick={()=>dispatch(uiModalAsistencia())}
                >
                    <Image
                    ref={ref}
                    roundedCircle
                    className='w-25 h-25'
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.vZMnJKWOUlv88PJs1mjI3AHaHa%26pid%3DApi&f=1"
                    />
                    <span className="ms-1">Asistencia...</span>
                </Button>
                )}
            </OverlayTrigger>
            <Stack gap={2} className="col-md-8 mx-auto">
                {/* <Button size="sm" onClick={()=>Update(props)}>editar</Button>
                <Button variant="danger" size="sm" onClick={()=>Delete(props.id)}>eliminar</Button> */}
            </Stack>
        </Card.Body> 
        </Card>
       
       <ResourceClasesModal nombreClase={props.nombre}/>
       </>
       
    )
}
