import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Navbar from "./components/TopNavbar";

import PantryPage from "./pages/PantryPage";
import RecipesPage from "./pages/RecipePage";


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
                    element={<RecipesPage />}
                />

            </Routes>

        </BrowserRouter>

    );

}


export default App;