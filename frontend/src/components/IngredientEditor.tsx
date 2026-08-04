import { useState } from "react";
import type { SubmitEvent } from "react";

import type { Unit } from "../types/ingredients";


interface Props {
    initialName?: string;
    initialQuantity?: number;
    initialUnit?: Unit;

    onSave: (
        name: string,
        quantity: number,
        unit: Unit,
    ) => Promise<void>;

    onCancel?: () => void;
}


function IngredientEditor({
    initialName = "",
    initialQuantity = 0,
    initialUnit = "each",
    onSave,
    onCancel,
}: Props) {

    const [name, setName] =
        useState(initialName);

    const [quantity, setQuantity] =
        useState(initialQuantity);

    const [unit, setUnit] =
        useState<Unit>(initialUnit);


    async function handleSubmit(
        event: SubmitEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        await onSave(
            name,
            quantity,
            unit,
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

            <div>
                <label>
                    Unit
                </label>

                <select
                    value={unit}
                    onChange={(event) =>
                        setUnit(
                            event.target.value as Unit
                        )
                    }
                >
                    <option value="each">
                        Each
                    </option>

                    <option value="g">
                        Grams
                    </option>

                    <option value="kg">
                        Kilograms
                    </option>

                    <option value="ml">
                        Millilitres
                    </option>

                    <option value="l">
                        Litres
                    </option>
                </select>
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