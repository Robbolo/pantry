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


    const {
        startDate,
        endDate,
    } = getPlannerDateRange(viewMode);


    async function loadPlannerData() {
        const [
            prepData,
            availablePrepData,
            allocationData,
        ] = await Promise.all([
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
                {startDate}
                {" to "}
                {endDate}
            </p>

            <MealPlannerCalendar
                startDate={startDate}
                endDate={endDate}
                mealPreps={mealPreps}
                mealAllocations={mealAllocations}
            />

            <div>
                <p>
                    Visible meal preps:
                    {" "}
                    {mealPreps.length}
                </p>

                <p>
                    Available meal preps:
                    {" "}
                    {availableMealPreps.length}
                </p>

                <p>
                    Visible meal allocations:
                    {" "}
                    {mealAllocations.length}
                </p>
            </div>
        </div>
    );
}


export default MealPlannerPage;