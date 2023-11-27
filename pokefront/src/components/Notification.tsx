import React from "react";
import "../index.css";

interface NotificationProps {
  message: string;
  type: "success" | "error";
}

const NotificationProps: React.FC<NotificationProps> = ({ message, type }) => {
  return (
    <div
      className={`fixed bottom-4 right-4 bg-${
        type === "success" ? "green" : "red"
      }-500 text-white px-4 py-2 rounded`}
    >
      <p>{message}</p>
    </div>
  );
};

export default NotificationProps;
