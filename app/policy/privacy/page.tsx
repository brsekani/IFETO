"use client";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

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
              IFETO International Privacy Policy
            </h1>
            <p className="text-light ">Last Updated: 26th January 2026</p>
          </div>

          <div className="mt-4 lg:mt-6 text-light">
            <p className="">
              IFETO is committed to protecting the privacy and security of your
              personal information. This Privacy Policy describes how IFETO
              ("we," "us," or "our") collects, uses, discloses, and protects the
              information of our customers and website visitors residing in the
              European Union (EU), the United States (US), and Canada,
              consistent with the General Data Protection Regulation (GDPR), the
              California Consumer Privacy Act (CCPA/CPRA), and the Personal
              Information Protection and Electronic Documents Act (PIPEDA).
            </p>
          </div>

          <div className="mt-4 lg:mt-6 text-light">
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">
                1. Contact Information
              </h2>
              <p className="mb-4">
                Data Controller: [IFETO LLC] Email:{" "}
                <a
                  href="mailto:Admin@ifetomarket.com"
                  className="text-primary font-medium"
                >
                  Admin@ifetomarket.com
                </a>
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">
                2. Personal Information We Collect
              </h2>
              <p className="mb-4">
                We collect personal information necessary to process your
                orders, provide customer support, and improve the IFETO
                platform. The categories of information collected include:
              </p>
              <div className="overflow-x-auto border rounded-lg">
                <table className="min-w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-700 font-semibold uppercase">
                    <tr>
                      <th className="px-4 py-3 border-b">Category of Data</th>
                      <th className="px-4 py-3 border-b">Purpose & Examples</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 font-medium">
                        Identity & Contact Data
                      </td>
                      <td className="px-4 py-3">
                        Name, billing/shipping address, email address, and Cell
                        Number (Mandatory) for order processing, two-factor
                        authentication, and delivery.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">Financial Data</td>
                      <td className="px-4 py-3">
                        Payment information (e.g., credit card numbers, PayPal
                        details) processed via secure third-party payment
                        processors. We do not store full payment details.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">
                        Transaction Data
                      </td>
                      <td className="px-4 py-3">
                        Details about products purchased, order history, payment
                        status, and delivery tracking information.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">
                        Technical & Usage Data
                      </td>
                      <td className="px-4 py-3">
                        IP address, browser type, device details, pages viewed,
                        time spent on pages, and referring website (collected
                        via cookies and analytics).
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">
                        Marketing & Preference Data
                      </td>
                      <td className="px-4 py-3">
                        Your preferences in receiving marketing from us and your
                        communication preferences.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">
                3. How We Use Your Personal Information (Purpose & Lawful Basis
                - GDPR)
              </h2>
              <p className="mb-4">
                We use your personal information only when we have a valid legal
                basis to do so.
              </p>
              <div className="overflow-x-auto border rounded-lg">
                <table className="min-w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-700 font-semibold uppercase">
                    <tr>
                      <th className="px-4 py-3 border-b">
                        Purpose of Processing
                      </th>
                      <th className="px-4 py-3 border-b">Legal Basis (GDPR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 font-medium">
                        Order Processing & Fulfillment (Mandatory Use of Cell
                        Number)
                      </td>
                      <td className="px-4 py-3">
                        Performance of a Contract: Necessary to process and
                        deliver your IFETO goods, including coordinating
                        international logistics (DHL, UPS).
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">
                        Mandatory Account Creation
                      </td>
                      <td className="px-4 py-3">
                        Performance of a Contract: Necessary to provide the core
                        service (full site access, personalized pricing, order
                        history).
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">
                        Security & Fraud Prevention
                      </td>
                      <td className="px-4 py-3">
                        Legitimate Interest: To protect our business, prevent
                        illegal activities, and verify identity.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">
                        Marketing Communications
                      </td>
                      <td className="px-4 py-3">
                        Consent: Where required, we will obtain explicit consent
                        to send promotional emails about IFETO products. You can
                        opt-out at any time.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">
                        Website Improvement & Analytics
                      </td>
                      <td className="px-4 py-3">
                        Legitimate Interest: To understand how our customers use
                        our services and to improve the user experience (e.g.,
                        analyzing conversion rates).
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">
                4. How We Share Your Personal Information
              </h2>
              <p className="mb-4">
                We do not sell or share your personal information to outside
                parties for monetary compensation. We only share data with
                trusted third parties necessary for running our business:
              </p>
              <ul className="pl-6 list-disc space-y-2">
                <li>
                  <span className="font-semibold">
                    Shipping & Logistics Providers (DHL, UPS):
                  </span>{" "}
                  We share Name, Address, and Mandatory Cell Number to ensure
                  successful cross-continental delivery and compliance with
                  customs requirements.
                </li>
                <li>
                  <span className="font-semibold">Payment Processors:</span>{" "}
                  Shared with secure third-party gateways (e.g., Stripe, PayPal)
                  to process payments.
                </li>
                <li>
                  <span className="font-semibold">Vendors/Suppliers:</span> We
                  share only necessary order details (not payment details) to
                  enable vendors to prepare and package your ethically sourced
                  items.
                </li>
                <li>
                  <span className="font-semibold">
                    Legal & Regulatory Authorities:
                  </span>{" "}
                  When required by law (e.g., tax, customs, or court order).
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">
                5. Your Rights as a Consumer
              </h2>
              <p className="mb-4">
                Your privacy is important to us. Depending on your jurisdiction
                (EU, US, or Canada), you may have the following rights regarding
                your data:
              </p>

              <div className="mb-4">
                <h3 className="font-semibold mb-2">
                  A. GDPR Rights (EU Residents)
                </h3>
                <ul className="pl-6 list-disc space-y-1">
                  <li>
                    <span className="font-semibold">Right of Access:</span>{" "}
                    Request copies of your personal data we hold.
                  </li>
                  <li>
                    <span className="font-semibold">
                      Right to Rectification:
                    </span>{" "}
                    Request correction of any incomplete or inaccurate data.
                  </li>
                  <li>
                    <span className="font-semibold">
                      Right to Erasure ('Right to be Forgotten'):
                    </span>{" "}
                    Request that we delete your personal data, subject to legal
                    retention obligations (e.g., transaction records).
                  </li>
                  <li>
                    <span className="font-semibold">
                      Right to Restriction of Processing:
                    </span>{" "}
                    Request that we limit the way we use your data.
                  </li>
                  <li>
                    <span className="font-semibold">
                      Right to Data Portability:
                    </span>{" "}
                    Request that we transfer your data to another organization.
                  </li>
                  <li>
                    <span className="font-semibold">Right to Object:</span>{" "}
                    Object to the processing of your data based on legitimate
                    interest.
                  </li>
                </ul>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold mb-2">
                  B. CCPA/CPRA Rights (California Residents)
                </h3>
                <ul className="pl-6 list-disc space-y-1">
                  <li>
                    <span className="font-semibold">Right to Know:</span>{" "}
                    Request disclosure of the categories and specific pieces of
                    personal information collected about you.
                  </li>
                  <li>
                    <span className="font-semibold">Right to Delete:</span>{" "}
                    Request the deletion of your personal information, subject
                    to legal exceptions.
                  </li>
                  <li>
                    <span className="font-semibold">
                      Right to Opt-Out of Sale/Sharing:
                    </span>{" "}
                    IFETO does not sell or share personal information as defined
                    under CCPA/CPRA. Should this practice change, we will
                    provide a clear mechanism to opt-out.
                  </li>
                  <li>
                    <span className="font-semibold">
                      Right to Non-Discrimination:
                    </span>{" "}
                    We will not discriminate against you for exercising any of
                    your CCPA/CPRA rights.
                  </li>
                </ul>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold mb-2">
                  C. PIPEDA Rights (Canadian Residents)
                </h3>
                <ul className="pl-6 list-disc space-y-1">
                  <li>
                    <span className="font-semibold">Right of Access:</span>{" "}
                    Request access to your personal information held by us.
                  </li>
                  <li>
                    <span className="font-semibold">Right to Challenge:</span>{" "}
                    Challenge the accuracy and completeness of your personal
                    information and request amendments.
                  </li>
                  <li>
                    <span className="font-semibold">
                      Withdrawal of Consent:
                    </span>{" "}
                    You may withdraw your consent for the collection, use, and
                    disclosure of your personal information at any time, subject
                    to legal or contractual restrictions.
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">
                6. Cookies and Tracking Technologies
              </h2>
              <p className="mb-4">
                IFETO uses cookies and similar technologies to track activity on
                our service and hold certain information. Cookies are used for:
              </p>
              <ul className="pl-6 mb-4 list-disc space-y-1">
                <li>
                  <span className="font-semibold">Functionality:</span> To
                  recognize you and remember your preferences (e.g., login
                  status, items in your shopping cart).
                </li>
                <li>
                  <span className="font-semibold">Analytics:</span> To analyze
                  website traffic and user behavior (e.g., Google Analytics).
                </li>
              </ul>
              <p className="">
                You have the option to accept or refuse cookies. Most browsers
                allow you to manage your cookie preferences. Note that disabling
                cookies may affect the functionality of the IFETO platform.
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">7. Data Security</h2>
              <p className="mb-4">
                We have implemented robust technical and organizational measures
                designed to secure your personal information from accidental
                loss and unauthorized access, use, alteration, or disclosure.
                These measures include:
              </p>
              <ul className="pl-6 mb-4 list-disc space-y-1">
                <li>Using SSL encryption for data transmission.</li>
                <li>
                  Storing data on secure servers hosted by reputable providers.
                </li>
                <li>
                  Limiting employee access to personal data based on job
                  necessity.
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">
                8. Changes to This Privacy Policy
              </h2>
              <p className="mb-4">
                We may update this Privacy Policy from time to time to reflect
                changes to our practices or for other operational, legal, or
                regulatory reasons. We will notify you of any material changes
                by posting the new Privacy Policy on this page and updating the
                "Last Updated" date.
              </p>
              <p className="mb-4">
                To exercise any of your rights listed above, please submit a
                verifiable consumer request to the Contact Information provided
                in Section 1.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
