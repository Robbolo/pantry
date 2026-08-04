import { apiFetch } from "./clients";

import type {
    Ingredient,
    Unit,
} from "../types/ingredients";


export async function getIngredients() {
    const response = await apiFetch(
        "/pantry-items",
    );

    return response.json() as Promise<Ingredient[]>;
}


export async function createIngredient(
    name: string,
    quantity: number,
    unit: Unit,
) {
    await apiFetch(
        "/pantry-items",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                name,
                quantity,
                unit,
            }),
        },
    );
}


export async function deleteIngredient(
    id: number,
) {
    await apiFetch(
        `/pantry-items/${id}`,
        {
            method: "DELETE",
        },
    );
}


export async function incrementIngredient(
    id: number,
) {
    await apiFetch(
        `/pantry-items/${id}/increment`,
        {
            method: "PATCH",
        },
    );
}


export async function decrementIngredient(
    id: number,
) {
    await apiFetch(
        `/pantry-items/${id}/decrement`,
        {
            method: "PATCH",
        },
    );
}


export async function updateIngredient(
    id: number,
    name: string,
    quantity: number,
    unit: Unit,
) {
    await apiFetch(
        `/pantry-items/${id}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                name,
                quantity,
                unit,
            }),
        },
    );
}