import { useState } from "react";

import PlannerViewControls, {
    type PlannerViewMode,
} from "../components/meal_planner/PlannerViewControls";


function MealPlannerPage() {
    const [viewMode, setViewMode] =
        useState<PlannerViewMode>("week");

    return (
        <div>
            <h1>Meal Planner</h1>

            <PlannerViewControls
                viewMode={viewMode}
                onViewModeChange={setViewMode}
            />

            <p>
                Current view: {viewMode}
            </p>
        </div>
    );
}

export default MealPlannerPage;