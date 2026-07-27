import { useState } from "react";
import type { SubmitEvent } from "react";
import { createIngredient } from "../api/ingredients";

interface Props {
    onIngredientChanged: () => void;
}


function IngredientForm({ onIngredientChanged }: Props) {

    const [isOpen, setIsOpen] = useState(false);

    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(0);


async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    await createIngredient(
        name,
        quantity,
    );

    setName("");
    setQuantity(0);

    setIsOpen(false);

    onIngredientChanged();

    }


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
        <form onSubmit={handleSubmit}>

            <div>
                <label>
                    Name:
                </label>

                <input
                    value={name}
                    onChange={(event) =>
                        setName(event.target.value)
                    }
                />
            </div>


            <div>
                <label>
                    Quantity:
                </label>

                <input
                    type="number"
                    value={quantity}
                    onChange={(event) =>
                        setQuantity(
                            Number(event.target.value)
                        )
                    }
                />
            </div>


            <button type="submit">
                Save
            </button>


            <button
                type="button"
                onClick={() => setIsOpen(false)}
            >
                Cancel
            </button>

        </form>
    );

}


export default IngredientForm;