import { useState } from "react";

import type { RecipeIngredient } from "../types/recipe_ingredient";

import RecipeIngredientEditor from "./RecipeIngredientEditor";

import {
    deleteRecipeIngredient,
    updateRecipeIngredient,
} from "../api/recipes";


interface Props {
    recipeId: number;
    ingredient: RecipeIngredient;
    onIngredientChanged: () => void;
}


function RecipeIngredientItem({
    recipeId,
    ingredient,
    onIngredientChanged,
}: Props) {
    const [confirmDelete, setConfirmDelete] =
        useState(false);

    const [isEditing, setIsEditing] =
        useState(false);


    async function handleDelete() {
        await deleteRecipeIngredient(
            recipeId,
            ingredient.id,
        );

        setConfirmDelete(false);
        onIngredientChanged();
    }


    return (
        <div>
            <span>
                {ingredient.name}
                {": "}
                {ingredient.quantity_required}
                {" "}
                {ingredient.unit}
            </span>

            <button
                onClick={() =>
                    setIsEditing(true)
                }
            >
                ...
            </button>

            {isEditing && (
                <RecipeIngredientEditor
                    initialName={ingredient.name}
                    initialQuantityRequired={
                        ingredient.quantity_required
                    }
                    initialUnit={ingredient.unit}
                    onSave={async (
                        name,
                        quantityRequired,
                        unit,
                    ) => {
                        await updateRecipeIngredient(
                            recipeId,
                            ingredient.id,
                            name,
                            quantityRequired,
                            unit,
                        );

                        setIsEditing(false);
                        onIngredientChanged();
                    }}
                    onCancel={() =>
                        setIsEditing(false)
                    }
                />
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


export default RecipeIngredientItem;