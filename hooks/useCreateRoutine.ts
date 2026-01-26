import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetSessionByIdQuery } from "@/lib/api/checkout";
import {
  useCreateRoutineOrderMutation,
  useRecalculateRoutineOrderMutation,
} from "@/lib/api/routineOrders";
import { skipToken } from "@reduxjs/toolkit/query";
import { showSuccessToast } from "@/app/utils/toastHelpers";

export const useCreateRoutine = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId");

  const { data: sessionData, isLoading: isSessionLoading } =
    useGetSessionByIdQuery(sessionId || skipToken);

  const [createRoutineOrder, { isLoading: isCreating }] =
    useCreateRoutineOrderMutation();

  const [recalculateRoutineOrder, { isLoading: isRecalculating }] =
    useRecalculateRoutineOrderMutation();

  const [selectedFrequency, setSelectedFrequency] = useState("Weekly");
  const [isCustomFrequency, setIsCustomFrequency] = useState(false);
  const [customDays, setCustomDays] = useState("");
  const [isConsented, setIsConsented] = useState(false);
  // Default start date will be calculated via effect, but init with today
  const [startDate, setStartDate] = useState(new Date());

  const [items, setItems] = useState<any[]>([]);
  const [totals, setTotals] = useState({
    totalPrice: 0,
    totalWeight: 0,
    estimatedShipping: 0,
    currencySymbol: "₦",
  });

  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  // Sync session data
  useEffect(() => {
    if (sessionData?.data?.items) {
      const mappedItems = sessionData.data.items.map((item: any) => ({
        id: item.product.id,
        image: item.product.images?.[0] || "/placeholder-image.png",
        name: item.product.name,
        unitWeight: item.product?.weight || 1,
        quantity: item.quantity,
        price: item.priceAtTime,
        productId: item.productId,
      }));
      setItems(mappedItems);
      if (mappedItems.length > 0) {
        setSelectedItemId(mappedItems[0].id);
      }
      if (sessionData.data.currencySymbol) {
        setTotals((prev) => ({
          ...prev,
          currencySymbol: sessionData.data.currencySymbol,
        }));
      }
    }
  }, [sessionData]);

  const selectedItem = useMemo(
    () => items.find((item) => item.id === selectedItemId),
    [items, selectedItemId],
  );

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  // Recalculation logic
  useEffect(() => {
    const triggerRecalculation = async () => {
      if (items.length === 0) return;

      try {
        const payload = {
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        };

        const res = await recalculateRoutineOrder(payload).unwrap();

        if (res?.data) {
          setTotals({
            totalPrice: res.data.totalAmount || 0,
            totalWeight: res.data.totalWeight || 0,
            estimatedShipping: res.data.deliveryFee || 0,
            currencySymbol: res.data.currencySymbol || totals.currencySymbol,
          });

          if (res.data.items) {
            setItems((currentItems) =>
              currentItems.map((item) => {
                const updatedItem = res.data.items.find(
                  (ui: any) => ui.productId === item.productId,
                );
                if (updatedItem) {
                  return {
                    ...item,
                    price: updatedItem.price || item.price,
                    unitWeight: updatedItem.unitWeight || item.unitWeight,
                  };
                }
                return item;
              }),
            );
          }
        }
      } catch (error) {
        console.error("Recalculation failed", error);
      }
    };

    const timeoutId = setTimeout(() => {
      triggerRecalculation();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [items, recalculateRoutineOrder]);

  const totalPerDelivery = totals.totalPrice + totals.estimatedShipping;

  const frequencies = [
    {
      title: "Weekly",
      subtext: "Delivered every 7 days",
      days: 7,
      value: "WEEKLY",
    },
    {
      title: "Bi-Weekly",
      subtext: "Delivered every 14 days",
      days: 14,
      value: "BIWEEKLY",
    },
    {
      title: "Monthly",
      subtext: "Delivered once every month",
      days: 30,
      value: "MONTHLY",
    },
  ];

  // Effect to update startDate when frequency changes
  useEffect(() => {
    const calculateStartDate = () => {
      const today = new Date();
      let daysToAdd = 7; // Default fallback

      if (isCustomFrequency) {
        daysToAdd = parseInt(customDays) || 0;
      } else {
        const freq = frequencies.find((f) => f.title === selectedFrequency);
        daysToAdd = freq?.days || 7;
      }

      // Safety check to ensure we don't add 0 or invalid days resulting in today or past if that's not intended,
      // but user requests "how many day ahead from the day the order was placed".
      // Assuming valid interval >= 1.
      if (daysToAdd < 1) daysToAdd = 1;

      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + daysToAdd);
      setStartDate(nextDate);
    };

    calculateStartDate();
  }, [selectedFrequency, isCustomFrequency, customDays]);

  const handleCreateRoutine = async () => {
    if (!sessionData?.data?.id) {
      console.error("No Order ID found in session data");
      return;
    }

    let payload: any = {
      orderId: sessionData.data.id,
      firstRunDate: startDate.toISOString(),
      items: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };

    if (isCustomFrequency) {
      if (!customDays || parseInt(customDays) <= 0) {
        console.error("Invalid custom days");
        // Optionally handle UI error
        return;
      }
      payload.frequency = "CUSTOM";
      payload.customIntervalDays = parseInt(customDays);
    } else {
      const frequencyData =
        frequencies.find((f) => f.title === selectedFrequency) ||
        frequencies[0];
      payload.frequency = frequencyData.value;
      // User requested leaving customIntervalDays empty (undefined) for standard frequencies
    }

    try {
      await createRoutineOrder(payload).unwrap();
      showSuccessToast("Routine order created successfully");
      router.push("/orders?tab=routine");
    } catch (error) {
      console.error("Failed to create routine order:", error);
    }
  };

  return {
    router,
    sessionId,
    isSessionLoading,
    isCreating,
    isRecalculating,
    selectedFrequency,
    setSelectedFrequency,
    isCustomFrequency,
    setIsCustomFrequency,
    customDays,
    setCustomDays,
    isConsented,
    setIsConsented,
    startDate,
    setStartDate,
    items,
    totals,
    selectedItemId,
    setSelectedItemId,
    selectedItem,
    updateQuantity,
    totalPerDelivery,
    frequencies,
    handleCreateRoutine,
  };
};
