import { useState } from "react";

import RecipeIngredientEditor from "./RecipeIngredientEditor";
import { addRecipeIngredient } from "../../api/recipes";


interface Props {
    recipeId: number;
    onIngredientChanged: () => void;
}


function RecipeIngredientForm({
    recipeId,
    onIngredientChanged,
}: Props) {
    const [isOpen, setIsOpen] =
        useState(false);

    if (!isOpen) {
        return (
            <button
                onClick={() =>
                    setIsOpen(true)
                }
            >
                Add Ingredient
            </button>
        );
    }

    return (
        <RecipeIngredientEditor
            onSave={async (
                name,
                quantityRequired,
                unit,
            ) => {
                await addRecipeIngredient(
                    recipeId,
                    name,
                    quantityRequired,
                    unit,
                );

                setIsOpen(false);
                onIngredientChanged();
            }}
            onCancel={() =>
                setIsOpen(false)
            }
        />
    );
}


export default RecipeIngredientForm;