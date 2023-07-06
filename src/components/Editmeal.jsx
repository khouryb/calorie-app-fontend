import { useEffect, useState } from "react";
import axios from "axios";

export default function Editmeal() {
    const [meals, setMeals] = useState([])
    const [editing, setEditing] = useState(false)
    const [name, setName] = useState('')

    useEffect(() => {
        // Fetch ingredients from the backend API
        const fetchMeals = async () => {
          try {
            const response = await axios.get('http://localhost:4000/meals');
            setMeals(response.data);
            console.log(response)
          } catch (error) {
            console.log(meals)
            console.log('Error fetching meals:', error);
          }
        };
    
        fetchMeals();
        }, []);

        const handleEdit = () => {
            setEditing(true)
        }

        const handleUpdatedDone = async (id) => {
             
                try {
                    const response = await axios.put(`http://localhost:4000/meals/`, {name: 'something else'})
                    console.log('Updated', response)
                    } catch (error) {
                        console.log(error)
                    }
              
            
          };


        const updateName = (name, id) => {
            
            setName(
                meals.map((meal) => {
                  if (meal.id === id) {
                    meal.name = name;
                  }
                  return meal;
                })
          )

        }

    return (
        <div>
            <h3>Edit Meals</h3>
            {meals.map((meal) => (
          <div key={meal.id}>
            {editing ? 
            (<input 
                type='text'
                name='name'
                value={meal.name}
                onChange={(e) => updateName(e.target.value, meal.id)}
                
            />) :
            (<p onClick={handleEdit}>{meal.name}</p>)}
          </div>
        ))}
        <button onClick={handleUpdatedDone}></button>
        </div>
    )
}