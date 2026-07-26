import { useState } from "react";
import type { SubmitEvent } from "react";


interface Props {
    onIngredientAdded: () => void;
}


function IngredientForm({ onIngredientAdded }: Props) {

    const [isOpen, setIsOpen] = useState(false);

    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(0);


function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

        fetch("http://localhost:8000/ingredients", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                quantity,
            }),
        })
        .then(response => response.json())
        .then(() => {

            setName("");
            setQuantity(0);

            setIsOpen(false);

            onIngredientAdded();

        });

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