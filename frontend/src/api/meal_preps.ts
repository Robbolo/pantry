import { apiFetch } from "./clients";

import type { MealPrep, AvailableMealPrep } from "../types/meal_prep";


export async function getMealPreps(
    startDate: string,
    endDate: string,
): Promise<MealPrep[]> {
    const response = await apiFetch(
        `/meal-preps?start_date=${startDate}&end_date=${endDate}`,
    );

    return response.json();
}


export async function getAvailableMealPreps():
Promise<AvailableMealPrep[]> {
    const response = await apiFetch(
        "/meal-preps/available",
    );

    return response.json();
}


export async function createMealPrep(
    recipeId: number,
    prepDate: string,
    servingsMade: number,
): Promise<MealPrep> {
    const response = await apiFetch(
        "/meal-preps",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                recipe_id: recipeId,
                prep_date: prepDate,
                servings_made: servingsMade,
            }),
        },
    );

    return response.json();
}


export async function updateMealPrep(
    mealPrepId: number,
    prepDate: string,
    servingsMade: number,
): Promise<MealPrep> {
    const response = await apiFetch(
        `/meal-preps/${mealPrepId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prep_date: prepDate,
                servings_made: servingsMade,
            }),
        },
    );

    return response.json();
}


export async function deleteMealPrep(
    mealPrepId: number,
): Promise<void> {
    await apiFetch(
        `/meal-preps/${mealPrepId}`,
        {
            method: "DELETE",
        },
    );
}