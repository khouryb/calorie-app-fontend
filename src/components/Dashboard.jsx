import Logoutbutton from "./Logoutbutton";
import Deleteuser from "./Deleteuser";
import { Link } from "react-router-dom";

export default function Dashboard() {
    return(
        <>
            <nav>
                <ul>
                    <li><Logoutbutton /></li>
                    <li><Deleteuser /></li>
                    <li><Link to="/ingredients">Add Ingredient</Link></li>
                    <li><Link to="/meals">Meals</Link></li>
                </ul>
            </nav>
            <h1>Dashboard</h1>
        </>
    )
}