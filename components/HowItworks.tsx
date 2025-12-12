import Image from "next/image";
import authImg from "@/assets/images/authImg.png";

const data = [
  {
    title: "Shop Directly from Nigerian Producers",
    desc: "Gain direct access to high-quality products sourced straight from Nigeria’s most trusted factories, farmers, and manufacturers. IFETO removes unnecessary middlemen, giving you transparent pricing, authentic goods, and a clear view of where every product comes from.",
  },
  {
    title: "We Handle Quality & Compliance",
    desc: "Every product listed on IFETO goes through a detailed quality and compliance verification process. We work closely with accredited vendors to ensure all items meet both local and international standards—covering packaging, certifications, safety, and export requirements.",
  },
  {
    title: "Global Delivery to Your Doorstep",
    desc: "Enjoy fast, secure, and reliable delivery to any country worldwide. Our logistics network works hand-in-hand with reputable international shipping companies to ensure your orders are picked, processed, and delivered with precision. Track your shipment in real time and receive your goods with ease, no matter where you are located.",
  },
];

export default function HowItworks() {
  return (
    <div className="max-w-[1440px] mx-auto w-full px-6 md:px-20 space-y-[54px]">
      <div className="text-center w-full flex items-center flex-col gap-[18px]">
        <span className="bg-[#E3FFEF] px-4 py-2 rounded-3xl text-[16px] leading-6 text-[#5A5A5A]">
          How it works
        </span>
        <p className="max-w-[900px] w-full mx-auto md:text-[30px] text-[20px] md:leading-8 leading-[30px] text-[#2A2A2A] font-semibold">
          From discovery to doorstep—our streamlined process makes ordering
          effortless.
        </p>
      </div>

      <div className="flex flex-col md:flex-row lg:gap-14 md:gap-5 gap-6 justify-between">
        <Image
          src={authImg}
          alt=""
          className="md:max-w-[491px] max-w-[300px] mx-auto w-full rounded-xl"
        />

        <div className="md:space-y-[17px] space-y-2">
          {data.map((d, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row md:items-start items-center gap-6 md:p-4 p-2"
            >
              <p className="md:h-[52px] md:w-[54px] w-9 h-[38px] bg-[#27AE60] flex items-center justify-center rounded-full md:text-[32px] text-[18px] md:leading-[38px] leading-[30px] font-bold text-[#FFFFFF]">
                {i + 1}
              </p>

              <div className="max-w-[736px] w-full bg-[#EFEEEE] p-4 space-y-4 rounded-2xl">
                <h6 className="md:text-[24px] text-[18px] md:leading-8 leading-7 text-[#2A2A2A] font-semibold">
                  {d.title}
                </h6>
                <p className="md:text-[18px] text-[14px] md:leading-7 leading-5 text-[#787878] md:pr-5">
                  {d.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
