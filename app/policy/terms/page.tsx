"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const terms = () => {
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
              IFETO Terms and Conditions of Service
            </h1>
            <p className="text-light ">Last Updated: 26th January 2026</p>
          </div>
          <div className="mt-4 lg:mt-6 text-light">
            <p className="">
              Welcome to IFETO! These Terms and Conditions ("Terms") govern your
              use of the IFETO e-commerce platform and its services, operated by
              [IFETO Legal Company Name] ("IFETO," "we," "us," or "our").
            </p>
            <p className="mt-2">
              By accessing or using the IFETO website, you agree to be bound by
              these Terms. If you do not agree with any part of these Terms, you
              may not use our services.
            </p>
          </div>
          <div className="mt-4 lg:mt-6 text-light">
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-4">
                1. IFETO Account Registration and Usage
              </h2>
              <div className="mb-4">
                <h3 className="font-semibold mb-4">
                  1.1 Mandatory Account Creation
                </h3>
                <p className="mb-4">
                  To access full functionality of the IFETO platform, including
                  viewing detailed product pricing, adding items to your cart,
                  and completing a purchase, mandatory account creation is
                  required. You agree to provide accurate, current, and complete
                  information during the registration process.
                </p>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold mb-4">1.2 Account Security</h3>
                <p className="mb-4">
                  You are responsible for maintaining the confidentiality of
                  your account login information and for all activities that
                  occur under your account. You agree to notify IFETO
                  immediately of any unauthorized use of your account.
                </p>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold mb-4">1.3 Eligibility</h3>
                <p className="mb-4">
                  You must be at least 18 years old to create an account and
                  make purchases on IFETO.
                </p>
              </div>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-4">
                2. Product Information and Orders
              </h2>
              <div className="mb-4">
                <h3 className="font-semibold mb-4">2.1 Product Descriptions</h3>
                <p className="mb-4">
                  We strive to be as accurate as possible in the descriptions,
                  images, and pricing of our ethically sourced products
                  (including food and healthy products). However, we do not
                  guarantee that product descriptions or other content on IFETO
                  are fully accurate, complete, reliable, current, or
                  error-free. Due to the artisanal and natural nature of many
                  items, slight variations in color, size, and packaging may
                  occur.
                </p>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold mb-4">2.2 Pricing and Payment</h3>
                <p className="mb-4">
                  All prices are listed in [Primary Currency, e.g., USD or EUR]
                  and are subject to change without notice. You are responsible
                  for any applicable customs duties, tariffs, or taxes applied
                  by your country of residence for international shipment.
                  Payment must be received in full before an order is processed
                  and shipped.
                </p>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold mb-4">2.3 Order Acceptance</h3>
                <p className="mb-4">
                  The confirmation email you receive after placing an order is
                  solely an acknowledgement that we have received your order,
                  and does not constitute acceptance. IFETO reserves the right
                  to refuse or cancel any order for reasons including, but not
                  limited to, product availability, errors in pricing or product
                  description, or security concerns.
                </p>
              </div>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-4">
                3. Shipping, Delivery, and Risk of Loss
              </h2>
              <div className="mb-4">
                <h3 className="font-semibold mb-4">
                  3.1 International Shipping
                </h3>
                <p className="mb-4">
                  IFETO utilizes third-party international carriers (e.g., DHL,
                  UPS) for cross-continental delivery to the EU, US, and Canada.
                  We are not responsible for delays caused by customs
                  processing, severe weather, or carrier issues.
                </p>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold mb-4">3.2 Risk of Loss</h3>
                <p className="mb-4">
                  The risk of loss and title for all products purchased from
                  IFETO pass to you upon our delivery to the international
                  shipping carrier.
                </p>
              </div>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-4">
                4. Returns, Refunds, and Cancellations
              </h2>
              <div className="mb-4">
                <h3 className="font-semibold mb-4">4.1 Final Sale Policy</h3>
                <p className="mb-4">
                  Due to the perishable nature and high logistical costs of
                  cross-continental shipping, all sales are final. IFETO does
                  not accept returns or exchanges.
                </p>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold mb-4">4.2 Damages and Errors</h3>
                <p className="mb-4">
                  We are committed to delivering products in great condition. If
                  your order arrives damaged, spoiled, or incorrect, you must
                  adhere to the terms outlined in our IFETO Customer
                  Satisfaction Policy (which is incorporated by reference into
                  these Terms). This policy requires you to contact us with
                  photographic evidence within 32 hours of delivery for damaged
                  items, or 7 days for shipping errors.
                </p>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold mb-4">4.3 Order Cancellation</h3>
                <p className="mb-4">
                  Orders cannot be cancelled once they have been packaged and
                  released to the shipping vendor for transport.
                </p>
              </div>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-4">
                5. Intellectual Property Rights (IP)
              </h2>
              <div className="mb-4">
                <h3 className="font-semibold mb-4">5.1 IFETO Content</h3>
                <p className="mb-4">
                  All content on the IFETO website, including text, graphics,
                  logos, images, product names, and the IFETO platform design,
                  is the exclusive property of IFETO or its content suppliers
                  and is protected by international copyright and intellectual
                  property laws.
                </p>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold mb-4">5.2 Limited License</h3>
                <p className="mb-4">
                  You are granted a limited, non-exclusive, non-transferable
                  license to access and use the IFETO platform for personal,
                  non-commercial shopping purposes only. Any unauthorized use,
                  reproduction, or distribution of IFETO content is strictly
                  prohibited.
                </p>
              </div>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-4">
                6. Vendor Content and Liability
              </h2>
              <div className="mb-4">
                <p className="mb-4">
                  IFETO acts as a digital marketplace connecting vendors with
                  customers. While we ethically vet our vendors, IFETO is not
                  responsible for:
                </p>
                <ul className="pl-6 list-disc space-y-1">
                  <li>
                    The manufacturing process or the final quality of products
                    prior to shipment.
                  </li>
                  <li>
                    Any third-party intellectual property infringement claims
                    arising from content provided by our vendors.
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-4">
                7. Limitation of Liability
              </h2>
              <div className="mb-4">
                <p className="mb-4">
                  To the fullest extent permitted by law, IFETO shall not be
                  liable for any indirect, incidental, special, or consequential
                  damages (including lost profits) arising from or related to
                  your use of the IFETO platform or the purchase of any
                  products. This limitation applies even if IFETO has been
                  advised of the possibility of such damages.
                </p>
              </div>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-4">
                8. Governing Law and Dispute Resolution
              </h2>
              <div className="mb-4">
                <h3 className="font-semibold mb-4">8.1 Governing Law</h3>
                <p className="mb-4">
                  These Terms shall be governed by and construed in accordance
                  with the laws of The State of California, USA, without regard
                  to its conflict of law principles.
                </p>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold mb-4">
                  8.2 Dispute Resolution (Binding Arbitration)
                </h3>
                <p className="mb-4">
                  Any dispute, controversy, or claim arising out of or relating
                  to these Terms or your use of the IFETO platform (except for
                  claims seeking injunctive relief) shall be settled by binding
                  arbitration administered by [Specify Arbitration Service,
                  e.g., the American Arbitration Association (AAA)] in
                  accordance with its commercial arbitration rules. The
                  arbitration shall take place in San Francisco, California,
                  USA.
                </p>
              </div>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-4">
                9. Changes to Terms and Conditions
              </h2>
              <div className="mb-4">
                <p className="mb-4">
                  We reserve the right to update or modify these Terms at any
                  time without prior notice. The "Last Updated" date at the top
                  of this page indicates when the Terms were last revised. Your
                  continued use of the IFETO platform following any such changes
                  constitutes your acceptance of the new Terms.
                </p>
              </div>
            </div>

            <div className="">
              <p className="mb-4">Contact Information:</p>
              <p className="mb-4">
                For any questions regarding these Terms and Conditions, please
                contact us at: Email:{" "}
                <a
                  href="mailto:Admin@ifetomarket.com"
                  className="text-primary font-medium"
                >
                  Admin@ifetomarket.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default terms;
