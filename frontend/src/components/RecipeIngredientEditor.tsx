import { useState } from "react";
import type { SubmitEvent } from "react";


interface Props {
    initialName?: string;
    initialQuantityRequired?: number;

    onSave: (
        name: string,
        quantityRequired: number,
    ) => Promise<void>;

    onCancel?: () => void;
}


function RecipeIngredientEditor({
    initialName = "",
    initialQuantityRequired = 0,
    onSave,
    onCancel,
}: Props) {

    const [name, setName] =
        useState(initialName);

    const [quantityRequired, setQuantityRequired] =
        useState(initialQuantityRequired);


    async function handleSubmit(
        event: SubmitEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        await onSave(
            name,
            quantityRequired,
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
                    Quantity Required
                </label>
                <input
                    type="number"
                    value={quantityRequired}
                    min="0"
                    onChange={(event) =>
                        setQuantityRequired(
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


export default RecipeIngredientEditor;