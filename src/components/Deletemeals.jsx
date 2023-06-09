import { useEffect, useState } from "react";
import axios from "axios";

export default function Deletemeals() {
    const [meals, setMeals] = useState([])

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

        const handleSubmit = async (e) => {
            e.preventDefault();
            const selectedMeals = meals.filter((meal) => meal.selected);
            const mealIds = selectedMeals.map((meal) => meal.id);
            // axios.defaults.headers.common['Authorization'] = `${localStorage.getItem('jwt')}`;
            // let JSONmealData = JSON.stringify(mealData, (key, value) => {
            //     if (key === "ingredient_ids" && Array.isArray(value)) {
            //       return value.map(Number); // Convert array elements to numbers
            //     }
            //     return value;
            //   });
            console.log(mealIds);
            
            try {
                mealIds.forEach( async (id) => {
                    const response = await axios.delete(`http://localhost:4000/meals/${id}`);
                    console.log('Deleted', response.data);
                })
    
            // Perform any necessary actions upon successful creation
            } catch (error) {
                console.log('Error deleting meal:', error);
            }
        };

    const handleCheckboxChange = (event, mealId) => {
        const { checked } = event.target;
        setMeals((prevMeals) =>
            prevMeals.map((meal) => {
            if (meal.id === mealId) {
                return { ...meal, selected: checked };
            }
            return meal;
            })
        );
    };

    return(
        <form onSubmit={handleSubmit}>
        <div>
        <p>Your Meals:</p>
        {meals.map((meal) => (
          <div key={meal.id}>
            <label htmlFor={meal.id}>
                <input
                    type="checkbox"
                    id={meal.id}
                    name="meal_ids"
                    value={meal.id}
                    onChange={(e) => handleCheckboxChange(e, meal.id)}
                />
                {meal.name}
            </label>
          </div>
        ))}
      </div>
      <div>
        <button type="submit">Delete Meals</button>
      </div>
      </form>
    )
} 