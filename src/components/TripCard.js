import React from "react";

import { connect } from "react-redux";
import { deleteTrip } from "../redux/actions/deleteTrip";
import DestinationCard from "./DestinationCard";

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';

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
}));

const confirmDelete = () => window.confirm("Are you sure you want to delete this trip and all of its destinations?");

const TripCard = (props) => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [selectedDestination, setSelectedDestination] = React.useState("");

    const handleClickOpen = (destination) => {
        setOpen(true);
        setSelectedDestination(destination);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                                                onClick={() => handleClickOpen(destination)}
                                            />
                                            <Dialog open={open} onClose={handleClose}>
                                                <DestinationCard destination={selectedDestination} trip={props} onClose={handleClose} />
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
                            onClick={() => confirmDelete() && props.deleteTrip(props.tripId)}
                            variant="contained"
                            size="small"
                            color="secondary"
                            startIcon={<DeleteIcon />}>
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
        deleteTrip: (tripId) => dispatch(deleteTrip(tripId))
    }
}

export default connect(null, mapDispatchToProps)(TripCard);