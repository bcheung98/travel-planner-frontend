import React from "react";

import { connect } from "react-redux";
import { renameTrip } from "../redux/actions/renameTrip";
import { deleteTrip } from "../redux/actions/deleteTrip";
import DestinationCard from "./DestinationCard";

import { makeStyles, StylesProvider } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MapIcon from '@material-ui/icons/Map';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const useStyles = makeStyles((theme) => ({
    root: {
        border: '1px solid rgba(0, 0, 0, .25)',
        borderRadius: "2px",
        width: 750,
        margin: "auto",
        marginBottom: 20,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '33.33%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 2),
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
            cursor: "pointer"
        },
    },
    formOverlay: {
        width: "300px",
        height: "150px"
    },
    form: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    mapOverlay: {
        width: "100vh",
        height: "95vh"
    }
}));

const confirmDelete = () => window.confirm("Are you sure you want to delete this trip and all of its destinations?");

const TripCard = (props) => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [selectedDestination, setSelectedDestination] = React.useState("");
    const [openForm, setOpenForm] = React.useState(false);
    const [inputValue, setInputValue] = React.useState(props.name);
    const [openMap, setOpenMap] = React.useState(false);

    const openDestinationCard = (destination) => {
        setOpen(true);
        setSelectedDestination(destination);
    };

    const closeDestinationCard = () => {
        setOpen(false);
    };

    const openRenameForm = () => {
        setOpenForm(true);
    }

    const closeRenameForm = () => {
        setOpenForm(false);
    }

    const openMapOverlay = () => {
        setOpenMap(true);
    }

    const closeMapOverlay = () => {
        setOpenMap(false);
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    return (
        <div>
            <div className={classes.root}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1c-content"
                        id="panel1c-header"
                    >
                        <div className={classes.column}>
                            <Typography className={classes.heading}>{props.name}</Typography>
                        </div>
                        <div className={classes.column}>
                            <Typography className={classes.secondaryHeading}></Typography>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails className={classes.details}>
                        <List>
                            {props.destinations !== undefined && props.destinations.length > 0 ?
                                props.destinations.map(destination => {
                                    return (
                                        <ListItem key={destination.name}>
                                            <ListItemText
                                                className={classes.link}
                                                primary={destination.name}
                                                secondary={`${destination.location}, ${destination.country}`}
                                                onClick={() => openDestinationCard(destination)}
                                            />
                                            <Dialog open={open} onClose={closeDestinationCard}>
                                                <DestinationCard destination={selectedDestination} trip={props} onClose={closeDestinationCard} />
                                            </Dialog>
                                        </ListItem>
                                    )
                                })
                                :
                                <ListItem>
                                    <ListItemText
                                        primary="No destinations for this trip!"
                                    />
                                </ListItem>
                            }
                        </List>
                    </AccordionDetails>
                    <Divider />
                    <AccordionActions>
                        <Button
                            onClick={() => openMapOverlay()}
                            variant="contained"
                            size="small"
                            color="primary"
                            startIcon={<MapIcon />}
                        >
                            View Trip
                        </Button>
                        <Dialog open={openMap} onClose={closeMapOverlay}>
                            <div className={classes.mapOverlay}>
                                <MapContainer center={[0, 0]} zoom={2}>
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                                    />
                                    {props.destinations !== undefined && props.destinations.map(destination => {
                                        return (
                                            <Marker key={destination.id} position={[destination.latitude, destination.longitude]}>
                                                <Popup>
                                                    <Typography variant="h5" component="h2">
                                                        {destination.name}
                                                    </Typography>
                                                    <Typography variant="body2" component="p">
                                                        {destination.location}, {destination.country}
                                                    </Typography>
                                                    <img src={destination.image} style={{ width: "100%", height: "100%" }} />
                                                </Popup>
                                            </Marker>
                                        )
                                    })}
                                </MapContainer>
                            </div>
                        </Dialog>
                        <Button
                            onClick={() => openRenameForm()}
                            variant="contained"
                            size="small"
                            color="primary"
                            startIcon={<EditIcon />}
                        >
                            Rename Trip
                        </Button>
                        <Dialog open={openForm} onClose={closeRenameForm} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Rename Trip</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Trip Name"
                                    defaultValue={props.name}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={closeRenameForm} color="secondary">
                                    Cancel
                                </Button>
                                <Button onClick={() => {
                                    props.renameTrip(props.tripId, inputValue);
                                    closeRenameForm();
                                }} color="primary">
                                    Rename Trip
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Button
                            onClick={() => confirmDelete() && props.deleteTrip(props.tripId)}
                            variant="contained"
                            size="small"
                            color="secondary"
                            startIcon={<DeleteIcon />}
                        >
                            Delete Trip
                        </Button>
                    </AccordionActions>
                </Accordion>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        renameTrip: (tripId, name) => dispatch(renameTrip(tripId, name)),
        deleteTrip: (tripId) => dispatch(deleteTrip(tripId))
    }
}

export default connect(null, mapDispatchToProps)(TripCard);