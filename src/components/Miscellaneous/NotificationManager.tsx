import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useNotificationStore } from "../../store/notificationStore";

export const NotificationManager: React.FC = () => {
  const { notifications, removeNotification } = useNotificationStore();

  const handleClose =
    (id: string) =>
    (_event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === "clickaway") return;
      removeNotification(id);
    };

  return (
    <>
      {notifications.map((notification) => (
        <Snackbar
          key={notification.id}
          open={true}
          autoHideDuration={notification.autoHideDuration || 4000}
          onClose={handleClose(notification.id)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          sx={{ mt: notifications.indexOf(notification) * 7 }}
        >
          <Alert
            onClose={handleClose(notification.id)}
            severity={notification.severity}
            sx={{ width: "100%" }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};
