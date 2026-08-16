import { useState } from "react";

import { createRecipe } from "../../api/recipes";

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

    const [baseServings, setBaseServings] =
        useState(1);


    async function handleSave() {
        if (!name.trim()) {
            return;
        }

        await createRecipe(
            name.trim(),
            baseServings,
        );

        setName("");
        setBaseServings(1);
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

            <label>
                Servings:
                <input
                    type="number"
                    min="1"
                    value={baseServings}
                    onChange={(event) =>
                        setBaseServings(
                            Number(event.target.value)
                        )
                    }
                />
            </label>

            <button
                onClick={handleSave}
            >
                Save
            </button>

            <button
                onClick={() => {
                    setName("");
                    setBaseServings(1);
                    setIsOpen(false);
                }}
            >
                Cancel
            </button>
        </div>
    );
}

export default RecipeForm;