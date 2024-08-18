import React from "react";
import { Link } from "react-router-dom";
import LogoYoutube from "../../../../public/images/logo-youtube.webp";
import LogoInstagram from "../../../../public/images/logo-instagram.jpg";

export default function Footer() {
    return (
        <>
            <footer className="bg-[#f4f4f4] border-b">
                <div className="py-[52px] px-[20px] mx-[124px] my-0 flex gap-4">
                    <div className="flex-1 flex flex-col gap-3">
                        <h1 className="font-semibold text-[18px]">About Uniqlo</h1>
                        <Link>Information</Link>
                        <Link>Store list</Link>
                        <Link>Career opportunities</Link>
                    </div>
                    <div className="flex-1 flex flex-col gap-3">
                        <h1 className="font-semibold text-[18px]">Help</h1>
                        <Link>FAQ</Link>
                        <Link>Return policy</Link>
                        <Link>Privacy Policy</Link>
                        <Link>Approach</Link>
                    </div>
                    <div className="flex-1 flex flex-col gap-3">
                        <h1 className="font-semibold text-[18px]">Account</h1>
                        <Link>Membership status</Link>
                        <Link>File</Link>
                        <Link>Coupons</Link>
                    </div>
                    <div className="flex-1 flex flex-col gap-3">
                        <h1 className="font-semibold text-[18px]">Electronic newsletter</h1>
                        <p className="pr-5">
                            Register now and be the first to know the information when present
                            New goods, promotions, events are about to take place at the store and
                            Many other useful information.
                        </p>
                        <Link className="underline uppercase text-[16px] font-semibold">
                            Register now
                        </Link>
                    </div>
                    <div className="flex-1 flex flex-col gap-3">
                        <h1 className="font-semibold text-[18px]">
                            Social account <span className="uppercase">uniqlo</span>
                        </h1>
                        <div className="flex items-center gap-3 ">
                            <a className="border h-[50px] w-[50px] " href="">
                                <img
                                    className="w-[70%] m-auto h-full object-contain"
                                    src="http://pngimg.com/uploads/facebook_logos/facebook_logos_PNG19748.png"
                                    alt=""
                                />
                            </a>
                            <a className="border h-[50px] w-[50px] " href="">
                                <img
                                    className="w-full h-full object-contain"
                                    src="https://logolook.net/wp-content/uploads/2021/06/Tiktok-Logo-2016.png"
                                    alt=""
                                />
                            </a>
                            <a className="border h-[50px] w-[50px] " href="">
                                <img
                                    className="w-[80%] m-auto h-full object-contain"
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_(2017).svg/2560px-YouTube_full-color_icon_(2017).svg.png"
                                    alt=""
                                />
                            </a>
                            <a className="border h-[50px] w-[50px] " href="">
                                <img
                                    className="w-full m-auto h-full object-contain"
                                    src="https://logos-world.net/wp-content/uploads/2020/04/Instagram-icon-Logo-2016-present.png"
                                    alt=""
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
            <section className="mx-[124px]">
                <div className="p-5 flex justify-between items-center">
                    <p className="text-gray-700 font-medium uppercase">
                        Copyright of Uniqlo Co., Ltd. Reserve all rights.
                    </p>
                    <div className="flex gap-4 underline">
                        <Link>Terms of use</Link>
                        <Link>Terms of use</Link>
                    </div>
                </div>
                <div className="pb-3 leading-7 text-[14px]">
                    <p> Company name: UNIQLO VIETNAM CO., LTD </p>
                    <p>
                        Business registration certificate number: 0315304731, first registration
                        On October 2, 2018, registered for the third change on September 23, 2019
                    </p>
                    <p>
                        Address of business headquarters: Floor 26, the building is operating offices and
                        Viettel Trade Center, 285 Cach Mang Thang Tam, Ward 12,
                        District 10, Ho Chi Minh City
                    </p>
                    <p>For questions, please visit FAQ/Help</p>
                    <p className="pb-3">
                        Work time: 9:00 - 18:00 (Monday - Sunday)
                    </p>
                    <img
                        src="https://im.uniqlo.com/global-cms/spa/resfb28ee615b9469a533e195812bd0de44fr.png"
                        alt=""
                    />
                </div>
            </section>
        </>
    );
}
