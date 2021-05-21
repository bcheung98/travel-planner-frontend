import { Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { showMyDestinations } from "../redux/actions/showMyDestinations";
import DestinationList from "./DestinationList";

const Profile = (props) => {

    let { destinations, showMyDestinations } = props

    useEffect(() => {
        showMyDestinations();
    }, [])

    return (
        <div>
            <Typography>
                My Profile
            </Typography>
            <DestinationList destinations={destinations} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        destinations: state.destination
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showMyDestinations: () => dispatch(showMyDestinations())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile));