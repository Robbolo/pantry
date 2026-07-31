import { useState } from "react";
import { Link } from "react-router-dom";

import type { Recipe } from "../types/recipe";
import { deleteRecipe } from "../api/recipes";


interface Props {
    recipe: Recipe;
    onRecipeChanged: () => void;
}


function RecipeItem({
    recipe,
    onRecipeChanged,
}: Props) {

    const [confirmDelete, setConfirmDelete] =
        useState(false);


    async function handleDelete() {
        await deleteRecipe(
            recipe.id,
        );

        setConfirmDelete(false);

        onRecipeChanged();
    }


    return (
        <div>
            <Link to={`/recipes/${recipe.id}`}>
                {recipe.name}
            </Link>

            {!confirmDelete && (
                <button
                    onClick={() =>
                        setConfirmDelete(true)
                    }
                >
                    ❌
                </button>
            )}

            {confirmDelete && (
                <span>
                    <span>
                        Are you sure?
                    </span>

                    <button
                        onClick={handleDelete}
                    >
                        Delete
                    </button>

                    <button
                        onClick={() =>
                            setConfirmDelete(false)
                        }
                    >
                        Cancel
                    </button>
                </span>
            )}
        </div>
    );
}


export default RecipeItem;