"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Chip,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const OrderDetailsModal = ({ open, onClose, order }) => {
  const pdfRef = useRef();
  const [html2pdf, setHtml2pdf] = useState(null);

  // ✅ Correct way to load html2pdf
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("html2pdf.js").then((module) => {
        // html2pdf.js default export is the function we need
        setHtml2pdf(() => module.default);
      });
    }
  }, []);

  const handleDownloadPDF = () => {
    if (!html2pdf || !pdfRef.current) {
      console.warn("PDF module not ready yet or missing element");
      return;
    }

    const opt = {
      margin: 0.5,
      filename: `Order_${order?.orderNumber || "details"}.pdf`,
      image: { type: "jpeg", quality: 0.95 },
      html2canvas: {
        scale: 2,
        logging: false,
        backgroundColor: '#ffffff',
        useCORS: true,
        onclone: (clonedDoc) => {
          // Remove all SVG elements that might have oklch colors
          const svgs = clonedDoc.querySelectorAll('svg');
          svgs.forEach(svg => {
            // Replace CheckCircle icon with ✓
            if (svg.closest('.text-green-600')) {
              const span = clonedDoc.createElement('span');
              span.textContent = '✓';
              span.style.color = '#16a34a';
              span.style.fontWeight = 'bold';
              span.style.fontSize = '16px';
              svg.replaceWith(span);
            }
            // Replace Cancel icon with ✗
            else if (svg.closest('.text-red-600')) {
              const span = clonedDoc.createElement('span');
              span.textContent = '✗';
              span.style.color = '#dc2626';
              span.style.fontWeight = 'bold';
              span.style.fontSize = '16px';
              svg.replaceWith(span);
            }
            // Remove other SVGs
            else {
              svg.remove();
            }
          });

          // Force chip labels to have proper colors
          const chipLabels = clonedDoc.querySelectorAll('.MuiChip-label');
          chipLabels.forEach(label => {
            const chip = label.closest('.MuiChip-root');
            if (chip) {
              if (chip.classList.contains('MuiChip-colorSuccess')) {
                label.style.color = '#16a34a';
              } else if (chip.classList.contains('MuiChip-colorWarning')) {
                label.style.color = '#d97706';
              } else if (chip.classList.contains('MuiChip-colorError')) {
                label.style.color = '#dc2626';
              } else if (chip.classList.contains('MuiChip-colorPrimary')) {
                label.style.color = '#2563eb';
              }
            }
          });

          // Add CSS overrides
          const style = clonedDoc.createElement('style');
          style.textContent = `
          .text-green-600 { color: #16a34a !important; }
          .text-red-600 { color: #dc2626 !important; }
          .text-gray-600 { color: #4b5563 !important; }
          .text-gray-700 { color: #374151 !important; }
          .text-gray-800 { color: #1f2937 !important; }
          .bg-gray-50 { background-color: #f9fafb !important; }
          .bg-green-100 { background-color: #dcfce7 !important; }
          
          .MuiChip-root {
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            padding: 4px 12px !important;
            border-radius: 16px !important;
            font-size: 0.875rem !important;
            font-weight: 500 !important;
            min-height: 24px !important;
          }
          
          .MuiChip-colorSuccess {
            background-color: #dcfce7 !important;
          }
          .MuiChip-colorSuccess .MuiChip-label {
            color: #16a34a !important;
          }
          
          .MuiChip-colorWarning {
            background-color: #fef3c7 !important;
          }
          .MuiChip-colorWarning .MuiChip-label {
            color: #d97706 !important;
          }
          
          .MuiChip-colorError {
            background-color: #fee2e2 !important;
          }
          .MuiChip-colorError .MuiChip-label {
            color: #dc2626 !important;
          }
          
          .MuiChip-colorPrimary {
            background-color: #dbeafe !important;
          }
          .MuiChip-colorPrimary .MuiChip-label {
            color: #2563eb !important;
          }
          
          .MuiChip-label {
            padding: 0 !important;
            display: inline-block !important;
            line-height: normal !important;
          }
        `;
          clonedDoc.head.appendChild(style);
        }
      },
      jsPDF: {
        unit: "in",
        format: "a4",
        orientation: "portrait"
      },
    };

    html2pdf().set(opt).from(pdfRef.current).save();
  };

  if (!order) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle className="bg-gray-50">
        <div className="flex justify-between items-center">
          <span>Order Details - #{order?.orderNumber}</span>
          <Chip
            label={order?.status}
            color={
              order?.status === "Delivered"
                ? "success"
                : order?.status === "Pending"
                  ? "warning"
                  : order?.status === "Cancelled"
                    ? "error"
                    : "primary"
            }
            size="medium"
          />
        </div>
      </DialogTitle>
      <DialogContent dividers>
        <div ref={pdfRef}>
          <div className="space-y-6">
            {/* Customer Information */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Customer Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium">
                    {order?.user?.username || order?.customerInfo?.name || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">
                    {order?.user?.email || order?.customerInfo?.email || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium">
                    {order?.user?.phone || order?.customerInfo?.phone || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <Divider />

            {/* Verification & Payment Status */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Verification & Payment
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600 mb-2">User Verified</p>
                  <div className="flex items-center gap-2">
                    {order?.isVerifiedUser ? (
                      <>
                        <CheckCircleIcon className="text-green-600" fontSize="small" />
                        <span className="font-medium text-green-600">Verified</span>
                      </>
                    ) : (
                      <>
                        <CancelIcon className="text-red-600" fontSize="small" />
                        <span className="font-medium text-red-600">Not Verified</span>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Payment Verified</p>
                  <div className="flex items-center gap-2">
                    {order?.isPaymentVerified ? (
                      <>
                        <CheckCircleIcon className="text-green-600" fontSize="small" />
                        <span className="font-medium text-green-600">Verified</span>
                      </>
                    ) : (
                      <>
                        <CancelIcon className="text-red-600" fontSize="small" />
                        <span className="font-medium text-red-600">Not Verified</span>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment Method</p>
                  <p className="font-medium">{order?.paymentMethod || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment ID</p>
                  <p className="font-medium text-xs break-all">
                    {order?.paymentId || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <Divider />

            {/* Shipping Address */}
            {order?.shippingAddress && (
              <>
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    Shipping Address
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold text-gray-800">
                      {order.shippingAddress.name || "N/A"}
                    </p>
                    <p className="text-sm text-gray-700 mt-2">
                      {order.shippingAddress.addressLine1 || "N/A"}
                    </p>
                    {order.shippingAddress.addressLine2 && (
                      <p className="text-sm text-gray-700">
                        {order.shippingAddress.addressLine2}
                      </p>
                    )}
                    <p className="text-sm text-gray-700">
                      {order.shippingAddress.city || "N/A"},{" "}
                      {order.shippingAddress.state || "N/A"} -{" "}
                      {order.shippingAddress.postalCode || "N/A"}
                    </p>
                    <p className="text-sm text-gray-700">
                      {order.shippingAddress.country || "India"}
                    </p>
                    <p className="text-sm text-gray-700 mt-2">
                      <span className="font-medium">Phone:</span>{" "}
                      {order.shippingAddress.phone || "N/A"}
                    </p>
                  </div>
                </div>
                <Divider />
              </>
            )}

            {/* Order Items */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Order Items</h3>
              <div className="space-y-3">
                {order?.items?.length === 0 && (
                  <p className="text-gray-500">No items found.</p>
                )}
                {order?.items?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg"
                  >
                    <img
                      src={
                        item.image ||
                        item.productId?.images?.[0]?.url ||
                        "/placeholder.png"
                      }
                      alt={item.name || item.productId?.name}
                      className="w-20 h-20 object-cover rounded-lg border"
                      crossOrigin="anonymous"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">
                        {item.name || item.productId?.name || "N/A"}
                      </p>
                      <div className="flex gap-4 mt-1 text-sm text-gray-600">
                        {item.size && <span>Size: {item.size}</span>}
                        {item.color?.name && <span>Color: {item.color.name}</span>}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm font-medium text-gray-800 mt-1">
                        Unit Price: ₹{item.price?.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="text-lg font-semibold text-gray-800">
                        ₹{((item.price || 0) * (item.quantity || 0)).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Divider />

            {/* Order Summary */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Order Summary
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal:</span>
                  <span className="font-medium">
                    ₹{order?.subtotal?.toFixed(2) || "0.00"}
                  </span>
                </div>
                {order?.shipping > 0 && (
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping:</span>
                    <span className="font-medium">
                      ₹{order?.shipping?.toFixed(2)}
                    </span>
                  </div>
                )}
                {order?.tax > 0 && (
                  <div className="flex justify-between text-gray-700">
                    <span>Tax:</span>
                    <span className="font-medium">₹{order?.tax?.toFixed(2)}</span>
                  </div>
                )}
                {order?.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount:</span>
                    <span className="font-medium">
                      -₹{order?.discount?.toFixed(2)}
                    </span>
                  </div>
                )}
                {order?.couponCode && (
                  <div className="flex justify-between text-gray-700">
                    <span>Coupon Code:</span>
                    <span className="font-medium bg-green-100 px-2 py-1 rounded">
                      {order?.couponCode}
                    </span>
                  </div>
                )}
                <Divider className="my-2" />
                <div className="flex justify-between text-lg font-bold text-gray-800">
                  <span>Total Amount:</span>
                  <span>₹{order?.amount?.toFixed(2) || "0.00"}</span>
                </div>
              </div>
            </div>

            {/* Order Metadata */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Order Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg text-sm">
                <div>
                  <p className="text-gray-600">Order Number</p>
                  <p className="font-medium">{order?.orderNumber || "N/A"}</p>
                </div>
                <div>
                  <p className="text-gray-600">Order Date</p>
                  <p className="font-medium">
                    {order?.createdAt
                      ? new Date(order.createdAt).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Last Updated</p>
                  <p className="font-medium">
                    {order?.updatedAt
                      ? new Date(order.updatedAt).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
                <div>
  <p className="text-gray-600">Order Status</p>
  <span
    style={{
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: '16px',
      fontWeight: 500,
      fontSize: '0.875rem',
      backgroundColor:
        order?.status === "Delivered"
          ? "#dcfce7"
          : order?.status === "Pending"
            ? "#fef3c7"
            : order?.status === "Cancelled"
              ? "#fee2e2"
              : "#dbeafe",
      color:
        order?.status === "Delivered"
          ? "#16a34a"
          : order?.status === "Pending"
            ? "#d97706"
            : order?.status === "Cancelled"
              ? "#dc2626"
              : "#2563eb",
    }}
  >
    {order?.status || "N/A"}
  </span>
</div>

              </div>
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions className="bg-gray-50">
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
        <Button
          onClick={handleDownloadPDF}
          variant="contained"
          color="secondary"
          disabled={!html2pdf}  // ✅ Fixed: changed from html2pdfModule to html2pdf
        >
          Download PDF
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetailsModal;