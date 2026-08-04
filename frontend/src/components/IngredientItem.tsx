import { useState } from "react";

import type { Ingredient } from "../types/ingredients";

import IngredientEditor from "./IngredientEditor";

import {
    deleteIngredient,
    incrementIngredient,
    decrementIngredient,
    updateIngredient,
} from "../api/ingredients";


interface Props {
    ingredient: Ingredient;
    onIngredientChanged: () => void;
}


function IngredientItem({
    ingredient,
    onIngredientChanged,
}: Props) {
    const [confirmDelete, setConfirmDelete] =
        useState(false);

    const [isEditing, setIsEditing] =
        useState(false);


    async function handleDelete() {
        await deleteIngredient(
            ingredient.id,
        );

        setConfirmDelete(false);
        onIngredientChanged();
    }


    async function handleIncrement() {
        await incrementIngredient(
            ingredient.id,
        );

        onIngredientChanged();
    }


    async function handleDecrement() {
        await decrementIngredient(
            ingredient.id,
        );

        onIngredientChanged();
    }


    return (
        <div>
            <span>
                {ingredient.name}
                {": "}
                {ingredient.quantity}
                {" "}
                {ingredient.unit}
            </span>

            <button onClick={handleIncrement}>
                +
            </button>

            <button onClick={handleDecrement}>
                -
            </button>

            <button
                onClick={() =>
                    setIsEditing(true)
                }
            >
                ...
            </button>

            {
                isEditing && (
                    <IngredientEditor
                        initialName={ingredient.name}
                        initialQuantity={
                            ingredient.quantity
                        }
                        initialUnit={ingredient.unit}
                        onSave={async (
                            name,
                            quantity,
                            unit,
                        ) => {
                            await updateIngredient(
                                ingredient.id,
                                name,
                                quantity,
                                unit,
                            );

                            setIsEditing(false);
                            onIngredientChanged();
                        }}
                        onCancel={() =>
                            setIsEditing(false)
                        }
                    />
                )
            }

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


export default IngredientItem;