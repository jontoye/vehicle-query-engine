export const DEFAULT_RESULT_LIMIT = "10";

export const SEAT_OPTIONS = ["2", "4", "5", "7", "8"].map((option) => ({ label: option, value: option }));

export const YEAR_OPTIONS = Array.from({ length: 2024 - 1950 + 1 }, (_, index) => (1950 + index).toString()).map(
  (value) => ({
    label: value,
    value: value,
  })
);

export const NUM_RESULTS_OPTIONS = ["10", "25", "50", "100"].map((option) => ({ label: option, value: option }));
