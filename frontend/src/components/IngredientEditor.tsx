import { useState } from "react";
import type { SubmitEvent } from "react";


interface Props {
    initialName?: string;
    initialQuantity?: number;

    onSave: (
        name: string,
        quantity: number,
    ) => Promise<void>;

    onCancel?: () => void;
}


function IngredientEditor({
    initialName = "",
    initialQuantity = 0,
    onSave,
    onCancel,
}: Props) {

    const [name, setName] =
        useState(initialName);

    const [quantity, setQuantity] =
        useState(initialQuantity);


    async function handleSubmit(
        event: SubmitEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        await onSave(
            name,
            quantity,
        );
    }


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Name
                </label>
                <input
                    value={name}
                    onChange={(event) =>
                        setName(
                            event.target.value
                        )
                    }
                />
            </div>
            <div>
                <label>
                    Quantity
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
            {
                onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                )
            }
        </form>
    );
}


export default IngredientEditor;