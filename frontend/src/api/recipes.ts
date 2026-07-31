import { apiFetch } from "./clients";

import type { Recipe } from "../types/recipe";
import type {
    RecipeDetail,
    RecipeIngredient,
} from "../types/recipe_ingredient";


export async function getRecipes(): Promise<Recipe[]> {
    const response = await apiFetch("/recipes");

    return response.json();
}


export async function createRecipe(
    name: string,
): Promise<Recipe> {
    const response = await apiFetch(
        "/recipes",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
            }),
        },
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


export async function updateRecipeIngredient(
    recipeId: number,
    recipeIngredientId: number,
    name: string,
    quantityRequired: number,
): Promise<RecipeIngredient> {
    const response = await apiFetch(
        `/recipes/${recipeId}/ingredients/${recipeIngredientId}`,
        {
            method: "PUT",
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


export async function deleteRecipeIngredient(
    recipeId: number,
    recipeIngredientId: number,
): Promise<void> {
    await apiFetch(
        `/recipes/${recipeId}/ingredients/${recipeIngredientId}`,
        {
            method: "DELETE",
        },
    );
}

export async function deleteRecipe(
    recipeId: number,
): Promise<void> {
    await apiFetch(
        `/recipes/${recipeId}`,
        {
            method: "DELETE",
        },
    );
}