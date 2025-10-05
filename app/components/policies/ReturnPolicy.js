import React from "react";

const ReturnPolicy = () => {
  return (
    <div className="w-full px-4 pt-20 py-8 sm:px-6 lg:px-8">
      <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-[#ff3971e5] p-6 text-white">
          <h1 className="text-3xl font-bold flex items-center">
            <span className="mr-2">📄</span> Return Policy
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
              things adorable and essential! By using our website, We respect
              your privacy and handle personal data carefully, in line with
              Indian laws IT Act 2000 and the new Digital Personal Data
              Protection Act, 2023.
            </p>
          </div>

          {/* Section 1 */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              1. No Change-of-Mind Returns
            </h2>
            <p className="text-gray-600">
              {`Currently, Woof Woof does not offer returns, exchanges, or refunds for change of mind. Please review product details carefully before purchasing, as all sales are final.`}
            </p>
          </div>

          {/* Section 2 */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {`2. Exception Defective or Misdescribed Goods`}
            </h2>
            <p className="text-gray-600">
              {`In accordance with Indian consumer law, we will address any genuine defect or misrepresentation. If a toy you received is defective or materially not as described, please contact us immediately. We will evaluate the issue and, at our discretion, offer a replacement or refund in line with the lawindialaw.in. Your satisfaction and pet's safety are important to us.`}
            </p>
          </div>

          {/* Section 3 */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              3. Procedure
            </h2>
            <p className="text-gray-600">
              {`To report a defect, email photos and details to our support team within 3 days of delivery. We aim to resolve these issues quickly and fairly.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;