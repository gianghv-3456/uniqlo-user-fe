import React from "react";
import { Link } from "react-router-dom";

export default function MemberAddress() {
  return (
    <>
      <main className="px-5 py-7 border">
        <h3 className="text-[31px] font-bold uppercase mb-5">
          Địa chỉ thành viên
        </h3>
        <section className="grid grid-cols-4">
          <div className="">Nam Nguyễn</div>
          <div>
            <div>
              sdasdasd, Xã Tân Quang, Huyện Văn Lâm, Hưng Yên 09887747374 /
              0092384923 ĐỊA CHỈ HIỆN TẠI
            </div>
          </div>
          <div></div>
          <div className="flex flex-col gap-2">
            <button class="flex justify-center items-center h-[45px] text-[#333] border-black border uppercase cursor-pointer text-[14px] px-5">
              <span className="relative flex items-center">
                <img
                  className="inline-block absolute left-[-30px]"
                  src="https://asset.uniqlo.com/g/icons/check_large.svg"
                  alt=""
                />
                <span className="inline-block"> Địa chỉ hiện tại</span>
              </span>
            </button>
            <button class="h-[45px]  text-[#333] border-black border uppercase cursor-pointer text-[14px]">
              Chỉnh sửa hồ sơ
            </button>
          </div>
        </section>
        <div className="border-b my-6"></div>
        <section className="flex flex-col gap-7">
          <h3 className="text-[31px] font-bold uppercase">
            Địa chỉ giao hàng (0)
          </h3>
          <p>Có thể lưu tối đa 10 địa chỉ.</p>
          <p>Không có đại chỉ giao hàng nào đã đăng ký.</p>
          <Link to="/member/address/registry">
            <button class="w-[30%] h-[45px] bg-[#1b1b1b] text-white uppercase cursor-pointer text-[18px]">
              Đăng ký một địa chỉ mới
            </button>
          </Link>
        </section>
      </main>
    </>
  );
}
