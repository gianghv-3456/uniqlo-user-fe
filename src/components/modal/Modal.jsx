import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./index.css";
import IconError from "../../../public/images/icon-error.png";
import IconWarn from "../../../public/images/icon-warn.png";
import IconInfo from "../../../public/images/icon-info.png";
import IconSuccess from "../../../public/images/icon-success.jpg";

export default function Modal({
  cancel,
  confirm,
  text,
  type,
  okText,
  cancelText,
  title,
}) {
  return (
    <>
      <div className="overlay">
        <div className="fade-down bg-[#f7f7f7] w-[440px] p-6 rounded flex flex-col gap-6 fade-down">
          <div className="flex items-center justify-between">
            <h3 className="text-[20px] font-bold">{title || "Xác nhận"}</h3>
            <CloseIcon
              onClick={cancel}
              className="cursor-pointer hover:text-[#616161]"
            />
          </div>
          <div className="flex items-center gap-3">
            <img
              src={
                type === "error"
                  ? IconError
                  : type === "success"
                  ? IconSuccess
                  : type === "warn"
                  ? IconWarn
                  : type === "info"
                  ? IconInfo
                  : ""
              }
              className="h-[24px] "
              alt=""
            />
            <p className="text-[14px] font-[400] leading-[20px]">{text}</p>
          </div>
          <div className="border-bottom"></div>
          <div className="flex justify-end items-center gap-2">
            <button className="q-button q-button-secondary" onClick={cancel}>
              {cancelText || "Hủy"}
            </button>
            {type === "success" ? (
              <></>
            ) : (
              <button
                className="q-button q-button-primary"
                onClick={confirm}
                danger
              >
                {okText || "Đồng ý"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
