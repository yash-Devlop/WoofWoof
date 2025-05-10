"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import React from 'react'

const UserViewModal = ({ open, user, onClose }) => {
    if (!user) return null;
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
          <DialogTitle>User Details</DialogTitle>
          <DialogContent dividers>
            <Typography><strong>Username:</strong> {user.username}</Typography>
            <Typography><strong>Email:</strong> {user.email}</Typography>
            <Typography><strong>Phone:</strong> {user.phone}</Typography>
            {/* Add more details if available */}
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary" variant="outlined">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      );
}

export default UserViewModal





