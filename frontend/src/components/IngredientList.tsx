import type { Ingredient } from "../types/ingredients";
import IngredientItem from "./IngredientItem";


interface Props {
    ingredients: Ingredient[];
    onIngredientChanged: () => void;
}


function IngredientList({ ingredients,onIngredientChanged }: Props) {

    return (
        <div>

            {
                ingredients.map((ingredient) => (

                <IngredientItem
                    key={ingredient.id}
                    ingredient={ingredient}
                    onIngredientChanged={onIngredientChanged}
                />

                ))
            }

        </div>
    );

}


export default IngredientList;