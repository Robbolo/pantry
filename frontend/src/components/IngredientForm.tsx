import { useState } from "react";
import IngredientEditor from "./IngredientEditor"
import { createIngredient } from "../api/ingredients";

interface Props {
    onIngredientChanged: () => void;
}


function IngredientForm({ onIngredientChanged }: Props) {

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
        <IngredientEditor

            onSave={async (
                name,
                quantity,
            ) => {

                await createIngredient(
                    name,
                    quantity,
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


export default IngredientForm;