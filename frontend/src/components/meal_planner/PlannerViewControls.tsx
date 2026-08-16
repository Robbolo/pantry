export type PlannerViewMode =
    | "week"
    | "fortnight"
    | "month";


interface Props {
    viewMode: PlannerViewMode;
    onViewModeChange: (
        viewMode: PlannerViewMode,
    ) => void;
}


function PlannerViewControls({
    viewMode,
    onViewModeChange,
}: Props) {
    return (
        <div>
            <button
                onClick={() =>
                    onViewModeChange("week")
                }
                disabled={viewMode === "week"}
            >
                Week
            </button>

            <button
                onClick={() =>
                    onViewModeChange("fortnight")
                }
                disabled={viewMode === "fortnight"}
            >
                Fortnight
            </button>

            <button
                onClick={() =>
                    onViewModeChange("month")
                }
                disabled={viewMode === "month"}
            >
                Month
            </button>
        </div>
    );
}

export default PlannerViewControls;