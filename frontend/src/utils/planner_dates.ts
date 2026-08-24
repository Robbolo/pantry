import type {
    PlannerViewMode,
} from "../components/meal_planner/PlannerViewControls";


interface PlannerDateRange {
    startDate: string;
    endDate: string;
}


function formatDate(
    date: Date,
): string {
    const year = date.getFullYear();

    const month = String(
        date.getMonth() + 1,
    ).padStart(2, "0");

    const day = String(
        date.getDate(),
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


export function getPlannerDateRange(
    viewMode: PlannerViewMode,
    referenceDate: Date = new Date(),
): PlannerDateRange {
    const start = new Date(referenceDate);
    const end = new Date(referenceDate);


    if (viewMode === "week") {
        end.setDate(
            start.getDate() + 6,
        );
    }


    if (viewMode === "fortnight") {
        const dayOfWeek = start.getDay();

        const daysSinceMonday =
            dayOfWeek === 0
                ? 6
                : dayOfWeek - 1;

        start.setDate(
            start.getDate()
            - daysSinceMonday,
        );

        end.setTime(start.getTime());

        end.setDate(
            start.getDate() + 13,
        );
    }


    if (viewMode === "month") {
        start.setDate(1);

        end.setFullYear(
            start.getFullYear(),
            start.getMonth() + 1,
            0,
        );
    }


    return {
        startDate: formatDate(start),
        endDate: formatDate(end),
    };
}