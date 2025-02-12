import { rem } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconAlertTriangleFilled, IconCheck, IconExclamationCircleFilled } from "@tabler/icons-react";
import React from "react";

export const useNotification = () => {
  return {
    success: (message: string | React.ReactNode) => notifications.show({
      title: "Thành công!",
      message: message,
      color: "green",
      icon: <IconCheck style={{ width: rem(18), height: rem(18), color: "green" }} />
    }),
    error: (message: string | React.ReactNode) => notifications.show({
      title: "Lỗi!",
      message: message,
      color: "red",
      icon: <IconExclamationCircleFilled style={{ width: rem(18), height: rem(18), color: "red" }} />
    }),
    warning: (message: string | React.ReactNode) => notifications.show({
      title: "Cảnh báo!",
      message: message,
      color: "yellow",
      icon: <IconAlertTriangleFilled style={{ width: rem(18), height: rem(18), color: "yellow" }}/>
    }),
  }
}