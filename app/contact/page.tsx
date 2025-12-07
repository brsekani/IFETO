"use client";

import Image from "next/image";
import { Mail, MapPin, PhoneCall } from "lucide-react";
import BannerContainer from "@/components/general/BannerContainer";
import contactImg from "@/assets/images/contact-img.png";
import phoneImg from "@/assets/images/iPhone 17.png";
import star from "@/assets/icons/star.png";
import users from "@/assets/icons/profile-2user.png";
import facebook from "@/assets/icons/facebook.svg";
import instagram from "@/assets/icons/instagram.svg";
import linkedin from "@/assets/icons/linkedin.svg";
import twitterx from "@/assets/icons/twitterX.svg";
import ContactForm from "@/components/general/ContactForm";

const Contact = () => {
  const canContinue = true;
  return (
    <div className="min-h-screen">
      <BannerContainer
        bannerImg={contactImg}
        text="Get In Touch"
        subtext="Quick Responses. Seamless Connection"
      />

      <div className="">
        <div className="bg-[#f8f8f8] lg:py-20 md:py-14 py-6  lg:px-20 md:px-14 px-6">
          <div className="grid max-w-[1440px] mx-auto gap-6 grid-cols-[repeat(auto-fit,minmax(320px,1fr))]">
            <div className="bg-white shadow-custom2 rounded-2xl px-7 py-11 flex items-center gap-4">
              <div className="rounded-full h-12 w-12 bg-primary text-white flex items-center justify-center">
                <Mail className="" />
              </div>
              <div className="">
                <h2 className="font-medium lg:text-xl text-lg">
                  Email Address
                </h2>
                <h5 className="lg:mt-1.5 mt-1 lg:text-base text-sm">
                  Ifeto@example.ng
                </h5>
              </div>
            </div>
            <div className="bg-white shadow-custom2 rounded-2xl px-7 py-11 flex items-center gap-4">
              <div className="rounded-full h-12 w-12 bg-primary text-white flex items-center justify-center">
                <PhoneCall className="" />
              </div>
              <div className="">
                <h2 className="font-medium lg:text-xl text-lg">Hot lines</h2>
                <h5 className="lg:mt-1.5 mt-1 lg:text-base text-sm">
                  +23470264123598 <br />
                  +23470264123598
                </h5>
              </div>
            </div>
            <div className="bg-white shadow-custom2 rounded-2xl px-7 py-11 flex items-center gap-4">
              <div className="w-fit">
                <div className="rounded-full h-12 w-12 bg-primary text-white flex items-center justify-center">
                  <MapPin className="" />
                </div>
              </div>
              <div className="w-full">
                <h2 className="font-medium lg:text-xl text-lg">
                  Office Address
                </h2>
                <h5 className="lg:mt-1.5 mt-1 lg:text-base text-sm">
                  12 Aurora Crescent, Lekki Phase1 Lagos, Nigeria
                </h5>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#F4F4F5] lg:py-10 md:py-8 py-6  lg:px-20 md:px-14 px-6">
          <div className="flex flex-col-reverse lg:flex-row gap-9 max-w-[1440px] mx-auto">
            <div className="lg:w-5/12">
              <div className="bg-[#E3FFEF] py-1 px-4 rounded-2xl flex items-center justify-center gap-1.5 w-fit">
                <div className="lg:w-2.5 w-[7px] lg:h-2.5 h-[7px] rounded-full bg-primary" />
                <span className="lg:text-xl md:text-base text-sm font-medium text-primary">
                  Available 24/7
                </span>
              </div>

              <div className="mt-6">
                <p className="font-medium lg:text-5xl text-4xl max-w-[330px] lg:max-w-[440px]">
                  Connect With Us Anytime, Anywhere
                </p>
                <div className="mt-24 relative">
                  <Image src={phoneImg} alt="phone" />
                  <div className="lg:w-[207px] lg:h-[89px] h-[70px] shadow-custom1 bg-white rounded-xl lg:rounded-2xl p-4 absolute top-0 left-0 flex items-center gap-4 hover:-top-1 duration-300">
                    <div className="bg-primary w-10 lg:w-12 h-10 lg:h-12 rounded-full flex items-center justify-center">
                      <Image
                        src={star}
                        alt="star icon"
                        className="w-5 lg:w-[25px]"
                      />
                    </div>
                    <div className="">
                      <h3 className="font-medium lg:text-xl">4.8 Rating</h3>
                      <h5 className="mt-1 lg:text-base text-xs">2k+ Reviews</h5>
                    </div>
                  </div>
                  <div className="lg:w-[207px] lg:h-[89px] h-[70px] shadow-custom1 bg-white rounded-xl lg:rounded-2xl p-4 absolute bottom-24  hover:bottom-[100px] duration-300 lg:right-11 md:right-8 right-0 flex items-center gap-4 hover:scale-y-[1.04]">
                    <div className="bg-primary w-10 lg:w-12 h-10 lg:h-12 rounded-full flex items-center justify-center">
                      <Image
                        src={users}
                        alt="users icon"
                        className="w-5 lg:w-[25px]"
                      />
                    </div>
                    <div className="">
                      <h3 className="font-medium lg:text-xl ">10k + Users</h3>
                      <h5 className="mt-1 lg:text-base text-xs">And Growing</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-7/12">
              <div className="bg-white lg:rounded-2xl rounded-lg py-10 px-8">
                <div className="">
                  <h2 className="font-bold text-2xl">Get In Touch</h2>
                  <h4 className="text-[#787878] mt-2">
                    Your Journey With IFETO Starts With a Conversation
                  </h4>
                </div>

                <ContactForm />
              </div>
            </div>
          </div>

          <div className="bg-[#FAFAFA] rounded-2xl p-6 mt-9">
            <div className="">
              <h2 className="font-medium lg:text-xl">Socials</h2>
              <div className="flex items-center gap-[30px] mt-4">
                <a href="#">
                  <Image src={facebook} alt="facebook icon" />
                </a>
                <a href="#">
                  <Image src={twitterx} alt="facebook icon" />
                </a>
                <a href="#">
                  <Image src={instagram} alt="facebook icon" />
                </a>
                <a href="#">
                  <Image src={linkedin} alt="facebook icon" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
