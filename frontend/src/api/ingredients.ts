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

export async function deleteIngredient(
    id: number,
) {
    await apiFetch(
        `/ingredients/${id}`,
        {
            method: "DELETE",
        },
    );
}

export async function incrementIngredient(
    id: number,
) {
    await apiFetch(
        `/ingredients/${id}/increment`,
        {
            method: "PATCH",
        },
    );
}

export async function decrementIngredient(
    id: number,
) {
    await apiFetch(
        `/ingredients/${id}/decrement`,
        {
            method: "PATCH",
        },
    );
}