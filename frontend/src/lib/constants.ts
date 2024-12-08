export const DEFAULT_RESULT_LIMIT = "10";
export const NUM_RESULTS_OPTIONS = ["10", "25", "50", "100", "150"].map((option) => ({ label: option, value: option }));

export const SEAT_OPTIONS = ["2", "4", "5", "7", "8"].map((option) => ({ label: option, value: option }));

export const YEAR_OPTIONS = Array.from({ length: 2024 - 1950 + 1 }, (_, index) => (1950 + index).toString()).map(
  (value) => ({
    label: value,
    value: value,
  })
);

export const GEARS_OPTIONS = ["1", "3", "7", "14", "21", "24", "27"].map((option) => ({
  label: option,
  value: option,
}));
export const BIKE_TYPE_OPTIONS = ["Road", "City", "BMX", "Mountain", "Hybrid"].map((option) => ({ label: option, value: option }));

export const MAX_CREW_OPTIONS = ["1", "2", "10", "50", "100", "400", "8000"].map((option) => ({
  label: option,
  value: option,
}));
