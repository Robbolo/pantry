import { useState } from "react";

import PlannerViewControls, {
    type PlannerViewMode,
} from "../components/meal_planner/PlannerViewControls";

import { getPlannerDateRange } from "../utils/planner_dates";


function MealPlannerPage() {
    const [viewMode, setViewMode] =
        useState<PlannerViewMode>("fortnight");
    
    const {
        startDate,
        endDate,
    } = getPlannerDateRange(viewMode);

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
            <p>
                {startDate}
                {" to "}
                {endDate}
            </p>
        </div>
    );
}

export default MealPlannerPage;