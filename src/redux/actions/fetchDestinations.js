export const fetchDestinations = () => {
    return (dispatch) => {
        dispatch({ type: "START_ADDING_DESTINATIONS_REQUEST" });
        fetch("http://localhost:3000/destinations", {
            method: "GET",
            headers: {
                "token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(destinations => dispatch({ type: "GET_DESTINATIONS", destinations }));
    }
}