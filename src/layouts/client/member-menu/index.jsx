import React from "react";
import { NavLink } from "react-router-dom";
import "./index.css";

export default function MemberMenu() {
  return (
    <>
      <menu className="flex flex-col flex-1">
        <ul className="flex flex-col gap-3 mb-3" id="list-option-info">
          <h2 className="mb-0 font-bold text-[15px]">Membership status</h2>
          <NavLink end to="/member" className="pl-3">
            Profile
          </NavLink>
          {/* <NavLink to="/member/coupon-wallet" className="pl-3">
            Phiếu giảm giá
          </NavLink> */}
          {/* <NavLink to="/member/purchase/history" className="pl-3">
            Lịch sử mua hàng
          </NavLink> */}
          <NavLink to="/member/orders" className="pl-3">
            Orders
          </NavLink>
        </ul>
        <ul className="flex flex-col gap-2" id="list-option-info">
          <h2 className="mb-0 font-bold text-[15px]">Profile settings</h2>
          <NavLink to="/member/edit" className="pl-3">
            Edit profile
          </NavLink>
          {/* <NavLink to="/member/address" className="pl-3">
            Sổ địa chỉ
          </NavLink> */}
          <NavLink to="/member/change-password" className="pl-3">
            Change password
          </NavLink>
        </ul>
      </menu>
    </>
  );
}
