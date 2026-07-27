import { apiFetch } from "./clients";

import type { Ingredient } from "../types/ingredients";


export async function getIngredients() {

    const response = await apiFetch(
        "/ingredients",
    );

    return response.json() as Promise<Ingredient[]>;

}

export async function createIngredient(
    name: string,
    quantity: number,
) {

    await apiFetch(
        "/ingredients",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                name,
                quantity,
            }),
        },
    );

}