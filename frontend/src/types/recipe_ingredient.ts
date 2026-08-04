import type { Unit } from "./ingredients";

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
    ingredients: RecipeIngredient[];
}