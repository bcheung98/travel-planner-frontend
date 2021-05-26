export const addDestination = (destination) => {
    return (dispatch) => {
        dispatch({ type: "START_ADDING_DESTINATIONS_REQUEST" });
        fetch("http://localhost:3000/user_destinations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            },
            body: JSON.stringify({ destination: destination })
        })
            .then(res => res.json())
            .then(destinations => dispatch({ type: "ADD_DESTINATION", destinations }));
    }
}