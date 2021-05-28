export const deleteTrip = (tripId) => {
    return (dispatch) => {
        dispatch({ type: "START_DELETING_TRIP_REQUEST"});
        fetch(`http://localhost:3000/trips/${tripId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(() => dispatch({ type: "DELETE_TRIP", tripId}));
    }
}