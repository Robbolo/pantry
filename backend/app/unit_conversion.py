from decimal import Decimal


UNIT_GROUPS = {
    "g": "mass",
    "kg": "mass",
    "ml": "volume",
    "l": "volume",
    "each": "count",
}


TO_BASE_UNIT = {
    "g": Decimal("1"),
    "kg": Decimal("1000"),
    "ml": Decimal("1"),
    "l": Decimal("1000"),
    "each": Decimal("1"),
}


def units_are_compatible(
    first_unit: str,
    second_unit: str,
) -> bool:
    return (
        UNIT_GROUPS.get(first_unit)
        == UNIT_GROUPS.get(second_unit)
    )


def convert_to_base_unit(
    quantity: int,
    unit: str,
) -> Decimal:
    conversion_factor = TO_BASE_UNIT.get(unit)

    if conversion_factor is None:
        raise ValueError(
            f"Unsupported unit: {unit}"
        )

    return Decimal(quantity) * conversion_factor