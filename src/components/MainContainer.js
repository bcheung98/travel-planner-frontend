import { withRouter } from "react-router"
import DestinationList from "./DestinationList";

const MainContainer = () => {
    return (
        <div>
            <DestinationList />
        </div>
    )
}

export default withRouter(MainContainer);