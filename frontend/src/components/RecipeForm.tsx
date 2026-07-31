import { useState } from "react";

import { createRecipe } from "../api/recipes";


interface Props {
    onRecipeChanged: () => void;
}


function RecipeForm({
    onRecipeChanged,
}: Props) {

    const [isOpen, setIsOpen] =
        useState(false);

    const [name, setName] =
        useState("");


    async function handleSave() {
        if (!name.trim()) {
            return;
        }

        await createRecipe(
            name.trim(),
        );

        setName("");
        setIsOpen(false);

        onRecipeChanged();
    }


    if (!isOpen) {
        return (
            <button
                onClick={() =>
                    setIsOpen(true)
                }
            >
                Add Recipe
            </button>
        );
    }


    return (
        <div>
            <input
                type="text"
                value={name}
                placeholder="Recipe name"
                onChange={(event) =>
                    setName(
                        event.target.value
                    )
                }
            />

            <button
                onClick={handleSave}
            >
                Save
            </button>

            <button
                onClick={() => {
                    setName("");
                    setIsOpen(false);
                }}
            >
                Cancel
            </button>
        </div>
    );
}


export default RecipeForm;