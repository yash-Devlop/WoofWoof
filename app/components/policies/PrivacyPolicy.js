import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="w-full px-4 py-8 pt-20 sm:px-6 lg:px-8">
      <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-[#ff3971e5] p-6 text-white">
          <h1 className="text-3xl font-bold flex items-center">
            <span className="mr-2">📄</span> Privacy & Policy
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
              1. Data Collected
            </h2>
            <p className="text-gray-600">
              {`We collect only what's necessary: name, shipping address, email, and phone for processing orders and account functions. Optionally, you may provide pet details (species, size) to help us recommend products, but this is optional.`}
            </p>
          </div>

          {/* Section 2 */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              2. Purpose of Use
            </h2>
            <p className="text-gray-600">
              {`Your data is used to process orders, provide customer support, and (if you opt in) send promotional offers. We will never sell your personal information to third parties. Sharing with third parties (e.g. courier companies) happens only to fulfill your order.`}
            </p>
          </div>

          {/* Section 3 */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              3. Consent
            </h2>
            <p className="text-gray-600">
              {`We will obtain your consent before collecting data (e.g. via checkboxes during signup) and explain why we need it. You can withdraw consent or unsubscribe from marketing emails at any time.`}
            </p>
          </div>

          {/* Section 4 */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              4. Data Security
            </h2>
            <p className="text-gray-600">
              {`We implement "reasonable safeguards" to protect data (secure servers, SSL encryption). We limit how long we keep data: for example, shipping info is deleted after statutory financial record retention periods.`}
            </p>
          </div>

          {/* Section 5 */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              5. Your Rights
            </h2>
            <p className="text-gray-600">
              {`You have the right to access, correct, or request deletion of your personal data. For example, to update your address or opt out of marketing, simply use your account settings or email us. We will respond promptly.`}
            </p>
          </div>

          {/* Section 6 */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              6. Cookies and Tracking
            </h2>
            <p className="text-gray-600">
              {`Our site uses cookies to keep you logged in and remember your shopping cart. We also use analytics cookies to improve the site. These are general (they do not identify you personally). You can disable cookies in your browser, but some site features may not work if you do.`}
            </p>
          </div>

          {/* Section 7 */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {`3. Children's Privacy`}
            </h2>
            <p className="text-gray-600">
              {`Our site is not for children under 13 (or under 18 in India). We do not knowingly collect data from minors.`}
            </p>
          </div>

          {/* Section 8 */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              3. Compliance Note
            </h2>
            <p className="text-gray-600">
              {`We are preparing for India's new Digital Personal Data Protection regime. The principles of lawful, fair, and transparent data use guide us dlapiperdataprotection.com. We commit to purpose limitation (using data only for stated reasons) and data minimization (collecting only what we need) dlapiperdataprotection.com.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;