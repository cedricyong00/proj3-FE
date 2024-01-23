import { notifications } from "@mantine/notifications";

function useToast() {
  const successToast = (obj) => {
    notifications.show({
      title: obj.title,
      message: obj.message,
      autoClose: 5000,
    });
  };

  const errorToast = (err) => {
    if (err) {
      notifications.show({
        title: err,
        message: "Please try again",
        autoClose: 5000,
        color: "red",
      });
      return;
    }
    notifications.show({
      title: "Something went wrong!",
      message: "Please try again later",
      autoClose: 5000,
      color: "red",
    });
  };

  return {
    successToast,
    errorToast,
  };
}

export default useToast;
