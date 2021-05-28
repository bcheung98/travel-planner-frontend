export const fetchTrips = () => {
    return (dispatch) => {
        dispatch({ type: "START_GETTING_TRIPS_REQUEST" });
        fetch("http://localhost:3000/my-trips", {
            method: "GET",
            headers: {
                "token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(trips => dispatch({ type: "GET_TRIPS", trips }));
    }
}