import { Link } from "react-router-dom";


function Navbar() {

    return (
        <nav>

            <Link to="/pantry">
                Pantry
            </Link>


            <Link to="/recipes">
                Recipes
            </Link>

            <Link to="/meal-planner">
                Meal Planner
            </Link>

        </nav>
    );

}


export default Navbar;