import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTrackingSteps = (order: any) => {
  if (!order) return [];

  const {
    status: statusKey,
    createdAt,
    processedAt,
    shippedAt,
    deliveredAt,
  } = order;
  const status = statusKey?.toUpperCase();
  const isCancelled = status === "CANCELED" || status === "CANCELLED";

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (e) {
      return "N/A";
    }
  };

  const steps = [
    {
      status: "Order Placed",
      date: formatDate(createdAt),
      completed:
        !isCancelled &&
        ["PENDING", "PROCESSING", "INTRANSIT", "DELIVERED", "SHIPPED"].includes(
          status,
        ),
    },
    {
      status: "Verified & Packed",
      date: formatDate(processedAt),
      completed:
        !isCancelled &&
        ["PROCESSING", "INTRANSIT", "DELIVERED", "SHIPPED"].includes(status),
    },
    {
      status: "Shipped from warehouse",
      date: formatDate(shippedAt),
      completed:
        !isCancelled && ["INTRANSIT", "DELIVERED", "SHIPPED"].includes(status),
    },
    {
      status: "Out for delivery",
      date: formatDate(shippedAt), // Usually tracking updates here, reusing shippedAt for now as per original logic or placeholder
      completed: !isCancelled && ["INTRANSIT", "DELIVERED"].includes(status),
    },
    {
      status: "Delivered",
      date: formatDate(deliveredAt),
      completed: !isCancelled && ["DELIVERED"].includes(status),
    },
  ];
  return steps;
};
