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

        </nav>
    );

}


export default Navbar;