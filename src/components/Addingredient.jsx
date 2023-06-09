import { useState } from "react"
import axios from "axios"
import Deleteingredient from "./Deleteingredient"

export default function Addingredient() {
    const [formData, setFormData] = useState({
        name: "",
        protein: undefined,
        carbs: undefined,
        fat: undefined,
        calories: undefined
    })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
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
        } catch(error) {
            console.log(`This is the error: ${error}`);
        }
    }

    return(
        <>
            <h1>Add an Ingredient</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Protein</label>
                    <input
                        type="text"
                        name="protein"
                        value={formData.protein}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Carbohydrates</label>
                    <input
                        type="text"
                        name="carbs"
                        value={formData.carbs}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Fat</label>
                    <input
                        type="text"
                        name="fat"
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
            <Deleteingredient />
        </>
    )
}