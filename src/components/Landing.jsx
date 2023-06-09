import { Link } from "react-router-dom"
import "../styles/Landing.css"
import { useState, useEffect } from "react"


export default function Landing() {
    const [showContent, setShowContent] = useState(false);

    // I'm going to leave this function in here because i might change my minf about the timeout
    useEffect(() => {
        setShowContent(true);
    }, []);

    return(
        <div className={`fade-in ${showContent ? 'active' : ''}`}>  
            <div className={`slide-in-left ${showContent ? 'active' : ''}`}>
                <h1>Calorie Counter 3000</h1>
            </div>
            <div className={`slide-in-right ${showContent ? 'active' : ''}`}>
                <ul>
                    <li><Link to="/login">Log in</Link></li>
                    <li><Link to="/signup">Register</Link></li>
                </ul>
            </div>
        </div>
    )
}