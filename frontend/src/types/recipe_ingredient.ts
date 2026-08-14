import type { Unit } from "./ingredients";
import type { RecipeIngredientAvailability } from "./recipe";

export interface RecipeIngredient {
    id: number;
    ingredient_id: number;
    name: string;
    quantity_required: number;
    unit: Unit;
}

export interface RecipeDetail {
    id: number;
    name: string;
    base_servings: number;
    requested_servings: number;
    ingredients: RecipeIngredientAvailability[];
}