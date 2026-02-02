import Image from "next/image";
import notFound from "@/assets/icons/no-result.svg";
import check from "@/assets/icons/check.svg";
import back from "@/assets/icons/back-green.svg";
import { useRouter } from "next/navigation";

type SearchNotFoundProps = {
  search?: string;
  onClear?: () => void;
};

export default function SearchNotFound({
  search,
  onClear,
}: SearchNotFoundProps) {
  const router = useRouter();

  const content = [
    "Check your spelling or try different keywords",
    "Browse our categories to discover similar products",
    "We are constantly adding new products, check back soon!",
    "Contact us if you are looking for something specific",
  ];

  return (
    <div className="flex flex-col items-center space-y-8 justify-center py-20 text-center">
      <Image
        src={notFound}
        alt="No results"
        width={128}
        height={128}
        className="w-20 h-20 sm:w-32 sm:h-32"
      />
      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="md:text-[32px] text-[20px] md:leading-[38px] leading-[30px] font-semibold text-[#2A2A2A]">
            No results found
          </h2>

          {search && (
            <p className="text-[#6C6C6C] md:text-[18px] text-[16px] md:leading-7 leading-6">
              We couldn't find{" "}
              <span className="font-semibold text-[#6C6C6C]">“{search}”</span>
              on IFETO
            </p>
          )}

          <p className="text-[14px] leading-5 text-[#6C6C6C] md:text-[16px] md:leading-6">
            Don't worry! Here's what you can try:
          </p>
        </div>

        <div className="bg-[#FFFFFF] p-6 rounded-2xl shadow-custom2 space-y-4">
          {content.map((item, i) => (
            <div className="flex items-center gap-3" key={i}>
              <Image src={check} alt="check-icon" />
              <p className="text-[14px] leading-5 text-[#5A5A5A] text-start">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center md:flex-row flex-col w-full justify-center md:gap-4 gap-2">
        {onClear && (
          <button
            onClick={onClear}
            className="px-5 py-2.5 w-full md:w-fit rounded-[6px] bg-[#27AE60] text-white font-semibold hover:bg-[#219653] transition text-[18px] leading-7"
          >
            Clear search & filters
          </button>
        )}

        <button
          onClick={() => {
            router.push("/");
          }}
          className="w-full md:w-fit px-5 py-2.5 border border-[#27AE60] rounded-[6px] text-[18px] leading-7 font-semibold text-[#27AE60] cursor-pointer flex items-center justify-center gap-2.5"
        >
          <Image src={back} alt="back" />
          <p>Back To Home</p>
        </button>
      </div>

      <p className="text-[14px] leading-5 text-[#787878]">
        Need help? Contact our support team at{" "}
        <span className="block sm:inline">
          <a
            href="mailto:IFETO@example.ng?subject=Support Request&body=Hello IFETO team,"
            className="text-[#27AE60]"
          >
            IFETO@example.ng
          </a>
        </span>
      </p>
    </div>
  );
}
