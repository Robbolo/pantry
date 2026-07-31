import { apiFetch } from "./clients";
import type { Recipe } from "../types/recipe";

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