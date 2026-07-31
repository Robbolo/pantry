export interface RecipeIngredient {
    id: number;
    ingredient_id: number;
    name: string;
    quantity_required: number;
}

export interface RecipeDetail {
    id: number;
    name: string;
    ingredients: RecipeIngredient[];
}