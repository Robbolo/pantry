import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Navbar from "./components/TopNavbar";

import PantryPage from "./pages/PantryPage";
import ListRecipes from "./pages/ListRecipes";
import RecipeDetailPage from "./pages/RecipeDetailPage";


function App() {

    return (

        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route
                    path="/pantry"
                    element={<PantryPage />}
                />


                <Route
                    path="/recipes"
                    element={<ListRecipes />}
                />

                 <Route
                    path="/recipes/:recipeId"
                    element={<RecipeDetailPage />}
                />

            </Routes>

        </BrowserRouter>

    );

}


export default App;