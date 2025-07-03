import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const OrderDetailsModal = ({ open, onClose, items }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Order Product Details</DialogTitle>
      <DialogContent dividers>
        {items?.length === 0 && <p>No items found.</p>}
        {items?.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 mb-4 border-b pb-4"
          >
            <img
              src={item.productId?.images?.[0]?.url}
              alt={item.productId?.name}
              className="w-20 h-20 object-cover rounded-lg border"
            />
            <div className="flex-1">
              <p className="font-semibold">{item.productId?.name}</p>
              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              <p className="text-sm text-gray-600">
                Price: ₹{item.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetailsModal;
