import "./navigationStyle.css"
import { Outlet , Link} from "react-router-dom"

export default function Nav() {
    return(
        <div className="page">
        <ul className="nav">
            <li><Link to={"/"}>Todo</Link></li>
            <li><Link to={"/post"}>Posts</Link></li>
            <li><Link to={"/users"}>Users</Link></li>
        </ul>
        <div className="show-element">
            <Outlet />
        </div>
        </div>
    )
}