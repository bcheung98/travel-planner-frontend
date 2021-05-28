import React, { useEffect } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { createTrip } from "../redux/actions/createTrip";
import { fetchTrips } from "../redux/actions/fetchTrips";

import TripCard from "./TripCard";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 750,
        display: "grid",
        // gridTemplateColumns: "auto auto auto"
    },
}));

const TripList = (props) => {
    const classes = useStyles();

    useEffect(() => {
        fetchTrips();
    }, [])
    let { trips, createTrip, fetchTrips } = props;

    return (
        <div className={classes.root}>
            {trips.trips.map(trip => <TripCard key={trip.id} name={trip.name} destinations={trip.destinations} />)}
            <Button onClick={() => createTrip()} variant="contained" size="small" color="primary">
                New Trip
            </Button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        trips: state.trip
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createTrip: () => dispatch(createTrip()),
        fetchTrips: () => dispatch(fetchTrips())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TripList));