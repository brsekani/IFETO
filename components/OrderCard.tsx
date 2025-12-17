import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

interface OrderCardProps {
  order: {
    id: string;
    date: string;
    total: number;
    status: string;
    items: {
      name: string;
      image: any;
    }[];
    weight: string;
    shippingMethod: string;
    estimatedDelivery: string;
  };
}

const OrderCard = ({ order }: OrderCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-[#F3E8FF] text-[#9333EA]";
      case "processing":
        return "bg-[#FFF8E6] text-[#F2C94C]";
      case "shipped":
        return "bg-[#E6F7FF] text-[#2F80ED]";
      case "cancelled":
        return "bg-[#FFEEEE] text-[#EB5757]";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="shadow-custom2 rounded-2xl p-6 bg-white hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-sm lg:text-base font-semibold text-dark mb-1">
            Order #{order.id}
          </h3>
          <p className="text-sm text-light mt-2">Placed on {order.date}</p>
        </div>
        <span
          className={`px-4 py-1.5 rounded-full text-xs lg:text-base font-semibold ${getStatusColor(
            order.status
          )}`}
        >
          {order.status}
        </span>
      </div>

      <div className="flex flex-wrap gap-6 mb-6">
        {order.items.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <div className="relative w-20 h-[70px] bg-[#EFEEEE] rounded-md overflow-hidden border border-gray-100">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-contain p-2"
              />
            </div>
            <p className="text-sm text-[#5A5A5A] font-medium text-center max-w-[80px] truncate">
              {item.name}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row justify-between lg:items-center items-start py-4 border-y border-[#EFEEEE] mb-4 gap-2">
        <div className="flex flex-col gap-1">
          <span className="lg:text-sm text-xs text-light">Total Weight</span>
          <span className="lg:text-lg text-sm font-semibold text-dark mt-2">
            {order.weight}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="lg:text-sm text-xs text-light">Shipping Method</span>
          <span className="lg:text-lg text-sm font-semibold text-dark mt-2">
            {order.shippingMethod}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="lg:text-sm text-xs text-light">
            Estimated Delivery
          </span>
          <span className="lg:text-lg text-sm font-semibold text-dark mt-2">
            {order.estimatedDelivery}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <div>
          <p className="lg:text-lg text-base font-bold text-dark">
            Total: ${order.total.toFixed(2)}
          </p>
        </div>

        <Link
          href={`/orders/${order.id}`}
          className="flex items-center gap-1 text-primary font-semibold hover:underline"
        >
          View Details
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default OrderCard;
