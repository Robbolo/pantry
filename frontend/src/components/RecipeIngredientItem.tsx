import { useState } from "react";

import type {
    RecipeIngredientAvailability,
} from "../types/recipe";

import RecipeIngredientEditor from "./RecipeIngredientEditor";

import {
    deleteRecipeIngredient,
    updateRecipeIngredient,
} from "../api/recipes";


interface Props {
    recipeId: number;
    ingredient: RecipeIngredientAvailability;
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
            ingredient.recipe_ingredient_id,
        );

        setConfirmDelete(false);
        onIngredientChanged();
    }


    const statusIcon =
        ingredient.status === "enough"
            ? "🟢"
            : ingredient.status === "insufficient"
                ? "🟠"
                : ingredient.status === "missing"
                    ? "🔴"
                    : "⚠️";


    return (
        <div>
            <span>
                {statusIcon}
                {" "}
                {ingredient.name}
                {": "}
                {ingredient.quantity_required}
                {" "}
                {ingredient.required_unit}
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
                    initialUnit={ingredient.required_unit}
                    onSave={async (
                        name,
                        quantityRequired,
                        unit,
                    ) => {
                        await updateRecipeIngredient(
                            recipeId,
                            ingredient.recipe_ingredient_id,
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