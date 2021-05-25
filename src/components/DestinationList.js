import React from "react";
import DestinationCard from "./DestinationCard";

const DestinationList = (props) => {
    return (
        <div>
            {props.destinations.map(d => <DestinationCard key={d.id} destination={d} />)}
        </div>
    )
}

export default DestinationList;