import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getRecipe } from "../api/recipes";
import type { Recipe } from "../types/recipe";

function RecipeDetailPage() {
    const { recipeId } = useParams();

    const [recipe, setRecipe] = useState<Recipe | null>(null);

    useEffect(() => {
        if (!recipeId) {
            return;
        }

        getRecipe(Number(recipeId))
            .then(setRecipe);
    }, [recipeId]);

    if (!recipe) {
        return <p>Loading recipe...</p>;
    }

    return (
        <div>
            <h1>{recipe.name}</h1>

            <h2>Ingredients</h2>

            <p>No ingredients added yet.</p>

            <button>
                Add Ingredient
            </button>
        </div>
    );
}

export default RecipeDetailPage;