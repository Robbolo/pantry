import { useEffect, useState } from "react";

import { createRecipe, getRecipes } from "../api/recipes";
import type { Recipe } from "../types/recipe";

function RecipesPage() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [name, setName] = useState("");

    async function loadRecipes() {
        const data = await getRecipes();
        setRecipes(data);
    }

    useEffect(() => {
        loadRecipes();
    }, []);

    async function handleCreateRecipe() {
        if (!name.trim()) {
            return;
        }

        await createRecipe(name.trim());

        setName("");
        setIsAdding(false);

        await loadRecipes();
    }

    return (
        <div>
            <h1>Recipes</h1>

            {!isAdding ? (
                <button onClick={() => setIsAdding(true)}>
                    Add Recipe
                </button>
            ) : (
                <div>
                    <input
                        type="text"
                        value={name}
                        placeholder="Recipe name"
                        onChange={(event) => setName(event.target.value)}
                    />

                    <button onClick={handleCreateRecipe}>
                        Save
                    </button>

                    <button
                        onClick={() => {
                            setName("");
                            setIsAdding(false);
                        }}
                    >
                        Cancel
                    </button>
                </div>
            )}

            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}>
                        {recipe.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RecipesPage;