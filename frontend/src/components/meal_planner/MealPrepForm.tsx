import { useState } from "react";

import type { Recipe } from "../../types/recipe";

import {
    createMealPrep,
} from "../../api/meal_preps";


interface Props {
    recipes: Recipe[];
    onMealPrepChanged: () => void;
    onCancel: () => void;
}

function getTodayDate(): string {
    const today = new Date();

    const year = today.getFullYear();

    const month = String(
        today.getMonth() + 1,
    ).padStart(2, "0");

    const day = String(
        today.getDate(),
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function MealPrepForm({
    recipes,
    onMealPrepChanged,
    onCancel,
}: Props) {
    const [recipeId, setRecipeId] =
        useState<number | null>(null);

    const [prepDate, setPrepDate] =
        useState(getTodayDate());

    const [servingsMade, setServingsMade] =
        useState(1);


    function handleRecipeChange(
        selectedRecipeId: number,
    ) {
        const recipe = recipes.find(
            (item) =>
                item.id === selectedRecipeId
        );

        setRecipeId(
            selectedRecipeId,
        );

        if (recipe) {
            setServingsMade(
                recipe.base_servings,
            );
        }
    }


    async function handleSave() {
        if (
            recipeId === null
            || !prepDate
        ) {
            return;
        }

        await createMealPrep(
            recipeId,
            prepDate,
            servingsMade,
        );

        onMealPrepChanged();

        onCancel();
    }


    return (
        <div>
            <select
                value={recipeId ?? ""}
                onChange={(event) =>
                    handleRecipeChange(
                        Number(
                            event.target.value
                        )
                    )
                }
            >
                <option value="">
                    Select recipe
                </option>

                {recipes.map((recipe) => (
                    <option
                        key={recipe.id}
                        value={recipe.id}
                    >
                        {recipe.name}
                    </option>
                ))}
            </select>

            <input
                type="date"
                value={prepDate}
                onChange={(event) =>
                    setPrepDate(
                        event.target.value
                    )
                }
            />

            <div>
                <span>
                    Servings:
                    {" "}
                </span>

                <button
                    onClick={() =>
                        setServingsMade(
                            Math.max(
                                1,
                                servingsMade - 1,
                            )
                        )
                    }
                >
                    -
                </button>

                <span>
                    {" "}
                    {servingsMade}
                    {" "}
                </span>

                <button
                    onClick={() =>
                        setServingsMade(
                            servingsMade + 1,
                        )
                    }
                >
                    +
                </button>
            </div>

            <button
                onClick={handleSave}
            >
                Save
            </button>

            <button
                onClick={onCancel}
            >
                Cancel
            </button>
        </div>
    );
}


export default MealPrepForm;