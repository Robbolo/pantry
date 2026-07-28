import { useState } from "react";

import type { Ingredient } from "../types/ingredients";

import { deleteIngredient, incrementIngredient } from "../api/ingredients";


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


    return (
        <div>
            <span>
                {ingredient.name}: {ingredient.quantity}
            </span>
            <button
            onClick={handleIncrement}>+</button>
            {!confirmDelete && (
                <button
                    onClick={() =>
                        setConfirmDelete(true)
                    }>❌</button>
            )}
            {confirmDelete && (
                <span>
                    <span>
                        Are you sure?
                    </span>
                    <button
                        onClick={handleDelete}>
                        Delete
                    </button>
                    <button
                        onClick={() =>
                            setConfirmDelete(false)
                        }>Cancel</button>
                </span>
            )}
        </div>
    );
}




export default IngredientItem;