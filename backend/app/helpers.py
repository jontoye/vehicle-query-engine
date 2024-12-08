import models
from schemas import VehicleBase
from sqlalchemy import asc, desc


def apply_year_filter(query, year, year_gte, year_lte):
    """
    Applies year-based filtering to the query.

    Args:
        query: The SQLAlchemy query object.
        year: The specific year to filter by.
        year_gte: The minimum year to filter by (greater than or equal to).
        year_lte: The maximum year to filter by (less than or equal to).

    Returns:
        The query object with the applied year filters.
    """
    if year is not None:
        query = query.filter(models.Vehicle.year == year)
    if year_gte is not None:
        query = query.filter(models.Vehicle.year >= year_gte)
    if year_lte is not None:
        query = query.filter(models.Vehicle.year <= year_lte)
    return query


def apply_vehicle_type_filters(query, model, filters):
    """
    Applies filters specific to a vehicle type to the query.

    Args:
        query: The SQLAlchemy query object.
        model: The SQLAlchemy model to apply the filters to.
        filters: A dictionary of filters to apply.

    Returns:
        The query object with the applied vehicle type filters.
    """
    for key, val in filters:
        if val is not None:
            query = query.filter(getattr(model, key) == val)
    return query


def get_sort_column(sort_by, model, fields):
    """
    Determines the column to sort by based on the provided sort_by field.

    Args:
        sort_by: The field to sort by.
        model: The SQLAlchemy model to get the column from.
        fields: A list of valid fields for the model.

    Returns:
        The column to sort by.
    """
    if sort_by in fields:
        sort_column = getattr(model, sort_by)
    elif sort_by in VehicleBase.model_fields:
        sort_column = getattr(models.Vehicle, sort_by)
    else:
        sort_column = "id"
    return sort_column


def apply_sort_order(query, sort_order, sort_column):
    """
    Applies sorting to the query based on the provided sort order and column.

    Args:
        query: The SQLAlchemy query object.
        sort_order: The order to sort by ("asc" for ascending, "desc" for descending).
        sort_column: The column to sort by.

    Returns:
        The query object with the applied sort order.
    """
    if sort_order == "asc":
        query = query.order_by(asc(sort_column))
    else:
        query = query.order_by(desc(sort_column))
    return query
