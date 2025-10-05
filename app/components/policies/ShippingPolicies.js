import React from "react";

const ShippingPolicies = () => {
  return (
    <div className="w-full px-4 py-8 pt-20 sm:px-6 lg:px-8">
      <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-[#ff3971e5] p-6 text-white">
          <h1 className="text-3xl font-bold flex items-center">
            <span className="mr-2">📄</span> Shipping Policy
          </h1>
        </div>

        <div className="p-6 space-y-8">
          {/* Introduction */}
          <div className="prose max-w-none">
            <p>
              Welcome to <strong>Woof Woof</strong> your go-to pet store for all
              things adorable and essential! By using our website, We respect
              your privacy and handle personal data carefully, in line with
              Indian laws IT Act 2000 and the new Digital Personal Data
              Protection Act, 2023.
            </p>
          </div>

          {/* Section 1 */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              1. Domestic Shipping Only
            </h2>
            <p className="text-gray-600">
              {`We currently ship ${(
                <strong>only within India</strong>
              )}. International orders are not accepted.`}
            </p>
          </div>

          {/* Section 2 */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              2. Shipping Methods
            </h2>
            <p className="text-gray-600">
              {`Orders are dispatched via trusted domestic courier partners (e.g. India Post, private couriers). We hand packages to carriers promptly after order confirmation. Delivery usually takes 3–7 business days, depending on location.`}
            </p>
          </div>

          {/* Section 3 */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              3. Charges and Free Shipping
            </h2>
            <p className="text-gray-600">
              {`Shipping charges (if any) are calculated at checkout. From time to time we may offer ${(
                <strong>free shipping</strong>
              )} promotions; details will be clearly stated.`}
            </p>
          </div>

          {/* Section 4 */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              4. Order Handling
            </h2>
            <p className="text-gray-600">
              {`We process prepaid orders within 1–2 days of payment. You'll receive an email/SMS with tracking details once your order ships.`}
            </p>
          </div>

          {/* Section 5 */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              5. Delivery Issues
            </h2>
            <p className="text-gray-600">
              {`Once we hand your package to the courier, delivery times are subject to the carrier's schedule. Woof Woof is not responsible for courier delays or incidents (like weather or transport strikes) or any unforenseen Incidents . However, we will assist you in tracking the shipment. If a delivery fails (wrong address, etc.), please contact us immediately so we can help resolve it.`}
            </p>
          </div>

          {/* Section 6 */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              6. Shipping Exceptions
            </h2>
            <p className="text-gray-600">
              {`We may not ship to certain remote pin codes or P.O. boxes. If your address is outside normal delivery zones, we will inform you and may request an alternate address or refund.`}
            </p>
          </div>

          {/* Section 7 */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {`3. Order Not Received`}
            </h2>
            <p className="text-gray-600">
              {`If your tracking shows delivery but you didn't receive the package (and our address was correct), we'll work with the courier to investigate. For fairness, please give us 2 business days after the "delivered" date to resolve.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicies;