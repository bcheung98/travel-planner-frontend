import React, { useEffect } from "react";

import { connect } from "react-redux";
import { addDestination } from "../redux/actions/addDestination";
import { deleteDestination } from "../redux/actions/deleteDestination";
import { fetchTrips } from "../redux/actions/fetchTrips";

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
        height: 650
    },
});

const DestinationCard = (props) => {
    const classes = useStyles();
    let { name, location, country, image, description } = props.destination;

    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState("");

    useEffect(() => {
        props.fetchTrips();
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
        console.log(value);
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
                        <Button onClick={() => props.delete_destination(props.destination)} variant="contained" size="small" color="secondary">Remove Destination</Button>
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
        add_destination: (destination) => dispatch(addDestination(destination)),
        delete_destination: (destination) => dispatch(deleteDestination(destination)),
        fetchTrips: () => dispatch(fetchTrips())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DestinationCard);