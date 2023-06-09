import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Logoutbutton() {
    const nav = useNavigate();
    
    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('jwt');
            const response = await axios.delete('http://localhost:4000/logout', { 
                headers: {
                    "Authorization": `${token}`,
                    "Content-Type": "application/json"
                }
            })
            localStorage.removeItem("jwt");
            nav("/")
        } catch (error) {
            console.log("Logout failed:", error);
        }
    }

    return (
        <button onClick={handleLogout}>Logout</button>
    )
};