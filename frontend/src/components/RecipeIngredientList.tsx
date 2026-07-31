import type { RecipeIngredient } from "../types/recipe_ingredient";

import RecipeIngredientItem from "./RecipeIngredientItem";


interface Props {
    recipeId: number;
    ingredients: RecipeIngredient[];
    onIngredientChanged: () => void;
}


function RecipeIngredientList({
    recipeId,
    ingredients,
    onIngredientChanged,
}: Props) {

    return (
        <div>
            {
                ingredients.map((ingredient) => (

                    <RecipeIngredientItem
                        key={ingredient.id}
                        recipeId={recipeId}
                        ingredient={ingredient}
                        onIngredientChanged={onIngredientChanged}
                    />

                ))
            }
        </div>
    );
}


export default RecipeIngredientList;