import { useEffect, useState } from "react";

import { getRecipes } from "../api/recipes";
import type { Recipe } from "../types/recipe";

import RecipeForm from "../components/recipe/RecipeForm";
import RecipeList from "../components/recipe/RecipeList";


function ListRecipes() {
    const [recipes, setRecipes] =
        useState<Recipe[]>([]);


    async function loadRecipes() {
        const data = await getRecipes();

        setRecipes(data);
    }


    useEffect(() => {
        loadRecipes();
    }, []);


    return (
        <div>
            <h1>Recipes</h1>

            <RecipeForm
                onRecipeChanged={loadRecipes}
            />

            <RecipeList
                recipes={recipes}
                onRecipeChanged={loadRecipes}
            />
        </div>
    );
}


export default ListRecipes;