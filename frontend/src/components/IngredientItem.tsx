import type { Ingredient } from "../types/ingredients";


interface Props {
    ingredient: Ingredient;
}

function IngredientItem({ ingredient }: Props) {

    return (
        <div>
            {ingredient.name}: {ingredient.quantity}
        </div>
    );

}


export default IngredientItem;