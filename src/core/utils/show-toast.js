import { toast } from "react-toastify";


export const showToast = (
  message,
  type,
  position = "bottom-right"
) => {
  message.map((mes) => {
    switch (type) {
      case "success":
        toast.success(mes, { position: position });
        break;
      case "error":
        toast.error(mes, { position: position });
        break;
      case "warning":
        toast.warning(mes, { position: position });
        break;
      case "info":
        toast.info(mes, { position: position });
        break;
    }
  });
};
