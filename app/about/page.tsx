import aboutImg2 from "@/assets/images/about-img2.png";
import aboutImg from "@/assets/images/aboutImg.png";
import AboutSlider from "@/components/general/AboutSlider";
import BannerContainer from "@/components/general/BannerContainer";
import FAQ from "@/components/general/FAQ";
import Link from "next/link";

const Page = () => {
  return (
    <div className="min-h-screen">
      <BannerContainer
        bannerImg={aboutImg}
        text="Get to know us"
        subtext="Where african quality meets global convenience"
      />

      <div className="lg:mt-20 md:mt-14 mt-6 lg:px-20 max-w-[1440px] mx-auto">
        <div className="lg:flex gap-9 w-full h-fit">
          <div className="lg:w-1/2 lg:my-14 my-6 lg:px-0 md:px-14 px-6 flex flex-col gap-6">
            <div>
              <h2 className="font-semibold lg:text-4xl md:text-2xl text-lg mb-3">
                The African Marketplace
              </h2>
              <p className="lg:text-lg md:text-base text-xs text-justify text-[#606060] leading-relaxed">
                IFETO is an e-commerce platform whose name is derived from the
                word Ifetito, meaning "Love is sufficient." This profound
                philosophy drives our dedication to connecting high-quality,
                ethically sourced goods from African markets directly to
                customers in Europe and the United States.
              </p>
            </div>

            <div>
              <h3 className="font-semibold lg:text-2xl md:text-xl text-base text-[#363636] mb-2">
                Our Core Commitment:
              </h3>
              <p className="lg:text-lg md:text-base text-xs text-justify text-[#606060] leading-relaxed">
                Our mission is to spread this sufficient love to every customer
                through every IFETO product, especially our high-quality food
                and healthy products. We believe in conscious consumption where
                the goods you receive—be it an artisanal craft or a rare food
                item—not only meet a rigorous quality standard but also uplift
                the communities that produce them.
              </p>
            </div>

            <div>
              <h3 className="font-semibold lg:text-2xl md:text-xl text-base text-[#363636] mb-2">
                The IFETO Difference:
              </h3>
              <ul className="flex flex-col gap-3 lg:text-lg md:text-base text-xs text-justify text-[#606060] leading-relaxed list-disc pl-5">
                <li>
                  <span className="font-semibold">
                    Ethical Quality:
                  </span>{" "}
                  We focus on transparency, sustainability, and vendor dignity,
                  ensuring every purchase makes a positive impact.
                </li>
                <li>
                  <span className="font-semibold">
                    The Experience:
                  </span>{" "}
                  Our clean, green-and-white aesthetic reflects the purity and
                  natural excellence of our offerings.
                </li>
                <li>
                  <span className="font-semibold">
                    Mandatory Security:
                  </span>{" "}
                  For personalized service, compliance, and data integrity,
                  mandatory account creation is required for full shopping
                  access (detailed pricing and checkout).
                </li>
                <li>
                  <span className="font-semibold">
                    Frictionless Global Logistics:
                  </span>{" "}
                  We manage the complex cross-continental shipping, partnering
                  with reliable couriers (DHL, UPS) to guarantee fast, confident
                  delivery from origin to doorstep.
                </li>
              </ul>
              <p className="mt-4 font-medium lg:text-xl md:text-lg text-sm text-[#363636] italic">
                IFETO is the platform to shop right, connect responsibly, and
                receive a piece of authentic global love.
              </p>
            </div>

            <div className="flex items-center justify-center lg:block mt-2">
              <Link
                href="/shop"
                className="px-6 py-3 bg-primary text-white lg:text-lg font-semibold text-center rounded-md w-fit flex justify-center items-center hover:bg-opacity-90 transition-all"
              >
                Go To Shop Now
              </Link>
            </div>
          </div>

          <div
            className="lg:w-1/2 bg-cover bg-center bg-no-repeat h-[430px] lg:h-auto"
            style={{ backgroundImage: `url(${aboutImg2.src})` }}
          ></div>
        </div>
      </div>

      <div className="lg:mt-20 md:mt-14 mt-6 max-w-[1440px] mx-auto px-6 lg:px-20 mb-20">
        <FAQ />
      </div>
    </div>
  );
};

export default Page;
