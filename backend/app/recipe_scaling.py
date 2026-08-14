from decimal import Decimal

def get_scale_factor(base_servings: int, requested_servings: int) -> Decimal:
    """Calculate the scale factor for a recipe based on the base servings and requested servings."""
    if base_servings <= 0:
        raise ValueError("Base servings must be greater than zero.")
    if requested_servings <= 0:
        raise ValueError("Requested servings must be greater than zero.")

    scale_factor = Decimal(requested_servings) / Decimal(base_servings)
    return scale_factor

def scale_ingredient_quantity(
        quantity: int,
        base_servings: int,
        requested_servings: int,
    ) -> int:
    scale_factor = get_scale_factor(base_servings, requested_servings)
    return Decimal(quantity) * scale_factor