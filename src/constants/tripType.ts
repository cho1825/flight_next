
export const TRIP_TYPES = ["oneway", "roundTrip"] as const;
export type TripType = typeof TRIP_TYPES[number];