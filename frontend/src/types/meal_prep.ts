export interface MealPrep {
    id: number;
    recipe_id: number;
    recipe_name: string;
    prep_date: string;
    servings_made: number;
}

export interface AvailableMealPrep {
    id: number;
    recipe_id: number;
    recipe_name: string;
    prep_date: string;
    servings_made: number;
    servings_allocated: number;
    servings_remaining: number;
}