import { useState } from "react";

import RecipeIngredientEditor from "./RecipeIngredientEditor";
import { addRecipeIngredient } from "../api/recipes";


interface Props {
    recipeId: number;
    onIngredientChanged: () => void;
}


function RecipeIngredientForm({
    recipeId,
    onIngredientChanged,
}: Props) {

    const [isOpen, setIsOpen] = useState(false);

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
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
            ) => {

                await addRecipeIngredient(
                    recipeId,
                    name,
                    quantityRequired,
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