import React from "react";
import { connect } from "react-redux";

class DestinationList extends React.Component {

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
                {console.log(this.props.destinations)}
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        destinations: state.destination.destinations
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        get_destination: (destinations) => dispatch({ type: "GET_DESTINATIONS", destinations })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DestinationList);