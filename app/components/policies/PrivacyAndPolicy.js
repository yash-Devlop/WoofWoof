import React from "react";

const PrivacyAndPolicy = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-[#ff3971e5] p-6 text-white">
          <h1 className="text-3xl font-bold flex items-center">
            <span className="mr-2">📄</span> Privacy & Policy
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
              1. Transparent Pricing
            </h2>
            <p className="text-gray-600">
              {`All prices are in Indian Rupees (INR) and include applicable taxes
              (such as GST and Shipping charges). We clearly display the total
              price and provide a breakdown of any extra charges (e.g. shipping)
              during checkout indialaw.in. There are no hidden fees.`}
            </p>
          </div>

          {/* Section 2 */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              2. Fairness and Anti-Profit Manipulation
            </h2>
            <p className="text-gray-600">
              {`We are committed to honest pricing. As per e-commerce regulations, prices are not manipulated to earn unfair profits indialaw.in. Any promotional offers or discounts will be clearly stated (e.g. “Sale Price”).`}
            </p>
          </div>

          {/* Section 3 */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              3. Pricing Errors
            </h2>
            <p className="text-gray-600">
              {`In rare cases, if a product is listed at an incorrect price due to technical error, we reserve the right to cancel the order and notify you. We will never charge a price higher than displayed without notice.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyAndPolicy;
