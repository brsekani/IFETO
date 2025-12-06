const BannerContainer = ({ bannerImg, text, subtext }: any) => {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat relative lg:h-[502px] md:h-[306px] h-[220px] "
      style={{ backgroundImage: `url(${bannerImg.src})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t  from-black/95 via-black/40 to-transparent"></div>

      <div className="absolute lg:bottom-12 md:bottom-8 bottom-4 lg:left-20 md:left-14 left-6 text-white font-medium ">
        <h2 className="tracking-wide lg:text-5xl md:text-4xl text-2xl">
          {text}
        </h2>
        <h4 className="lg:text-[32px] lg:mt-2 md:mt-1 md:text-2xl text-sm">
          {subtext}
        </h4>
      </div>
    </div>
  );
};

export default BannerContainer;
