import { useEffect, useState } from "react";

import IngredientList from "./components/IngredientList";
import IngredientForm from "./components/IngredientForm";

import type { Ingredient } from "./types/ingredients";


function App() {

    const [ingredients, setIngredients] =
        useState<Ingredient[]>([]);


    function loadIngredients() {

        fetch("http://localhost:8000/ingredients")
            .then(response => response.json())
            .then(data => {
                setIngredients(data);
            });
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
                onIngredientAdded={loadIngredients}/>
            <IngredientList
                ingredients={ingredients}/>
        </div>
    );
}


export default App;