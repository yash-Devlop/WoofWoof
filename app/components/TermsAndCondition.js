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
              Welcome to <strong>Wed My Pet</strong> your go-to pet store for
              all things adorable and essential! By using our website, you agree
              to be bound by the following Terms and Conditions. Please read
              them carefully.
            </p>
          </div>

          {/* Section 1 */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-600">
              By accessing or using our website, you confirm that you accept
              these Terms & Conditions and agree to comply with them. If you do
              not agree, please refrain from using the site.
            </p>
          </div>

          {/* Section 2 */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              2. Product Availability
            </h2>
            <p className="text-gray-600">
              All products displayed on the website are subject to availability.
              In rare cases where a product becomes unavailable after order
              placement, we will notify you immediately and initiate a refund or
              offer an alternative.
            </p>
          </div>

          {/* Section 3 */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              3. Pricing & Promotional Offers
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                All prices are listed in <strong>INR (₹)</strong> and are
                inclusive of applicable taxes unless stated otherwise.
              </li>
              <li>
                Offers, discounts, and promotional codes are valid for a limited
                time and may change without prior notice.
              </li>
              <li>
                {`"✨ 10% OFF on orders above ₹1,000"`} is applicable before taxes
                and shipping.
              </li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              4. Returns & Refunds
            </h2>
            <p className="text-gray-600 mb-4">
              We accept returns within <strong>7 days</strong> of delivery under
              the following conditions:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                Products must be <strong>unused</strong>, in their original
                packaging.
              </li>
              <li>
                <strong>Hygiene-sensitive items</strong> (such as pet clothes,
                grooming items) may not be eligible for return.
              </li>
              <li>
                Refunds will be initiated after inspection and processed to the
                original payment method within {`5–7`} business days.
              </li>
            </ul>
            <p className="text-gray-600 mt-4">
              For detailed return procedures, please refer to our{" "}
              <a href="#" className="text-indigo-600 hover:underline">
                Return Policy
              </a>
              .
            </p>
          </div>

          {/* Section 5 */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              5. Shipping Policy
            </h2>

            <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2">
              Shipping Time:
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                Orders processed within <strong>{`1–2`} business days</strong>.
              </li>
              <li>
                Delivery typically takes <strong>{`3–7`} business days</strong>,
                depending on your location.
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2">
              Shipping Charges:
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                <strong>Free shipping</strong> on orders above ₹1,000.
              </li>
              <li>
                A flat <strong>₹49</strong> fee applies for orders below ₹1,000.
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2">
              Delivery Partners:
            </h3>
            <p className="text-gray-600">
              We collaborate with trusted courier services to ensure safe and
              prompt delivery.
            </p>

            <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2">
              Tracking & Delays:
            </h3>
            <p className="text-gray-600">
              {`Once shipped, you'll receive an SMS/email with a tracking number.
              In case of unforeseen delays (e.g., weather, strikes), we will
              inform you proactively.`}
            </p>
          </div>

          {/* Section 6 */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              6. Intellectual Property
            </h2>
            <p className="text-gray-600">
              All content—including images, designs, logos, and written
              material—on this website is the{" "}
              <strong>exclusive property</strong> of [Your Brand Name]. No
              content may be copied, reused, or redistributed without prior
              written permission.
            </p>
          </div>

          {/* Section 7 */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              7. Liability Disclaimer
            </h2>
            <p className="text-gray-600 mb-2">We shall not be liable for:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Any misuse of our products</li>
              <li>
                Any damages—direct or indirect—arising from use of our website
              </li>
              <li>Errors in product descriptions or typographical errors</li>
            </ul>
          </div>

          {/* Section 8 */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              8. Privacy Policy
            </h2>
            <p className="text-gray-600">
              We value your privacy. Information collected (like your name,
              address, email, phone number, and payment details) is used to
              process orders, send updates, and personalize your experience.
            </p>

            <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2">
              Your Data is Safe With Us:
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>We do not sell or rent your personal data.</li>
              <li>
                Third-party sharing occurs only with partners involved in
                shipping or payment processing.
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2">
              Opt-Out Policy:
            </h3>
            <p className="text-gray-600">
              You may unsubscribe from promotional emails at any time via the
              link in the footer of those emails.
            </p>
            <p className="text-gray-600 mt-4">
              For full details, refer to our{" "}
              <a href="#" className="text-indigo-600 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>

          {/* Section 9 */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              9. Contact Us
            </h2>
            <p className="text-gray-600 mb-4">
              For any queries, support, or complaints, reach out to us at:
            </p>
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
              <a
                href="mailto:support@[yourbrand].com"
                className="flex items-center text-indigo-600 hover:underline"
              >
                📧 <span className="ml-2">Contact@wedmypet.in</span>
              </a>
              <a
                href="https://wa.me/[yourwhatsapplink]"
                className="flex items-center text-indigo-600 hover:underline"
              >
                📱 <span className="ml-2">WhatsApp: Chat with us</span>
              </a>
            </div>
          </div>

          {/* Section 10 */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              10. Changes to Terms
            </h2>
            <p className="text-gray-600">
              We reserve the right to update these Terms & Conditions at any
              time. Updates will be posted on this page, and continued use of
              the site will be deemed acceptance of the revised terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
