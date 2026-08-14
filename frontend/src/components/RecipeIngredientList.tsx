import type {
    RecipeIngredientAvailability,
} from "../types/recipe";

import RecipeIngredientItem from "./RecipeIngredientItem";


interface Props {
    recipeId: number;
    ingredients: RecipeIngredientAvailability[];
    onIngredientChanged: () => void;
}


function RecipeIngredientList({
    recipeId,
    ingredients,
    onIngredientChanged,
}: Props) {
    return (
        <div>
            {ingredients.map((ingredient) => (
                <RecipeIngredientItem
                    key={ingredient.recipe_ingredient_id}
                    recipeId={recipeId}
                    ingredient={ingredient}
                    onIngredientChanged={onIngredientChanged}
                />
            ))}
        </div>
    );
}


export default RecipeIngredientList;