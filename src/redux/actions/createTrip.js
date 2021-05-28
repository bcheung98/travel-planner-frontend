export const createTrip = () => {
    return (dispatch) => {
        dispatch({ type: "START_CREATE_NEW_TRIP_REQUEST" });
        fetch("http://localhost:3000/trips", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(trip => dispatch({ type: "CREATE_NEW_TRIP", trip }));
    }
}