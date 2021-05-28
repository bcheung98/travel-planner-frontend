import React, { useEffect } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { createTrip } from "../redux/actions/createTrip";
import { fetchTrips } from "../redux/actions/fetchTrips";

import TripCard from "./TripCard";

import Button from '@material-ui/core/Button';

const TripList = (props) => {

    useEffect(() => {
        fetchTrips();
    }, [])
    let { trips, createTrip, fetchTrips } = props;

    return (
        <div>
            <br />
            <Button onClick={() => createTrip()} variant="contained" size="small" color="primary">
                New Trip
            </Button>
            {Object.entries(trips.trips).map(([name, trips]) => <TripCard key={name} name={name} trips={trips} />)}
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