import type { MealPrep } from "../../types/meal_prep";
import type { MealAllocation } from "../../types/meal_allocation";


interface Props {
    date: Date;
    dateString: string;
    mealPreps: MealPrep[];
    mealAllocations: MealAllocation[];
    isCurrentDay: boolean;
    onDayClick: (dateString: string) => void;
}


function PlannerDay({
    date,
    dateString,
    mealPreps,
    mealAllocations,
    isCurrentDay,
    onDayClick,
}: Props) {

    return (
        <div
            onClick={() => onDayClick(dateString)}
            style={{
                border: isCurrentDay ? "3px solid" : "1px solid",
                padding: "8px",
                minHeight: "120px",
                cursor: "pointer",
            }}
        >
            <strong>
                {date.toLocaleDateString(
                    undefined,
                    {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                    },
                )}
            </strong>

            {mealPreps.map((prep) => (
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

            {mealAllocations.map((allocation) => (
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
                    {" — "}
                    {allocation.servings}
                    {" servings"}
                </div>
            ))}
        </div>
    );
}


export default PlannerDay;