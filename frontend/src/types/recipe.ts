export type IngredientAvailabilityStatus =
    | "enough"
    | "insufficient"
    | "missing";


export interface RecipeIngredientAvailability {
    recipe_ingredient_id: number;
    ingredient_id: number;
    name: string;
    quantity_required: number;
    quantity_in_pantry: number;
    status: IngredientAvailabilityStatus;
}


export interface Recipe {
    id: number;
    name: string;
    ingredients_available: number;
    ingredients_required: number;
    can_make: boolean;
    ingredients: RecipeIngredientAvailability[];
}