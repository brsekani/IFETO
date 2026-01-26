"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  return (
    <div className="w-full lg:py-7 lg:px-20 md:px-14 px-6 pb-10 bg-[#FAFAFA]">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-6 lg:hidden mt-4 lg:mt-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[#5A5A5A] hover:text-primary transition-colors font-semibold w-fit"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>back</span>
          </button>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-custom2">
          <div className="">
            <h1 className="text-2xl font-semibold mb-2">
              IFETO Customer Satisfaction Policy (Returns & Refunds)
            </h1>
          </div>

          <div className="mt-4 lg:mt-6 text-light">
            <p className="">
              The IFETO mission is rooted in the philosophy of Ifetito ("Love is
              sufficient"), meaning we are committed to delivering products of
              the highest quality and integrity. Due to the specialized,
              perishable, and ethically sourced nature of our goods, our policy
              is designed to uphold product freshness and minimize the complex
              logistical challenges of international returns.
            </p>
          </div>

          <div className="mt-4 lg:mt-6 text-light">
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-4">
                1. Final Sale Policy
              </h2>
              <p className="mb-4">
                All sales made through IFETO are considered final.
              </p>
              <p className="mb-4">
                Due to the sensitive nature of our food, spices, and healthy
                products, and the complexity and duration of international
                shipping from our vendors to destinations in the EU and US, we
                do not accept returns, exchanges, or cancellations once an order
                has been packaged and shipped.
              </p>
              <p className="mb-4">This policy ensures the following:</p>
              <ul className="pl-6 list-disc space-y-2">
                <li>
                  <span className="font-semibold">Quality Control:</span> We
                  guarantee the freshness and integrity of all perishable food
                  and health products shipped from our vendors.
                </li>
                <li>
                  <span className="font-semibold">Logistical Integrity:</span>{" "}
                  Returns involving long-haul international transit expose
                  products to high risk of damage, temperature fluctuation, and
                  spoilage, which prevents us from reselling or donating them.
                </li>
              </ul>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-4">
                2. Exceptions (Damaged, Defective, or Incorrect Items)
              </h2>
              <p className="mb-4">
                While we uphold a final sale policy, we are fully committed to
                ensuring you receive your order in great condition. We will
                provide a full refund or a replacement if your item meets any of
                the following conditions:
              </p>
              <div className="mb-4">
                <h3 className="font-semibold mb-4">
                  A. Item Arrived Damaged or Spoiled
                </h3>
                <p className="mb-2">
                  If your product is damaged, spoiled, or appears tampered with
                  upon arrival:
                </p>
                <ul className="pl-6 space-y-2">
                  <li className="list-disc">
                    <span className="font-semibold">Action Required: </span>You
                    must contact us within 32 hours of the delivery date.
                  </li>
                  <li className="list-disc">
                    <span className="font-semibold">Proof Required: </span>You
                    must provide clear photographic evidence of the damaged
                    product and the exterior shipping package to our support
                    team at{" "}
                    <a
                      href="mailto:Admin@ifetomarket.com"
                      className="text-primary font-medium"
                    >
                      Admin@ifetomarket.com
                    </a>
                    .
                  </li>
                  <li className="list-disc">
                    <span className="font-semibold">Remedy: </span>Upon
                    verification, IFETO will process a full refund to your
                    original payment method or ship a replacement product
                    (subject to current stock availability).
                  </li>
                </ul>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold mb-4">
                  B. Shipping Error (Wrong Item Received)
                </h3>
                <p className="mb-4">
                  If you received an item that was not what you ordered:
                </p>
                <ul className="pl-6 space-y-2">
                  <li className="list-disc">
                    <span className="font-semibold">Action Required: </span> You
                    must contact us within 7 days of the delivery date.
                  </li>
                  <li className="list-disc">
                    <span className="font-semibold">Remedy: </span>We will
                    verify the shipping manifest error and either issue a full
                    refund or arrange for the correct product to be shipped at
                    no additional cost. Please note: We do not require you to
                    return the incorrect item.
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-4">
                3. Non-Refundable Situations
              </h2>
              <p className="mb-4">
                The following situations do not qualify for a refund or
                replacement:
              </p>
              <div className="mb-4">
                <ul className="pl-6 space-y-2">
                  <li className="list-disc">
                    Change of mind, taste preference, or product
                    dissatisfaction.
                  </li>
                  <li className="list-disc">
                    The product was damaged after successful delivery (e.g.,
                    dropped, left outside, or improperly stored by the
                    customer).
                  </li>
                  <li className="list-disc">
                    Any issues reported more than 32 hours after the delivery
                    confirmation date.
                  </li>
                  <li className="list-disc">
                    Losses due to incorrect shipping addresses provided by the
                    customer at checkout.
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-4">
                4. Processing Refunds
              </h2>
              <div className="mb-4">
                <ul className="pl-6 space-y-2">
                  <li className="list-disc">
                    Once a refund is approved, it will be processed within 5-10
                    business days.
                  </li>
                  <li className="list-disc">
                    Refunds will be credited back to your original payment
                    method (e.g., credit card, bank account). Processing times
                    may vary depending on your bank.
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-4">
              <p className="">
                <span className="font-semibold">Contact Us: </span>For all
                questions regarding your order or our policy, please contact us
                immediately: Email:{" "}
                <a
                  href="mailto:Admin@ifetomarket.com"
                  className="text-primary font-semibold"
                >
                  Admin@ifetomarket.com
                </a>
              </p>
            </div>

            <div className="mb-4">
              <h2 className="font-semibold mb-2">Social Media:</h2>
              <ul className="pl-6 space-y-2">
                <li className="list-disc">
                  <span className="font-medium">Instagram:</span> Ifeto_market
                  (Ifeto): (QR will be shared)
                </li>
                <li className="list-disc">
                  <span className="font-medium">Facebook & Tik tok:</span> Ifeto
                  market (Ifeto): (QR will be Shared)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
