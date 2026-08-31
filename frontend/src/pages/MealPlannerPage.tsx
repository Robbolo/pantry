import { useEffect, useState } from "react";

import PlannerViewControls, {
    type PlannerViewMode,
} from "../components/meal_planner/PlannerViewControls";

import {
    getMealPreps,
    getAvailableMealPreps,
} from "../api/meal_preps";

import {
    getMealAllocations,
} from "../api/meal_allocations";

import type {
    MealPrep,
    AvailableMealPrep,
} from "../types/meal_prep";

import type {
    MealAllocation,
} from "../types/meal_allocation";

import {
    getPlannerDateRange,
} from "../utils/planner_dates";

import MealPlannerCalendar
    from "../components/meal_planner/mealPlannerCalendar";

import MealPrepPanel
    from "../components/meal_planner/MealPrepPanel";

import {
    getRecipes,
} from "../api/recipes";

import type {
    Recipe,
} from "../types/recipe";


function MealPlannerPage() {
    const [viewMode, setViewMode] =
        useState<PlannerViewMode>("fortnight");

    const [mealPreps, setMealPreps] =
        useState<MealPrep[]>([]);

    const [
        availableMealPreps,
        setAvailableMealPreps,
    ] = useState<AvailableMealPrep[]>([]);

    const [
        mealAllocations,
        setMealAllocations,
    ] = useState<MealAllocation[]>([]);

    const [selectedDate, setSelectedDate] =
        useState<string | null>(null);

    const {
        startDate,
        endDate,
    } = getPlannerDateRange(viewMode);

    const [recipes, setRecipes] =
        useState<Recipe[]>([]);


    async function loadPlannerData() {
        const [
            recipeData,
            prepData,
            availablePrepData,
            allocationData,
        ] = await Promise.all([
            getRecipes(),
            getMealPreps(
                startDate,
                endDate,
            ),
            getAvailableMealPreps(),
            getMealAllocations(
                startDate,
                endDate,
            ),
        ]);

        setRecipes(recipeData);
        setMealPreps(prepData);
        setAvailableMealPreps(
            availablePrepData,
        );
        setMealAllocations(
            allocationData,
        );
    }

    useEffect(() => {
        loadPlannerData();
    }, [
        startDate,
        endDate,
    ]);


    return (

            <div>
        <h1>Meal Planner</h1>

        <PlannerViewControls
            viewMode={viewMode}
            onViewModeChange={setViewMode}
        />

      <p>
    Recipes loaded: {recipes.length}
</p>

<p>
    Meal preps loaded: {mealPreps.length}
</p>
<p>
    Available meal preps loaded:
    {" "}
    {availableMealPreps.length}
</p>
<p>
    Meal allocations loaded:
    {" "}
    {mealAllocations.length}
</p>
    {selectedDate && (
    <div>
        <p>
            Selected date: {selectedDate}
        </p>

        <button>
            Allocate prepared meal
        </button>

        <button>
            Add new meal prep
        </button>

        <button
            onClick={() => setSelectedDate(null)}
        >
            Cancel
        </button>
    </div>
)}
<div>
    <MealPlannerCalendar
        startDate={startDate}
        endDate={endDate}
        mealPreps={mealPreps}
        mealAllocations={mealAllocations}
        onDayClick={setSelectedDate}
    />
</div>
<div>
    <MealPrepPanel
        availableMealPreps={availableMealPreps}
        onMealPrepChanged={loadPlannerData}
        recipes={recipes}
    />
</div>
    </div>
    );
}


export default MealPlannerPage;