import { apiFetch } from "./clients";
import type { Recipe } from "../types/recipe";
import type { RecipeDetail } from "../types/recipe_ingredient";
import type { RecipeIngredient } from "../types/recipe_ingredient";

export async function getRecipes(): Promise<Recipe[]> {
    const response = await apiFetch("/recipes");
    return response.json();
}

export async function createRecipe(name: string): Promise<Recipe> {
    const response = await apiFetch("/recipes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
        }),
    });
    return response.json();
}

export async function getRecipe(id: number): Promise<Recipe> {
    const response = await apiFetch(`/recipes/${id}`);

    return response.json();
}


export async function getRecipeIngredients(
    recipeId: number,
): Promise<RecipeIngredient[]> {
    const response = await apiFetch(
        `/recipes/${recipeId}/ingredients`
    );

    return response.json();
}


export async function getRecipeDetails(
    recipeId: number,
): Promise<RecipeDetail> {
    const response = await apiFetch(
        `/recipes/${recipeId}/ingredients`
    );

    return response.json();
}

export async function addRecipeIngredient(
    recipeId: number,
    name: string,
    quantityRequired: number,
): Promise<RecipeIngredient> {
    const response = await apiFetch(
        `/recipes/${recipeId}/ingredients`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                quantity_required: quantityRequired,
            }),
        },
    );

    return response.json();
}