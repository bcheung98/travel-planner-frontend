import { Typography } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router";

const Profile = (props) => {
    return (
        <div>
            <Typography>
                My Profile
            </Typography>
        </div>
    )
}

export default withRouter(Profile);