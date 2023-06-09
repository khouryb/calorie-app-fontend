import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { signIn } from "../api/login"
import axios from "axios"


export default function Login() {
    const [wrongPassword, setWrongPassword] = useState(false)
    const nav = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = JSON.stringify({
            user: {
              email: `${formData.email}`,
              password: `${formData.password}`,
            },
          });

          try {
            const response = await axios.post(`http://localhost:4000/login`, user, {
            headers: {
                "Content-Type": "application/json"
            }});
            console.log(response)
            localStorage.setItem("jwt", response.headers.authorization);
            localStorage.setItem("id", response.data.data.id)
            nav("/dashboard");
          } catch (error) {
            setWrongPassword(true)
            console.log(`This is the error: ${error}`);
          }
    }

    
    return(
        <>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
            />
            <div>
            <label>Password:</label>
            <input 
                type='password' 
                id='password' 
                name='password' 
                value={formData.password} 
                onChange={handleChange} />
            </div>
            <div>
                <button>Submit</button>
            </div>
            {wrongPassword ? (
                <p>Incorrect Password</p>
            ) : (
                <p>Please Log In</p>
            )}
        </form>
        </>
    )
}