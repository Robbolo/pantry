interface Props {
    startDate: string;
    endDate: string;
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


function MealPlannerCalendar({
    startDate,
    endDate,
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
            {dates.map((date) => (
                <div
                    key={date.toISOString()}
                    style={{
                        border: "1px solid",
                        padding: "8px",
                        minHeight: "120px",
                    }}
                >
                    <strong>
                        {formatDisplayDate(date)}
                    </strong>
                </div>
            ))}
        </div>
    );
}


export default MealPlannerCalendar;