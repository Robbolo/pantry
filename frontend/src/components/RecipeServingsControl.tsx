interface Props {
    servings: number;
    onDecrease: () => void;
    onIncrease: () => void;
}

function RecipeServingsControl({
    servings,
    onDecrease,
    onIncrease,
}: Props) {
    return (
        <div>
            <span>Servings: </span>

            <button
                onClick={onDecrease}
                disabled={servings <= 1}
            >
                -
            </button>

            <span>
                {" "}
                {servings}
                {" "}
            </span>

            <button
                onClick={onIncrease}
            >
                +
            </button>
        </div>
    );
}

export default RecipeServingsControl;