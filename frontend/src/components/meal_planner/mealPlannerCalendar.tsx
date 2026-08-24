import type { MealPrep } from "../../types/meal_prep";
import type { MealAllocation } from "../../types/meal_allocation";

interface Props {
    startDate: string;
    endDate: string;
    mealPreps: MealPrep[];
    mealAllocations: MealAllocation[];
}


function parseDate(
    dateString: string,
): Date {
    const [
        year,
        month,
        day,
    ] = dateString
        .split("-")
        .map(Number);

    return new Date(
        year,
        month - 1,
        day,
    );
}


function formatDisplayDate(
    date: Date,
): string {
    return date.toLocaleDateString(
        undefined,
        {
            weekday: "short",
            day: "numeric",
            month: "short",
        },
    );
}


function getDatesInRange(
    startDate: string,
    endDate: string,
): Date[] {
    const start = parseDate(startDate);
    const end = parseDate(endDate);

    const dates: Date[] = [];

    const current = new Date(start);

    while (current <= end) {
        dates.push(
            new Date(current),
        );

        current.setDate(
            current.getDate() + 1,
        );
    }

    return dates;
}

function isToday(
    date: Date,
): boolean {
    const today = new Date();

    return (
        date.getFullYear() === today.getFullYear()
        && date.getMonth() === today.getMonth()
        && date.getDate() === today.getDate()
    );
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


function MealPlannerCalendar({
    startDate,
    endDate,
    mealPreps,
    mealAllocations,
}: Props) {
    const dates = getDatesInRange(
        startDate,
        endDate,
    );

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns:
                    "repeat(7, 1fr)",
                gap: "8px",
            }}
        >
            {dates.map((date) => {
                const dateString = formatDate(date);

                const currentDay = isToday(date);

                const prepsForDay = mealPreps.filter(
                    (prep) =>
                        prep.prep_date === dateString
                );

                const allocationsForDay =
                    mealAllocations.filter(
                        (allocation) =>
                            allocation.meal_date
                            === dateString
                    );

                return (
                    <div
                        key={dateString}
                        style={{
                            border: currentDay
                                ? "3px solid"
                                : "1px solid",
                            padding: "8px",
                            minHeight: "120px",
                        }}
                    >
                        <strong
                            style={{
                                fontWeight: currentDay
                                    ? "bold"
                                    : "normal",
                            }}
                        >
                            {formatDisplayDate(date)}
                        </strong>

                        {prepsForDay.map((prep) => (
                            <div
                                key={`prep-${prep.id}`}
                                style={{
                                    border: "1px solid",
                                    borderRadius: "4px",
                                    padding: "6px",
                                    marginTop: "6px",
                                }}
                            >
                                PREP: {prep.recipe_name}
                                {" — "}
                                {prep.servings_made}
                                {" servings"}
                            </div>
                        ))}

                        {allocationsForDay.map(
                            (allocation) => {
                                const mealPrep =
                                    mealPreps.find(
                                        (prep) =>
                                            prep.id
                                            === allocation.meal_prep_id
                                    );

                                return (
                                    <div
                                        key={`allocation-${allocation.id}`}
                                        style={{
                                            border: "1px solid",
                                            borderRadius: "4px",
                                            padding: "6px",
                                            marginTop: "6px",
                                        }}
                                    >
                                        {allocation.meal_type}
                                        {": "}
                                        {mealPrep?.recipe_name
                                            ?? "Unknown recipe"}
                                        {" — "}
                                        {allocation.servings}
                                        {" servings"}
                                    </div>
                                );
                            }
                        )}
                    </div>
                );
            })}
        </div>
    );
}


export default MealPlannerCalendar;