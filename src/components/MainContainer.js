import React, { useEffect } from "react";
import { withRouter } from "react-router"
import { connect } from "react-redux";
import { fetchDestinations } from "../redux/actions/fetchDestinations";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DestinationList from "./DestinationList";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 750,
        display: "grid",
        // gridTemplateColumns: "auto auto auto"
    },
}));

const filterDestinations = (countryFilter, destinations) => {
    let filteredDestinations = [...destinations];
    if (countryFilter !== "all" && countryFilter !== null) {
        filteredDestinations = destinations.filter(destination => countryFilter === destination.country);
    }
    return filteredDestinations;
}

const MainContainer = (props) => {

    useEffect(() => {
        fetchDestinations();
    }, [])
    let { destinations, fetchDestinations } = props;

    const classes = useStyles();

    const [countryValue, setCountryValue] = React.useState(destinations.destinations[0]);
    const [countryInputValue, setCountryInputValue] = React.useState("");
    const [countryFilter, setCountryFilter] = React.useState("all");

    return (
        <div>
            <div className={classes.paper}>
                <Autocomplete
                    style={{ margin: "20px" }}
                    value={countryValue}
                    onChange={(e, newValue) => {
                        setCountryValue(newValue);
                        setCountryFilter(newValue);
                    }}
                    inputValue={countryInputValue}
                    onInputChange={(e, newInputValue) => {
                        setCountryInputValue(newInputValue);
                    }}
                    options={[... new Set(destinations.destinations.map((destination) => destination.country))]}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => <TextField {...params} label={"Country"} variant="outlined" />}
                />
            </div>
            <DestinationList destinations={filterDestinations(countryFilter, destinations.destinations)} />
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