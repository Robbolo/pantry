import type { MealPrep } from "../../types/meal_prep";
import type { MealAllocation } from "../../types/meal_allocation";

import PlannerDay from "./PlannerDay";


interface Props {
    startDate: string;
    endDate: string;
    mealPreps: MealPrep[];
    mealAllocations: MealAllocation[];
    onDayClick: (dateString: string) => void;
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


function MealPlannerCalendar({
    startDate,
    endDate,
    mealPreps,
    mealAllocations,
    onDayClick,
}: Props) {
    void mealPreps;
    void mealAllocations;
    void onDayClick;

    const dates = getDatesInRange(
        startDate,
        endDate,
    );

    return (
        <div>
            {dates.map((date) => {
                const dateString = formatDate(date);
                
                const prepsForDay = mealPreps.filter(
                    (prep) =>
                        prep.prep_date === dateString,
                );
                const allocationsForDay =
                    mealAllocations.filter(
                        (allocation) =>
                            allocation.meal_date === dateString,
                    );

                return (
                    <PlannerDay
                        key={dateString}
                        date={date}
                        dateString={dateString}
                        mealPreps={prepsForDay}
                        mealAllocations={allocationsForDay}
                        isCurrentDay={isToday(date)}
                        onDayClick={() => {}}
                    />
                );
            })}
        </div>
    );
}


// function MealPlannerCalendar({
//     startDate,
//     endDate,
//     mealPreps,
//     mealAllocations,
//     onDayClick,
// }: Props) {
//     const dates = getDatesInRange(
//         startDate,
//         endDate,
//     );

//     return (
//         <div
//             style={{
//                 display: "grid",
//                 gridTemplateColumns:
//                     "repeat(7, 1fr)",
//                 gap: "8px",
//             }}
//         >
//             {dates.map((date) => {
//                 const dateString =
//                     formatDate(date);

//                 const prepsForDay =
//                     mealPreps.filter(
//                         (prep) =>
//                             prep.prep_date
//                             === dateString
//                     );

//                 const allocationsForDay =
//                     mealAllocations.filter(
//                         (allocation) =>
//                             allocation.meal_date
//                             === dateString
//                     );

//                 return (
//                     <PlannerDay
//                         key={dateString}
//                         date={date}
//                         dateString={dateString}
//                         mealPreps={prepsForDay}
//                         mealAllocations={
//                             allocationsForDay
//                         }
//                         isCurrentDay={
//                             isToday(date)
//                         }
//                         onDayClick={
//                             onDayClick
//                         }
//                     />
//                 );
//             })}
//         </div>
//     );
// }


export default MealPlannerCalendar;