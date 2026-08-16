import type { Recipe } from "../../types/recipe";

import RecipeItem from "./RecipeItem";


interface Props {
    recipes: Recipe[];
    onRecipeChanged: () => void;
}


function RecipeList({
    recipes,
    onRecipeChanged,
}: Props) {

    return (
        <div>
            {
                recipes.map((recipe) => (

                    <RecipeItem
                        key={recipe.id}
                        recipe={recipe}
                        onRecipeChanged={onRecipeChanged}
                    />

                ))
            }
        </div>
    );
}


export default RecipeList;