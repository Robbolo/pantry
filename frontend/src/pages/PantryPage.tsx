import { useEffect, useState } from "react";

import IngredientList from "../components/ingredient/IngredientList";
import IngredientForm from "../components/ingredient/IngredientForm";

import type { Ingredient } from "../types/ingredients";
import { getIngredients } from "../api/ingredients";


function PantryPage() {

    const [ingredients, setIngredients] =
        useState<Ingredient[]>([]);


  async function loadIngredients() {

    const data = await getIngredients();

    setIngredients(data);

}

    useEffect(() => {
        loadIngredients();
    }, []);


    return (
        <div>
            <h1>
                My Pantry
            </h1>
            <IngredientForm
                onIngredientChanged={loadIngredients}/>
            <IngredientList
                ingredients={ingredients}
                onIngredientChanged={loadIngredients}/>
        </div>
    );
}


export default PantryPage;