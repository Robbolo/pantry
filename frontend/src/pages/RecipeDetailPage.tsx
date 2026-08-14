import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getRecipeDetails } from "../api/recipes";
import type { RecipeDetail } from "../types/recipe_ingredient";

import RecipeIngredientForm from "../components/RecipeIngredientForm";
import RecipeIngredientList from "../components/RecipeIngredientList";
import RecipeServingsControl from "../components/RecipeServingsControl";



function RecipeDetailPage() {
    const { recipeId } = useParams();

    const [recipe, setRecipe] =
        useState<RecipeDetail | null>(null);

    const [requestedServings, setRequestedServings] =
        useState<number | null>(null);

    async function increaseServings() {
        if (requestedServings === null) {
            return;
        }

        await loadRecipeDetails(
            requestedServings + 1,
        );
    }

    async function decreaseServings() {
        if (
            requestedServings === null
            || requestedServings <= 1
        ) {
            return;
        }

        await loadRecipeDetails(
            requestedServings - 1,
        );
    }




    async function loadRecipeDetails(
        servings?: number,
    ) {
        if (!recipeId) {
            return;
        }

        const data = await getRecipeDetails(
            Number(recipeId),
            servings,
        );

        setRecipe(data);

        setRequestedServings(data.requested_servings);
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

            {requestedServings !== null && (
                <RecipeServingsControl
                    servings={requestedServings}
                    onDecrease={decreaseServings}
                    onIncrease={increaseServings}
                />
                )
            }

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