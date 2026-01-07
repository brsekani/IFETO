"use client";
import { Bell, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const notification = () => {
  const router = useRouter();
  const [togglePushNotification, setTogglePushNotification] = useState(true);
  const [toggleSMSNotification, setToggleSMSNotification] = useState(true);
  const [toggleEmailNotification, setToggleEmailNotification] = useState(true);

  return (
    <div className="w-full h-full lg:shadow-custom2 bg-white lg:rounded-2xl p-6">
      <div className="lg:block flex items-center gap-2 w-full justify-between">
        <button
          className="lg:hidden flex items-center gap-2 outline-none text-light cursor-pointer"
          onClick={() => router.back()}
        >
          <ChevronLeft className="w-4" />
          <span className="font-medium">back</span>
        </button>

        <div className="flex items-center gap-2 lg:mt-6">
          <Bell className="w-6 text-light hidden lg:block" />
          <span className="lg:text-2xl text-xl font-semibold ">
            Notification
          </span>
        </div>
        <div className="lg:hidden"></div>
      </div>

      <div className="lg:mt-6 mt-4 w-full">
        <div className="flex justify-between items-center py-2">
          <h3 className="text-light">Push Notification</h3>
          <button
            onClick={() => setTogglePushNotification((prev) => !prev)}
            className={`w-[39px] h-[24px] rounded-[28px] relative cursor-pointer transition-all duration-300 ${
              togglePushNotification ? "bg-primary" : "bg-light"
            } `}
          >
            <span
              className={` w-5 h-5 rounded-full bg-white absolute duration-700 top-1/2 -translate-y-1/2 ${
                togglePushNotification ? "right-[2.2px]" : "left-[2.2px]"
              } `}
            ></span>
          </button>
        </div>
        <div className="flex justify-between items-center py-2 mt-4">
          <h3 className="text-light">SMS Notification</h3>
          <button
            onClick={() => setToggleSMSNotification((prev) => !prev)}
            className={`w-[39px] h-[24px] rounded-[28px] relative cursor-pointer transition-all duration-300 ${
              toggleSMSNotification ? "bg-primary" : "bg-light"
            } `}
          >
            <span
              className={` w-5 h-5 rounded-full bg-white absolute duration-700 top-1/2 -translate-y-1/2 ${
                toggleSMSNotification ? "right-[2.2px]" : "left-[2.2px]"
              } `}
            ></span>
          </button>
        </div>
        <div className="flex justify-between items-center py-2 mt-4">
          <h3 className="text-light">Email Notification</h3>
          <button
            onClick={() => setToggleEmailNotification((prev) => !prev)}
            className={`w-[39px] h-[24px] rounded-[28px] relative cursor-pointer transition-all duration-300 ${
              toggleEmailNotification ? "bg-primary" : "bg-light"
            } `}
          >
            <span
              className={` w-5 h-5 rounded-full bg-white absolute duration-700 top-1/2 -translate-y-1/2 ${
                toggleEmailNotification ? "right-[2.2px]" : "left-[2.2px]"
              } `}
            ></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default notification;
