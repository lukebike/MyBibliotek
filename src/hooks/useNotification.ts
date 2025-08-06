import { useNotificationStore } from "../store/notificationStore";

export const useNotification = () => {
  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );

  const showSuccess = (message: string, autoHideDuration?: number) => {
    addNotification({ message, severity: "success", autoHideDuration });
  };

  const showError = (message: string, autoHideDuration?: number) => {
    addNotification({ message, severity: "error", autoHideDuration });
  };

  const showWarning = (message: string, autoHideDuration?: number) => {
    addNotification({ message, severity: "warning", autoHideDuration });
  };

  const showInfo = (message: string, autoHideDuration?: number) => {
    addNotification({ message, severity: "info", autoHideDuration });
  };

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};
