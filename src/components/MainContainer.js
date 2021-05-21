import React, { useEffect } from "react";
import { withRouter } from "react-router"
import { connect } from "react-redux";
import { fetchDestinations } from "../redux/actions/fetchDestinations";
import DestinationList from "./DestinationList";

const MainContainer = (props) => {

    let { destinations, fetchDestinations } = props

    useEffect(() => {
        fetchDestinations();
    }, [])

    return (
        <div>
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
        fetchDestinations: () => dispatch(fetchDestinations())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainContainer));