export type MealType =
    | "breakfast"
    | "lunch"
    | "dinner"
    | "snack";

export interface MealAllocation {
    id: number;
    meal_prep_id: number;
    meal_date: string;
    meal_type: MealType;
    servings: number;
}