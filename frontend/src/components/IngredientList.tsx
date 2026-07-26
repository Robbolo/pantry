import type { Ingredient } from "../types/ingredients";
import IngredientItem from "./IngredientItem";


interface Props {
    ingredients: Ingredient[];
    onIngredientDeleted: () => void;
}


function IngredientList({ ingredients,onIngredientDeleted }: Props) {

    return (
        <div>

            {
                ingredients.map((ingredient) => (

                <IngredientItem
                    key={ingredient.id}
                    ingredient={ingredient}
                    onIngredientDeleted={onIngredientDeleted}
                />

                ))
            }

        </div>
    );

}


export default IngredientList;