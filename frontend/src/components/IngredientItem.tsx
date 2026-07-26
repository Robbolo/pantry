import { useState } from "react";

import type { Ingredient } from "../types/ingredients";


interface Props {
    ingredient: Ingredient;
    onIngredientDeleted: () => void;
}


function IngredientItem({
    ingredient,
    onIngredientDeleted,
}: Props) {

    const [confirmDelete, setConfirmDelete] =
        useState(false);


    function handleDelete() {

        fetch(
            `http://localhost:8000/ingredients/${ingredient.id}`,
            {
                method: "DELETE",
            }
        )
        .then(() => {

            setConfirmDelete(false);

            onIngredientDeleted();

        });

    }


    return (
        <div>

            <span>
                {ingredient.name}: {ingredient.quantity}
            </span>


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


                    <button
                        onClick={handleDelete}
                    >
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