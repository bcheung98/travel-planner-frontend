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

const useStyles = makeStyles({
    root: {
        margin: "auto",
        marginBottom: 20,
        maxWidth: 500,
    },
    media: {
        height: 625
    },
});

const DestinationCard = (props) => {
    const classes = useStyles();
    let { name, location, country, image, description } = props.destination;

    const [open, setOpen] = React.useState(false);

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
                            color="secondary">
                            Remove From Trip
                        </Button>
                }
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