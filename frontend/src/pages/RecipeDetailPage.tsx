import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getRecipeDetails, addRecipeIngredient } from "../api/recipes";
import type { RecipeDetail } from "../types/recipe_ingredient";


function RecipeDetailPage() {
    const { recipeId } = useParams();

    const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [ingredientName, setIngredientName] = useState("");
    const [quantityRequired, setQuantityRequired] = useState(0);

    useEffect(() => {
        if (!recipeId) {
            return;
        }

        getRecipeDetails(Number(recipeId))
            .then(setRecipe);
    }, [recipeId]);

    if (!recipe) {
        return <p>Loading recipe...</p>;
    }

    async function handleAddIngredient() {
    if (!recipeId || !ingredientName.trim()) {
        return;
    }

    await addRecipeIngredient(
        Number(recipeId),
        ingredientName.trim(),
        quantityRequired,
    );

    const updatedRecipe = await getRecipeDetails(
        Number(recipeId)
    );

    setRecipe(updatedRecipe);

    setIngredientName("");
    setQuantityRequired(0);
    setIsAdding(false);
}

    return (
        <div>
            <h1>{recipe.name}</h1>

            <h2>Ingredients</h2>

            {recipe.ingredients.length === 0 ? (
                <p>No ingredients added yet.</p>
            ) : (
                <ul>
                    {recipe.ingredients.map((ingredient) => (
                        <li key={ingredient.id}>
                            {ingredient.name} - {ingredient.quantity_required}
                        </li>
                    ))}
                </ul>
            )}

            {!isAdding ? (
    <button onClick={() => setIsAdding(true)}>
        Add Ingredient
    </button>
) : (
    <div>
        <input
            type="text"
            value={ingredientName}
            placeholder="Ingredient name"
            onChange={(event) =>
                setIngredientName(event.target.value)
            }
        />

        <input
            type="number"
            value={quantityRequired}
            min="0"
            onChange={(event) =>
                setQuantityRequired(
                    Number(event.target.value)
                )
            }
        />

        <button onClick={handleAddIngredient}>
            Save
        </button>

        <button
            onClick={() => {
                setIngredientName("");
                setQuantityRequired(0);
                setIsAdding(false);
            }}
        >
            Cancel
        </button>
    </div>
)}
        </div>
    );
}

export default RecipeDetailPage;