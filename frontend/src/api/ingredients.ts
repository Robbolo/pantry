import { apiFetch } from "./clients";

import type { Ingredient } from "../types/ingredients";


export async function getIngredients() {

    const response = await apiFetch(
        "/ingredients",
    );

    return response.json() as Promise<Ingredient[]>;

}