import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-[#ff3971e5] p-6 text-white">
          <h1 className="text-3xl font-bold flex items-center">
            <span className="mr-2">📄</span> Terms & Conditions
          </h1>
          <p className="text-indigo-100  mt-2">
            <strong>Effective Date:</strong> [Insert Date] |{" "}
            <strong>Last Updated:</strong> [Insert Date]
          </p>
        </div>

        <div className="p-6 space-y-8">
          {/* Introduction */}
          <div className="prose max-w-none">
            <p>
              Welcome to <strong>Woof Woof</strong> your go-to pet store for all
              things adorable and essential! By using our website, you agree to
              be bound by the following Terms and Conditions. Please read them
              carefully.
            </p>
          </div>

          {/* Section 1 */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              1. Acceptance
            </h2>
            <p className="text-gray-600">
              By using our website or placing an order, you agree to these terms
              and any future updates. Woof Woof reserves the right to modify the
              terms at any time; we will notify users of major changes.
            </p>
          </div>

          {/* Section 2 */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              2. Scope
            </h2>
            <p className="text-gray-600">
              {`Woof Woof operates in India, selling pet toys online (prepaid
              orders only). Our website and services are intended for pet
              lovers in India only.`}
            </p>
          </div>

          {/* Section 3 */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              3. Company Information
            </h2>
            <p className="text-gray-600">
              {`We display our full legal name, address, and customer support contacts on the site as required by law indialaw.in. Our Grievance Officer’s name and contact are clearly listed, and we commit to acknowledging any complaint within 48 hours indialaw.in. This ensures transparency and compliance with the Consumer Protection (E-Commerce) Rules, 2020.`}
            </p>
          </div>

          {/* Section 4 */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              4. User Obligations
            </h2>
            <p className="text-gray-600 mb-4">
              {`Users must provide accurate information when placing orders. You
              agree not to misuse the site or post false reviews. Unauthorized
              use of content from our site is prohibited. Intellectual property
              (brand name, logos, images, text, etc.) is owned by Woof Woof or
              its licensors and is protected by trademark and copyright law
              termly.io.`}
            </p>
          </div>

          {/* Section 5 */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              5. Age Requirement
            </h2>

            <p className="text-gray-600">
              {`Once shipped, you'll receive an SMS/email with a tracking number.
              In case of unforeseen delays (e.g., weather, strikes), we will
              inform you proactively.`}
            </p>
          </div>

          {/* Section 6 */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              6. Order Acceptance
            </h2>
            <p className="text-gray-600">
              {`All orders are subject to availability and confirmation. Woof Woof
              may refuse or cancel orders at our discretion (e.g., stock issues,
              pricing errors). If we cancel an order that you have prepaid, we
              will refund you in full.`}
            </p>
          </div>

          {/* Section 7 */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              7. Changes to Service
            </h2>
            <p className="text-gray-600">
              {`We may update product offerings, prices, or service features. Any such changes will be communicated on the site or to registered users.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
