import Link from "next/link";
import { Box } from "lucide-react";

const RoutineOrderCard = ({ sessionId }: { sessionId: string | null }) => {
  return (
    <div className="bg-[#E3FFEF] rounded-2xl p-6 h- flex flex-col">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-primary rounded-xl p-3 h-fit w-fit shrink-0">
          <Box className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-lg lg:text-xl font-semibold leading-tight text-dark">
          Never run out of this product
        </h2>
      </div>

      <p className="text-sm lg:text-base text-dark/70 mb-8 grow">
        Set your order to reorder automatically on a schedule that works for
        you.
      </p>

      <div className="flex flex-col gap-3 mt-auto">
        <Link
          href={`/orders/create-routine?sessionId=${sessionId}`}
          className="bg-primary rounded-xl flex justify-center items-center w-full h-12 text-center text-white font-semibold text-base transition-colors hover:bg-green-700"
        >
          Set up routine order
        </Link>
        <Link
          href="/"
          className="bg-transparent w-full h-12 flex justify-center items-center text-primary font-semibold text-base hover:bg-green-50 rounded-xl transition-colors"
        >
          Maybe later
        </Link>
      </div>
    </div>
  );
};

export default RoutineOrderCard;
