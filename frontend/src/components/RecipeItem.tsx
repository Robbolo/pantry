import { useState } from "react";
import { Link } from "react-router-dom";

import type { Recipe } from "../types/recipe";

import {
    deleteRecipe,
    updateRecipe,
} from "../api/recipes";


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

    const [isEditing, setIsEditing] =
        useState(false);

    const [name, setName] =
        useState(recipe.name);


    async function handleDelete() {
        await deleteRecipe(recipe.id);

        setConfirmDelete(false);

        onRecipeChanged();
    }


    async function handleUpdate() {
        if (!name.trim()) {
            return;
        }

        await updateRecipe(
            recipe.id,
            name.trim(),
        );

        setIsEditing(false);

        onRecipeChanged();
    }


    return (
        <div>
            {!isEditing ? (
                <>
                    <Link to={`/recipes/${recipe.id}`}>
                        {recipe.name}
                    </Link>

                    <button
                        onClick={() =>
                            setIsEditing(true)
                        }
                    >
                        ...
                    </button>
                </>
            ) : (
                <>
                    <input
                        type="text"
                        value={name}
                        onChange={(event) =>
                            setName(event.target.value)
                        }
                    />

                    <button onClick={handleUpdate}>
                        Save
                    </button>

                    <button
                        onClick={() => {
                            setName(recipe.name);
                            setIsEditing(false);
                        }}
                    >
                        Cancel
                    </button>
                </>
            )}

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

                    <button onClick={handleDelete}>
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