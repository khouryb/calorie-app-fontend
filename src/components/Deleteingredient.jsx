import { useEffect, useState } from 'react'
import axios from 'axios';


export default function Deleteingredient() {
    const [ingredients, setIngredients] = useState([])


    // Fetch ingredients from the backend API
    const fetchIngredients = async () => {
      try {
        const response = await axios.get('http://localhost:4000/ingredients');
        setIngredients(response.data);
        console.log(response)
      } catch (error) {
        console.log('Error fetching ingredients:', error);
      }
    };

    useEffect(() => {

      fetchIngredients();
        
    }, []);

    const handleCheckboxChange = (event, ingredientId) => {
        const { checked } = event.target;
        setIngredients((prevIngredients) =>
          prevIngredients.map((ingredient) => {
            if (ingredient.id === ingredientId) {
              return { ...ingredient, selected: checked };
            }
            return ingredient;
          })
        );
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const selectedIngredients = ingredients.filter((ingredient) => ingredient.selected);
        const ingredientIds = selectedIngredients.map((ingredient) => ingredient.id);
        // axios.defaults.headers.common['Authorization'] = `${localStorage.getItem('jwt')}`;
        // let JSONmealData = JSON.stringify(mealData, (key, value) => {
        //     if (key === "ingredient_ids" && Array.isArray(value)) {
        //       return value.map(Number); // Convert array elements to numbers
        //     }
        //     return value;
        //   });
        console.log(ingredientIds);
        
        try {
            ingredientIds.forEach( async (id) => {
                const response = await axios.delete(`http://localhost:4000/ingredients/${id}`);
                console.log('Deleted', response.data);
            })
            fetchIngredients()
        // Perform any necessary actions upon successful creation
        } catch (error) {
            console.log('Error deleting meal:', error);
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <div>
            <p>Select Ingredients:</p>
                {ingredients.map((ingredient) => (
                  <div key={ingredient.id}>
                    <label htmlFor={ingredient.id}>
                      <input
                        type="checkbox"
                        id={ingredient.id}
                        name="id"
                        value={ingredient.id}
                        onChange={(e) => handleCheckboxChange(e, ingredient.id)}
                      />
                      {ingredient.name}
                    </label>
                  </div>
                ))}
            </div>
            <button type="submit">Delete Ingredient</button>
            </form>
          );
}