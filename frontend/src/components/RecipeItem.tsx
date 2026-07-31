import { Link } from "react-router-dom";

import type { Recipe } from "../types/recipe";


interface Props {
    recipe: Recipe;
    onRecipeChanged: () => void;
}


function RecipeItem({
    recipe,
}: Props) {

    return (
        <div>
            <Link to={`/recipes/${recipe.id}`}>
                {recipe.name}
            </Link>
        </div>
    );
}


export default RecipeItem;