import { Alert, AlertColor, Snackbar } from "@mui/material";
import React from "react";

interface SuccessProps {
  className?: string;
  open: boolean;
  onClose: (e: any) => void;
  message: string;
  severity: AlertColor;
}

const Notification: React.FC<SuccessProps> = ({
  open,
  onClose,
  message,
  severity,
}) => {
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={onClose}
        autoHideDuration={3000}
      >
        <Alert onClose={onClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Notification;
