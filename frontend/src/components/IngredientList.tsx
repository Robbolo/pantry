import type { Ingredient } from "../types/ingredients";
import IngredientItem from "./IngredientItem";


interface Props {
    ingredients: Ingredient[];
}


function IngredientList({ ingredients }: Props) {

    return (
        <div>

            {
                ingredients.map((ingredient) => (

                    <IngredientItem
                        key={ingredient.id}
                        ingredient={ingredient}
                    />

                ))
            }

        </div>
    );

}


export default IngredientList;