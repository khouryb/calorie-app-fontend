import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Createmeal() {
    const [ingredients, setIngredients] = useState([]);
    const [mealData, setMealData] = useState({
        name: '',
        ingredient_ids: [],
    });
    const [meals, setMeals] = useState([])

    useEffect(() => {
    // Fetch ingredients from the backend API
    const fetchIngredients = async () => {
      try {
        const response = await axios.get('http://localhost:4000/ingredients');
        setIngredients(response.data);
        console.log(response)
      } catch (error) {
        console.log(mealData)
        console.log('Error fetching ingredients:', error);
      }
    };

    fetchIngredients();
    }, []);

    useEffect(() => {
        // Fetch ingredients from the backend API
        const fetchMeals = async () => {
          try {
            const response = await axios.get('http://localhost:4000/meals');
            setMeals(response.data);
            console.log(response)
          } catch (error) {
            console.log(mealData)
            console.log('Error fetching ingredients:', error);
          }
        };
    
        fetchMeals();
        }, []);

    const handleInputChange = (e) => {
        setMealData({
            ...mealData,
            [e.target.name]: e.target.value,
        });
    };

    const handleIngredientSelection = (e) => {
        const { value, checked } = e.target;
        let updatedIngredients;

        if (checked) {
            updatedIngredients = [...mealData.ingredient_ids, value];
        } else {
            updatedIngredients = mealData.ingredient_ids.filter(
        (ingredient) => ingredient !== value
      );
    }

        setMealData({
            ...mealData,
            ingredient_ids: updatedIngredients,
        });
        console.log(mealData)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.defaults.headers.common['Authorization'] = `${localStorage.getItem('jwt')}`;
        let JSONmealData = JSON.stringify(mealData, (key, value) => {
            if (key === "ingredient_ids" && Array.isArray(value)) {
              return value.map(Number); // Convert array elements to numbers
            }
            return value;
          });

        console.log(JSONmealData);
        try {
            const response = await axios.post('http://localhost:4000/meals', JSONmealData, {
                headers: {
                    "Content-Type": "application/json"
                }});
            setMealData({name: ''})
            console.log('Meal created:', response.data);
        // Perform any necessary actions upon successful creation
        } catch (error) {
            console.log('Error creating meal:', error);
        }
    };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Meal Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={mealData.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <p>Select Ingredients:</p>
        {ingredients.map((ingredient) => (
          <div key={ingredient.id}>
            <label htmlFor={ingredient.id}>
              <input
                type="checkbox"
                id={ingredient.id}
                name="ingredient_ids"
                value={ingredient.id}
                onChange={handleIngredientSelection}
              />
              {ingredient.name}
            </label>
          </div>
        ))}
      </div>

      <button type="submit">Create Meal</button>
    </form>
    </>
    
  );
}