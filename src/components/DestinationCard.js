import React, { useEffect } from "react";

import { connect } from "react-redux";
import { addDestination } from "../redux/actions/addDestination";
import { deleteDestination } from "../redux/actions/deleteDestination";
import { fetchTrips } from "../redux/actions/fetchTrips";
import { createTrip } from "../redux/actions/createTrip";
import SelectTrip from "./SelectTrip";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Dialog from '@material-ui/core/Dialog';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const useStyles = makeStyles({
    root: {
        margin: "auto",
        marginBottom: 20,
        maxWidth: 500,
    },
    media: {
        height: 625
    },
    mapOverlay: {
        width: "100vh",
        height: "95vh"
    }
});

const DestinationCard = (props) => {
    const classes = useStyles();
    let { name, location, country, latitude, longitude, image, description } = props.destination;

    const [open, setOpen] = React.useState(false);
    const [openMap, setOpenMap] = React.useState(false);

    useEffect(() => {
        props.fetchTrips();
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        if (value === "newTrip") {
            props.createTrip();
        }
        else {
            props.addDestination(value, props.destination);
        }
    };

    const openMapOverlay = () => {
        setOpenMap(true);
    }

    const closeMapOverlay = () => {
        setOpenMap(false);
    }

    return (
        <Card className={classes.root} variant="outlined">
            <CardHeader
                title={
                    <Typography gutterBottom variant="h5" component="h2">{name}</Typography>
                }
                subheader={
                    <Typography variant="body2" component="p">{location}, {country}</Typography>
                }
            />
            <CardMedia
                className={classes.media}
                image={image}
                title={name}
            />
            <CardContent>
                <Typography variant="body2" component="p">{description}</Typography>
            </CardContent>
            <CardActions>
                {
                    window.location.pathname === "/browse" ?
                        <>
                            <Button onClick={handleClickOpen} variant="contained" size="small" color="primary">Add Destination</Button>
                            <SelectTrip open={open} onClose={handleClose} />
                        </>
                        :
                        <Button
                            onClick={() => {
                                props.deleteDestination(props.trip, props.destination)
                                props.onClose()
                            }}
                            variant="contained"
                            size="small"
                            color="secondary"
                            startIcon={<CloseIcon />}
                        >
                            Remove From Trip
                        </Button>
                }
                <Button
                    onClick={() => openMapOverlay()}
                    variant="contained"
                    size="small"
                    color="primary"
                    startIcon={<LocationOnIcon />}>
                    View on Map
                        </Button>
                <Dialog open={openMap} onClose={closeMapOverlay}>
                    <div className={classes.mapOverlay}>
                        <MapContainer center={[latitude, longitude]} zoom={12}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                            />
                            <Marker key={props.destination.id} position={[latitude, longitude]}>
                                <Popup>
                                    <Typography variant="h5" component="h2">
                                        {name}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        {location}, {country}
                                    </Typography>
                                    <img src={image} style={{ width: "100%", height: "100%" }} alt={name} />
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                </Dialog>
            </CardActions>
        </Card>
    )
}

const mapStateToProps = (state) => {
    return {
        trips: state.trip
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addDestination: (trip, destination) => dispatch(addDestination(trip, destination)),
        deleteDestination: (trip, destination) => dispatch(deleteDestination(trip, destination)),
        createTrip: () => dispatch(createTrip()),
        fetchTrips: () => dispatch(fetchTrips())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DestinationCard);