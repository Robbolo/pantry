import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getRecipeDetails } from "../api/recipes";
import type { RecipeDetail } from "../types/recipe_ingredient";

import RecipeIngredientForm from "../components/RecipeIngredientForm";
import RecipeIngredientList from "../components/RecipeIngredientList";



function RecipeDetailPage() {
    const { recipeId } = useParams();

    const [recipe, setRecipe] =
        useState<RecipeDetail | null>(null);


    async function loadRecipeDetails() {
        if (!recipeId) {
            return;
        }

        const data = await getRecipeDetails(
            Number(recipeId),
        );

        setRecipe(data);
    }


    useEffect(() => {
        loadRecipeDetails();
    }, [recipeId]);


    if (!recipe || !recipeId) {
        return <p>Loading recipe...</p>;
    }


    return (
        <div>
            <h1>{recipe.name}</h1>

            <h2>Ingredients</h2>

            <RecipeIngredientForm
                recipeId={Number(recipeId)}
                onIngredientChanged={loadRecipeDetails}
            />

            <RecipeIngredientList
                recipeId={Number(recipeId)}
                ingredients={recipe.ingredients}
                onIngredientChanged={loadRecipeDetails}
            />
        </div>
    );
}


export default RecipeDetailPage;