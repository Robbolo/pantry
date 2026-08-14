import type { Unit } from "./ingredients";

export type IngredientAvailabilityStatus =
    | "enough"
    | "insufficient"
    | "missing"
    | "incompatible";


export interface RecipeIngredientAvailability {
    recipe_ingredient_id: number;
    ingredient_id: number;
    name: string;

    quantity_required: number;
    required_unit: Unit;

    quantity_in_pantry: number;
    pantry_unit: Unit | null;

    status: IngredientAvailabilityStatus;
}


export interface Recipe {
    id: number;
    name: string;
    base_servings: number;
    ingredients_available: number;
    ingredients_required: number;
    can_make: boolean;
    ingredients: RecipeIngredientAvailability[];
}