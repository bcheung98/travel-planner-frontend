export const deleteDestination = (destination) => {
    return (dispatch) => {
        dispatch({ type: "START_DELETING_DESTINATIONS_REQUEST" });
        fetch(`http://localhost:3000/trip_destinations/${destination.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(() => dispatch({ type: "DELETE_DESTINATION", destination }));
    }
}