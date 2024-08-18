import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Breadcrumb } from "antd";
import MemberMenu from "../../../layouts/client/member-menu";

export default function Member() {
  return (
    <>
      <div className="mx-[124px] mt-[15px] mb-[88px]">
        <Breadcrumb
          className="mb-[52px]"
          items={[
            {
              title: <Link>Uniqlo</Link>,
            },
            {
              title: <Link>Membership status</Link>,
            },
            {
              title: <span>Profile</span>,
            },
          ]}
        />
        <h2 className="text-[34px] font-bold uppercase mb-[52px]">
          Membership status
        </h2>
        <div className="flex">
          <MemberMenu />
          <div style={{ flex: 3 }}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
