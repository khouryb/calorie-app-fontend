import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Deleteuser() {

   const handleSubmit = async (e) => {
        const userID = localStorage.getItem('id')
        
        try {
            const response = await axios.delete(`http://localhost:4000/users/${userID}`);
        } catch (err) {
            console.log('error deleting user', err)
        }
    }

    return(
        <div>
            <button onClick={handleSubmit}>Delete Account</button>
        </div>
    )
}