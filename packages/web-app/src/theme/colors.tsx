import { Vehicle } from "ws-backend/types/vehicle.ts";

export const yColors = {
  background: {
    white: "#FFFFFF",
    secondary: "#F0F3F6",
  },
  primary: {
    orange: "#F7B328", // brand_orange
    green: "#00B08E", // brand_green
  },
  text: {
    primary: "#374154",
    invert: "#FFFFFF",
  },
  border: {
    default: "#D0E0E6",
  },
  status: {
    danger: {
      subtle: "#FFE3E2",
      red: "#F04A38",
    },
    success: {
      subtle: "#ECFDF3",
      green: "#17A866",
    },
  },
};

export const vehicleColor: Record<
  Vehicle["status"],
  { text: string; bg: string }
> = {
  AVAILABLE: { text: yColors.primary.green, bg: yColors.status.success.subtle },
  DISABLED: {
    bg: yColors.status.danger.subtle,
    text: yColors.status.danger.red,
  },
  BOOKED: {
    bg: yColors.background.secondary,
    text: yColors.text.primary,
  },
  MAINTENANCE: {
    bg: yColors.status.danger.subtle,
    text: yColors.status.danger.red,
  },
};
