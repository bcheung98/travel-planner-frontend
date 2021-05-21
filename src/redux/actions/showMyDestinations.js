export const showMyDestinations = () => {
    return (dispatch) => {
        dispatch({ type: "START_GETTING_USER_DESTINATIONS_REQUEST" });
        fetch("http://localhost:3000/my-destinations", {
            method: "GET",
            headers: {
                "token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(destinations => dispatch({ type: "GET_USER_DESTINATIONS", destinations }));
    }
}