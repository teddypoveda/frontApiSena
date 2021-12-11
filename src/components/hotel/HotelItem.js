import React from 'react'
import { Stack, Button, Card, Badge, Spinner, Tooltip,Image, OverlayTrigger } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { uiOpenModalDelete,uiOpenModalHotelId } from '../../actions/ui';

//{id, country, name, address, rating, countryId}

export const HotelItem = (props) => {
    const dispatch = useDispatch();
    const Update = (guid)=>(dispatch(uiOpenModalHotelId(guid))); 
    const Delete = (guid)=>(dispatch(uiOpenModalDelete(guid))); 

    if (props.id==='') {
        return (<Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
    </Spinner>);
    }

    
    return (
       
        <Card 
        bg='Primary'
        key={props.id}
        text='dark'
        style={{ width: '18rem' }} 
        className="mb-2 card animate__animated animate__bounce shadow p-3 mb-5 bg-body rounded"
        >
        <Card.Body>
            <Card.Title>{props.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{props.address}</Card.Subtitle>
            <Card.Text className="mb-2 text-muted">
            Rating:<Badge pill bg="info">{props.rating} </Badge>
            </Card.Text>
            <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="button-tooltip-2">Revisar datos del hotel</Tooltip>}
            >
                {({ ref, ...triggerHandler }) => (
                <Button
                    variant="light"
                    {...triggerHandler}
                    className="d-inline-flex align-items-center"
                >
                    <Image
                    ref={ref}
                    roundedCircle
                    src="holder.js/20x20?text=J&bg=28a745&fg=FFF"
                    />
                    <span className="ms-1">Saber mas...</span>
                </Button>
                )}
  </OverlayTrigger>
            <Stack gap={2} className="col-md-8 mx-auto">
                <Button size="sm" onClick={()=>Update(props)}>editar</Button>
                <Button variant="danger" size="sm" onClick={()=>Delete(props.id)}>eliminar</Button>
            </Stack>
        </Card.Body>
        </Card>
    )
}
