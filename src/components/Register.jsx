import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { createUser } from '../api/signup.js'

export default function Register() {
    const nav = useNavigate()
    const [userHasAuthenticated, setUserHasAuthenticated] = useState(false)
    const [formData, setFormData] = useState({user: {
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        dob: '',
        height: null,
        weight: null,
        sex: '',
        activity_level: null
    }})

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(formData.activity_level)
        createUser(formData)
        nav('/dashboard')
    }

    return(
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>First name:</label>
                    <input
                        id='first-name'
                        name='firstname'
                        value={formData.firstname}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        id='last-name'
                        name='lastname'
                        value={formData.lastname}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Date of Birth:</label>
                    <input
                        type='date'
                        id='dob'
                        name='dob'
                        value={formData.dob}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Height:</label>
                    <input
                        type='number'
                        id='height'
                        name='height'
                        value={formData.height}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Weight:</label>
                    <input
                        type='number'
                        id='weight'
                        name='weight'
                        value={formData.weight}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Sex: </label>
                    <label>Male</label>
                    <input
                        type='radio'
                        id='male'
                        name='sex'
                        value='m'
                        onChange={handleChange}
                    />
                    <label>Female</label>
                    <input
                        type='radio'
                        id='female'
                        name='sex'
                        value='f'
                        onChange={handleChange}
                    />
                </div>
                <div>
                <label>Activity Level: </label>
                    <label>Low</label>
                    <input
                        type='radio'
                        name='activity_level'
                        value='1'
                        onChange={handleChange}
                    />
                    <label>Medium</label>
                    <input
                        type='radio'
                        name='activity_level'
                        value='2'
                        onChange={handleChange}
                    />
                    <label>High</label>
                    <input
                        type='radio'
                        name='activity_level'
                        value='3'
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <button>Register</button>
                </div>
            </form>
        </div>
    )
}