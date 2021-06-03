export const renameTrip = (tripId, name) => {
    return (dispatch) => {
        dispatch({ type: "START_RENAME_TRIP_REQUEST" });
        fetch(`http://localhost:3000/trips/${tripId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            },
            body: JSON.stringify({ name: name })
        })
            .then(res => res.json())
            .then(name => dispatch({ type: "RENAME_TRIP", tripId, name }))
    }
}