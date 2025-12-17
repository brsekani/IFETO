import aboutImg2 from "@/assets/images/about-img2.png";
import aboutImg from "@/assets/images/aboutImg.png";
import AboutSlider from "@/components/general/AboutSlider";
import BannerContainer from "@/components/general/BannerContainer";
import FAQ from "@/components/general/FAQ";

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
          <div className="lg:w-1/2 lg:my-14 my-6 lg:px-0 md:px-14 px-6">
            <h2 className="font-semibold lg:text-4xl md:text-2xl text-lg">
              The African Marketplace
            </h2>
            <p className="lg:mt-9 md:mt-6 mt-4 lg:text-xl md:text-base text-xs text-justify text-[#606060]">
              At IFETO, we connect African vendors with customers around the
              world through our multi-vendor e-commerce platform. Our platform
              offers ethically sourced natural goods, including raw foods,
              spices, and traditional attire, ensuring every product meets our
              standards for quality, sustainability, and transparency. With
              IFETO, you can purchase directly from the source, supporting local
              vendors while enjoying authentic, high-quality products. Through
              our subscription-first model and seamless user experience, we make
              it easy for you to explore, trust, and enjoy goods that are
              ethically and sustainably produced. Together, we’re bridging
              Africa’s rich resources with a global audience that values
              integrity and authenticity
            </p>

            <div className="flex items-center justify-center lg:block">
              <button className=" px-5 md:h-12 h-10 bg-primary text-white lg:text-lg font-semibold text-center rounded-md md:mt-8 mt-5">
                Go To Shop Now
              </button>
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
