import { useState, useMemo, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  useGetRoutineOrderByIdQuery,
  useUpdateRoutineOrderMutation,
  usePauseRoutineOrderMutation,
  useResumeRoutineOrderMutation,
  useCancelRoutineOrderMutation,
  useRecalculateRoutineOrderMutation,
} from "@/lib/api/routineOrders";
import { format } from "date-fns";
import { showSuccessToast } from "@/app/utils/toastHelpers";

export const useEditRoutine = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const { data: routineOrderData, isLoading } = useGetRoutineOrderByIdQuery(
    id,
    {
      skip: !id,
    },
  );

  const [updateRoutineOrder, { isLoading: isUpdating }] =
    useUpdateRoutineOrderMutation();
  const [pauseRoutineOrder] = usePauseRoutineOrderMutation();
  const [resumeRoutineOrder] = useResumeRoutineOrderMutation();
  const [cancelRoutineOrder, { isLoading: isCanceling }] =
    useCancelRoutineOrderMutation();

  const [recalculateRoutineOrder, { isLoading: isRecalculating }] =
    useRecalculateRoutineOrderMutation();

  const [selectedFrequency, setSelectedFrequency] = useState("Monthly");
  const [isCustomFrequency, setIsCustomFrequency] = useState(false);
  const [customDays, setCustomDays] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [loadingAction, setLoadingAction] = useState<{
    id: string;
    action: string;
  } | null>(null);

  const [startDate, setStartDate] = useState<Date | null>(null);

  const [items, setItems] = useState<any[]>([]);
  const [currencySymbol, setCurrencySymbol] = useState("₦");
  const [orderStatus, setOrderStatus] = useState("ACTIVE");

  const [totals, setTotals] = useState({
    totalPrice: 0,
    totalWeight: 0,
    estimatedShipping: 0,
  });

  useEffect(() => {
    if (routineOrderData?.data) {
      const order = routineOrderData.data;
      setOrderStatus(order.status);
      setCurrencySymbol(order.currencySymbol || "₦");

      // Populate Items
      if (order.items) {
        setItems(
          order.items.map((item: any) => ({
            id: item.product.id,
            productId: item.productId,
            image: item.product.images?.[0] || "/placeholder-image.png",
            name: item.product.name,
            unitWeight: item.product.weight || 0,
            quantity: item.quantity,
            price: item.product.sellingPrice || item.product.baseCost || 0,
          })),
        );
      }

      // Populate Totals
      setTotals({
        totalPrice: order.totalAmount || 0,
        totalWeight: 0, // Backend might not send total weight on GET, will be fixed by recalc or derived.
        estimatedShipping: order.deliveryFee || 0,
      });

      // Populate Frequency
      if (order.frequency === "CUSTOM") {
        setIsCustomFrequency(true);
        setSelectedFrequency("Custom");
        setCustomDays(order.customIntervalDays?.toString() || "");
      } else {
        setIsCustomFrequency(false);
        // Map backend scalar to Title Case if needed, or assume matches
        const title = order.frequency
          ? order.frequency.charAt(0).toUpperCase() +
            order.frequency.slice(1).toLowerCase()
          : "Monthly";
        // Simple mapping correction if needed, assuming standard "Weekly", "Bi-Weekly", "Monthly"
        if (order.frequency === "BIWEEKLY") setSelectedFrequency("Bi-Weekly");
        else if (order.frequency === "WEEKLY") setSelectedFrequency("Weekly");
        else if (order.frequency === "MONTHLY") setSelectedFrequency("Monthly");
        else setSelectedFrequency(title);
      }

      // Populate Date
      if (order.nextRunDate) {
        const nextDate = new Date(order.nextRunDate);
        if (!isNaN(nextDate.getTime())) {
          setStartDate(nextDate);
        } else {
          setStartDate(new Date()); // Fallback
        }
      } else {
        setStartDate(new Date()); // Default if missing
      }
    }
  }, [routineOrderData]);

  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  useEffect(() => {
    if (items.length > 0 && !selectedItemId) {
      setSelectedItemId(items[0].id);
    }
  }, [items, selectedItemId]);

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
  // Create a stable key for dependencies to avoid infinite loops when prices/weights update
  const itemsDependency = useMemo(
    () =>
      JSON.stringify(items.map((i) => ({ id: i.productId, q: i.quantity }))),
    [items],
  );

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
          });

          if (res.data.currencySymbol) {
            setCurrencySymbol(res.data.currencySymbol);
          }

          if (res.data.items) {
            setItems((currentItems) =>
              currentItems.map((item) => {
                const updatedItem = res.data.items.find(
                  (ui: any) => ui.productId === item.productId,
                );
                if (updatedItem) {
                  // only update if changed
                  if (
                    item.price !== updatedItem.price ||
                    item.unitWeight !== updatedItem.unitWeight
                  ) {
                    return {
                      ...item,
                      price: updatedItem.price || item.price,
                      unitWeight: updatedItem.unitWeight || item.unitWeight,
                    };
                  }
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
  }, [itemsDependency, recalculateRoutineOrder]);

  const frequencies = [
    {
      title: "Weekly",
      subtext: "Delivered every 7 days",
      value: "WEEKLY",
    },
    {
      title: "Bi-Weekly",
      subtext: "Delivered every 14 days",
      value: "BIWEEKLY",
    },
    {
      title: "Monthly",
      subtext: "Delivered once every month",
      value: "MONTHLY",
    },
  ];

  const handleSaveChanges = async () => {
    if (!id) return;

    let frequency = isCustomFrequency
      ? "CUSTOM"
      : frequencies.find((f) => f.title === selectedFrequency)?.value ||
        "MONTHLY";
    let customDaysValue = isCustomFrequency ? parseInt(customDays) : undefined;

    const payload = {
      items: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      frequency,
      customIntervalDays: customDaysValue,
      status: orderStatus,
    };

    try {
      await updateRoutineOrder({ id, body: payload }).unwrap();
      showSuccessToast("Routine order updated successfully");
      router.back();
    } catch (error) {
      console.error("Failed to update order", error);
    }
  };

  const handleToggleStatus = async () => {
    if (!id) return;
    const action = orderStatus === "ACTIVE" ? "PAUSE" : "RESUME";
    setLoadingAction({ id, action });
    try {
      if (orderStatus === "ACTIVE") {
        await pauseRoutineOrder(id).unwrap();
        setOrderStatus("PAUSED");
        showSuccessToast("Routine order paused successfully");
      } else {
        await resumeRoutineOrder(id).unwrap();
        setOrderStatus("ACTIVE");
        showSuccessToast("Routine order resumed successfully");
      }
    } catch (error) {
      console.error("Failed to toggle status", error);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleCancel = async () => {
    if (!id) return;
    try {
      await cancelRoutineOrder(id).unwrap();
      setShowCancelModal(false);
      showSuccessToast("Routine order cancelled successfully");
      router.push("/account/routine");
    } catch (error) {
      console.error("Failed to cancel", error);
    }
  };

  return {
    router,
    id,
    isLoading,
    isUpdating,
    isCanceling,
    isRecalculating,
    selectedFrequency,
    setSelectedFrequency,
    isCustomFrequency,
    setIsCustomFrequency,
    customDays,
    setCustomDays,
    showCancelModal,
    setShowCancelModal,
    loadingAction,
    startDate,
    items,
    currencySymbol,
    orderStatus,
    selectedItemId,
    setSelectedItemId,
    selectedItem,
    updateQuantity,
    totalWeight: totals.totalWeight,
    totalProductsPrice: totals.totalPrice,
    estimatedShipping: totals.estimatedShipping,
    totalPerDelivery: totals.totalPrice + totals.estimatedShipping,
    frequencies,
    handleSaveChanges,
    handleToggleStatus,
    handleCancel,
  };
};
