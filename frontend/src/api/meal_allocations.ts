import { apiFetch } from "./clients";

import type {
    MealAllocation,
    MealType,
} from "../types/meal_allocation";


export async function getMealAllocations(
    startDate: string,
    endDate: string,
): Promise<MealAllocation[]> {
    const response = await apiFetch(
        `/meal-allocations?start_date=${startDate}&end_date=${endDate}`,
    );

    return response.json();
}


export async function createMealAllocation(
    mealPrepId: number,
    mealDate: string,
    mealType: MealType,
    servings: number,
): Promise<MealAllocation> {
    const response = await apiFetch(
        "/meal-allocations",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                meal_prep_id: mealPrepId,
                meal_date: mealDate,
                meal_type: mealType,
                servings,
            }),
        },
    );

    return response.json();
}


export async function updateMealAllocation(
    mealAllocationId: number,
    mealDate: string,
    mealType: MealType,
    servings: number,
): Promise<MealAllocation> {
    const response = await apiFetch(
        `/meal-allocations/${mealAllocationId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                meal_date: mealDate,
                meal_type: mealType,
                servings,
            }),
        },
    );

    return response.json();
}


export async function deleteMealAllocation(
    mealAllocationId: number,
): Promise<void> {
    await apiFetch(
        `/meal-allocations/${mealAllocationId}`,
        {
            method: "DELETE",
        },
    );
}