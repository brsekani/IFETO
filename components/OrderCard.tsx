import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { Order } from "@/lib/types";
import { format } from "date-fns";

interface OrderCardProps {
  order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-[#F3E8FF] text-[#9333EA]";
      case "processing":
      case "pending":
        return "bg-[#FFF8E6] text-[#F2C94C]";
      case "shipped":
        return "bg-[#E6F7FF] text-[#2F80ED]";
      case "cancelled":
        return "bg-[#FFEEEE] text-[#EB5757]";
      case "successful":
      case "success":
        return "bg-[#E3FFEF] text-primary";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const formattedDate = order.createdAt
    ? format(new Date(order.createdAt), "MMM d, yyyy")
    : "N/A";

  return (
    <div className="shadow-custom2 rounded-2xl p-6 bg-white hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-sm lg:text-base font-semibold text-dark mb-1 font-nunito">
            Order #{order.id.slice(0, 8)}
          </h3>
          <p className="text-sm text-light mt-2 font-nunito">
            Placed on {formattedDate}
          </p>
        </div>
        <span
          className={`px-4 py-1.5 rounded-full text-xs lg:text-base font-semibold font-nunito ${getStatusColor(
            order.status || order.paymentStatus
          )}`}
        >
          {order.status || order.paymentStatus}
        </span>
      </div>

      <div className="flex flex-wrap gap-6 mb-6">
        {order?.items?.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <div className="relative w-20 h-[70px] bg-[#EFEEEE] rounded-md overflow-hidden border border-gray-100">
              <Image
                src={item.product?.images?.[0] || ""}
                alt={item.product?.name || "Product"}
                fill
                className="object-contain p-2"
              />
            </div>
            <p className="text-sm text-[#5A5A5A] font-medium text-center max-w-[80px] truncate font-nunito">
              {item.product?.name}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row justify-between lg:items-center items-start py-4 border-y border-[#EFEEEE] mb-4 gap-2">
        <div className="flex flex-col gap-1">
          <span className="lg:text-sm text-xs text-light font-nunito">
            Total Weight
          </span>
          <span className="lg:text-lg text-sm font-semibold text-dark mt-2 font-nunito">
            {order?.totalWeight}kg
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="lg:text-sm text-xs text-light font-nunito">
            Shipping Method
          </span>
          <span className="lg:text-lg text-sm font-semibold text-dark mt-2 font-nunito">
            {order?.shippingCarrier || "Standard Shipping"}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="lg:text-sm text-xs text-light font-nunito">
            Estimated Delivery
          </span>
          <span className="lg:text-lg text-sm font-semibold text-dark mt-2 font-nunito">
            {order?.status === "DELIVERED" ? "Completed" : "Processing"}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <div>
          <p className="lg:text-lg text-base font-bold text-dark font-nunito">
            Total: {order?.currencySymbol || "$"}
            {order?.totalAmountPaid?.toFixed(2)}
          </p>
        </div>

        <Link
          href={`/orders/${order?.id}`}
          className="flex items-center gap-1 text-primary font-semibold hover:underline font-nunito"
        >
          View Details
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default OrderCard;
