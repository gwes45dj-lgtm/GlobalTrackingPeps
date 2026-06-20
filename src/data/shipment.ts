export const VALID_TRACKING_NUMBER = "849201156290";

export type Stage = {
  label: string;
  location: string;
  date: Date;
};

export const STAGES: Stage[] = [
  { label: "Shipment information received", location: "New York, NY", date: new Date("2026-06-17T08:00:00") },
  { label: "Picked up by carrier", location: "New York, NY", date: new Date("2026-06-19T09:00:00") },
  { label: "Departed origin facility", location: "New York, NY", date: new Date("2026-06-22T07:30:00") },
  { label: "Arrived at sorting hub", location: "Louisville, KY", date: new Date("2026-06-23T14:00:00") },
  { label: "Departed sorting hub", location: "Louisville, KY", date: new Date("2026-06-24T19:45:00") },
  { label: "Arrived at export gateway", location: "Chicago, IL", date: new Date("2026-06-26T06:20:00") },
  { label: "In transit to destination", location: "—", date: new Date("2026-06-27T11:00:00") },
  { label: "Arrived at destination facility", location: "Larnaca, Cyprus", date: new Date("2026-06-29T08:15:00") },
  { label: "Out for delivery", location: "Larnaca, Cyprus", date: new Date("2026-06-30T07:00:00") },
  { label: "Delivered", location: "Larnaca, Cyprus", date: new Date("2026-06-30T16:00:00") },
];

export const ORIGIN = { label: "New York, NY", x: 240, y: 170 };
export const DESTINATION = { label: "Larnaca, Cyprus", x: 735, y: 205 };

export function getShipmentStatus(now: Date) {
  let activeIndex = 0;
  for (let i = 0; i < STAGES.length; i++) {
    if (STAGES[i].date.getTime() <= now.getTime()) {
      activeIndex = i;
    } else {
      break;
    }
  }

  const isDelivered = now.getTime() >= STAGES[STAGES.length - 1].date.getTime();
  const pickupStart = STAGES[1].date;
  const deliveryEnd = STAGES[STAGES.length - 1].date;

  let progress = 0;
  if (now.getTime() >= deliveryEnd.getTime()) {
    progress = 1;
  } else if (now.getTime() > pickupStart.getTime()) {
    progress = (now.getTime() - pickupStart.getTime()) / (deliveryEnd.getTime() - pickupStart.getTime());
  }

  return { activeIndex, isDelivered, progress };
}

export function formatDateTime(date: Date) {
  return date.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDate(date: Date) {
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
