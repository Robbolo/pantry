import type {
    AvailableMealPrep,
} from "../../types/meal_prep";

import {
    discardRemainingMealPrep,
} from "../../api/meal_preps";

import type { Recipe } from "../../types/recipe";

import MealPrepForm from "./MealPrepForm";

import { useState } from "react";


interface Props {
    availableMealPreps: AvailableMealPrep[];
    onMealPrepChanged: () => void;
    recipes: Recipe[];
}


function MealPrepPanel({
    availableMealPreps,
    onMealPrepChanged,
    recipes,
}: Props)
 {
    const [confirmDiscardId, setConfirmDiscardId] =
        useState<number | null>(null);
    
    const [isAddingMealPrep, setIsAddingMealPrep] =
        useState(false);

    async function handleDiscard(
        mealPrepId: number,
    ) {
        await discardRemainingMealPrep(
            mealPrepId,
        );

        onMealPrepChanged();
    }
    
    return (
        <div>
            <h2>Available Meals</h2>

            {availableMealPreps.map((prep) => (
                <div
                    key={prep.id}
                    style={{
                        border: "1px solid",
                        borderRadius: "4px",
                        padding: "8px",
                        marginBottom: "8px",
                    }}
                >
                    <strong>
                        {prep.recipe_name}
                    </strong>

                    <div>
                        Prep date: {prep.prep_date}
                    </div>

                    <div>
                        Servings made:
                        {" "}
                        {prep.servings_made}
                    </div>

                    <div>
                        Servings available:
                        {" "}
                        {prep.servings_remaining}
                    </div>
                     {confirmDiscardId !== prep.id ? (
                        <button
                            onClick={() =>
                                setConfirmDiscardId(prep.id)
                            }
                        >
                            Discard remaining
                        </button>
                    ) : (
                        <span>
                            <span>
                                Discard all remaining servings?
                            </span>

                            <button
                                onClick={async () => {
                                    await handleDiscard(prep.id);
                                    setConfirmDiscardId(null);
                                }}
                            >
                                Confirm
                            </button>

                            <button
                                onClick={() =>
                                    setConfirmDiscardId(null)
                                }
                            >
                                Cancel
                            </button>
                        </span>
                    )}
                </div>
            ))}

            {!isAddingMealPrep ? (
                <button
                    onClick={() =>
                        setIsAddingMealPrep(true)
                    }
                >
                    Add Meal Prep
                </button>
            ) : (
                <MealPrepForm
                    recipes={recipes}
                    onMealPrepChanged={
                        onMealPrepChanged
                    }
                    onCancel={() =>
                        setIsAddingMealPrep(false)
                    }
                />
            )}
        </div>
    );
}


export default MealPrepPanel;