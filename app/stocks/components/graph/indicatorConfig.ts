


export const INDICATOR_CONFIG = {
  sma30: {
    label: "30 day SMA",
    window: 10,
    field: "sma30",
  },
  sma90: {
    label: "90 day SMA",
    window: 30,
    field: "sma90",
  },
  sma180: {
    label: "180 day SMA",
    window: 60,
    field: "sma180",
  },
} as const;
