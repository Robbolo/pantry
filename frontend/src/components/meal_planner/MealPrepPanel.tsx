import type {
    AvailableMealPrep,
} from "../../types/meal_prep";


interface Props {
    availableMealPreps: AvailableMealPrep[];
}


function MealPrepPanel({
    availableMealPreps,
}: Props) {
    return (
        <div>
            <h2>Available Meals</h2>

            {availableMealPreps.map((prep) => (
                <div
                    key={prep.id}
                    style={{
                        border: "1px solid",
                        borderRadius: "4px",
                        padding: "8px",
                        marginBottom: "8px",
                    }}
                >
                    <strong>
                        {prep.recipe_name}
                    </strong>

                    <div>
                        Prep date: {prep.prep_date}
                    </div>

                    <div>
                        Servings made:
                        {" "}
                        {prep.servings_made}
                    </div>

                    <div>
                        Servings available:
                        {" "}
                        {prep.servings_remaining}
                    </div>
                </div>
            ))}

            <button>
                Add Meal Prep
            </button>
        </div>
    );
}


export default MealPrepPanel;