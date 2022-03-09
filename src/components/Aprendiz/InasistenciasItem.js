import React from 'react'
import { Stack, Button, Card, Badge, Spinner, Tooltip,Image, OverlayTrigger } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { uiModalJustificacion } from '../../actions/ui';
import { ResourceModalJustificacion } from './modal/ResourceModalJustificacion';



export const InasistenciasItem = (props) => {
    const dispatch = useDispatch();
    /* const Update = (guid)=>(dispatch(uiOpenModalHotelId(guid))); 
    const Delete = (guid)=>(dispatch(uiOpenModalDelete(guid)));  */

    if (props.id==='') {
        return (<Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
    </Spinner>);
    } 
    const send= (id)=>{
        dispatch(uiModalJustificacion(id))
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
            <Card.Title>{props.clase.nombre}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{<input type="datetime-local" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={props.clase.fechaHora} disabled></input>}</Card.Subtitle>
            <Card.Text className="mb-2 text-muted">
            Aula:<Badge pill bg="info">{props.clase.aula} </Badge><br/><br/>
            Estado de la Inasistencia:{props.estadoAsistenciaId===1&&<Badge pill bg="danger">Sin Justificar</Badge>||props.estadoAsistenciaId===2&&<Badge pill bg="success">Justificada</Badge>} <br/>
            </Card.Text>
            <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="button-tooltip-2">Agregar Justificación</Tooltip>}
            >
                {({ ref, ...triggerHandler }) => (
                props.estadoAsistenciaId===1&&<Button
                    onClick={send(props.id)}
                    variant="light"
                    {...triggerHandler}
                    className="d-inline-flex align-items-center"
                >
                    <Image
                    ref={ref}
                    roundedCircle
                    className='w-25 h-25'
                    src="https://e7.pngegg.com/pngimages/223/657/png-clipart-computer-icons-email-attachment-attach-text-trademark.png"
                    />
                    <span className="ms-1">Agregar Justificación...</span>
                    
                </Button>
                )}
            </OverlayTrigger>
            <Stack gap={2} className="col-md-8 mx-auto">
                {/* <Button size="sm" onClick={()=>Update(props)}>editar</Button>
                <Button variant="danger" size="sm" onClick={()=>Delete(props.id)}>eliminar</Button> */}
            </Stack>
        </Card.Body> 
        </Card>
        <ResourceModalJustificacion/>
       </>
       
    )
}
