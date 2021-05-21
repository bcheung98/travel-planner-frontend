import React from "react";
import { withRouter } from "react-router"
import { connect } from "react-redux";
import DestinationList from "./DestinationList";

class MainContainer extends React.Component {

    componentDidMount() {
        fetch("http://localhost:3000/destinations", {
            method: "GET",
            headers: {
                "token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(destinations => this.props.get_destination(destinations));
    }

    render() {
        return (
            <div>
                <DestinationList destinations={this.props.destinations} />
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        destinations: state.destination
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        get_destination: (destinations) => dispatch({ type: "GET_DESTINATIONS", payload: destinations })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainContainer));