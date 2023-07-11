import { useState, useEffect } from "react"
import axios from "axios"
import Deleteingredient from "./Deleteingredient"
import { Link } from "react-router-dom"

export default function Addingredient() {
    const [ingredients, setIngredients] = useState([])

    const [formData, setFormData] = useState({
        name: "",
        protein: undefined,
        carbs: undefined,
        fat: undefined,
        calories: undefined
    })

    const fetchIngredients = async () => {
        try {
            const response = await axios.get('http://localhost:4000/ingredients')
            setIngredients(response.data)
            console.log(response.data)
        } catch(error) {
            console.error(error)
        }
    }

    useEffect(() => fetchIngredients,[])

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        const ingredient = JSON.stringify({
            name: `${formData.name}`,
            protein: `${formData.protein}`,
            carbs: `${formData.carbs}`,
            fat: `${formData.fat}`,
            calories: `${formData.calories}`
        })
        console.log(ingredient)
        try {
            const response = await axios.post(`http://localhost:4000/ingredients`, ingredient, {
            headers: {
                "Content-Type": "application/json"
            }});
            console.log(response)
        } catch(error) {
            console.log(`This is the error: ${error}`);
        }
    }

    return(
        <>
            <ul>
                <li><Link to='/dashboard'>Dashboard</Link></li>
            </ul>
            <h1>Add an Ingredient</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        autocomplete="off"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Protein</label>
                    <input
                        type="text"
                        name="protein"
                        autocomplete="off"
                        value={formData.protein}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Carbohydrates</label>
                    <input
                        type="text"
                        name="carbs"
                        autocomplete="off"
                        value={formData.carbs}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Fat</label>
                    <input
                        type="text"
                        name="fat"
                        autocomplete="off"
                        value={formData.fat}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Calories</label>
                    <input
                        type="text"
                        name="calories"
                        value={formData.calories}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <button>Add Ingredient</button>
                </div>
            </form>
            <div>
                <h3>Stored Ingredients</h3>
                {ingredients.map(ingredient => (
                    <div key={ingredient.id}>
                        <p>{`Name: ${ingredient.name} Carbs: ${ingredient.carbs} Protein: ${ingredient.protein} Fat: ${ingredient.fat}`}</p>
                    </div>
                ))}
            </div>
            <Deleteingredient />
        </>
    )
}