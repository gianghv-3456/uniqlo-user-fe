import React from "react";
import Slider from "../../../layouts/client/slider";
import ListSlice from "../../../layouts/client/list-slice";
import Footer from "../../../layouts/client/footer";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";

export default function HomePage() {
    return (
        <>
            <ListSlice />
            <main className="mx-[124px] px-[20px]">
                <section className="px-5 py-7 border mt-1 mb-7">
                    <div className="flex flex-col gap-5 px-[62px]">
                        <h3 className="uppercase text-[28px] pt-[16px] pb-2">NOTIFICATION</h3>
                        <Link className="font-semibold text-[18px] underline hover:text-gray-700">
                            - Change personal income tax
                        </Link>
                        <Link className="font-semibold text-[18px] underline hover:text-gray-700">
                            - Special price adjustment (online and all stores)
                        </Link>
                    </div>
                </section>
                <section>
                    <h2 className="font-bold uppercase text-[34px] mb-7">
                        Uniqlo application utility
                    </h2>
                    <main className="mt-6 mb-[88px]">
                        <div className="w-full">
                            <Swiper
                                loop={true}
                                slidesPerView={4}
                                navigation={true}
                                spaceBetween={30}
                                modules={[Navigation]}
                                className="w-full mySwiper"
                            >
                                <SwiperSlide>
                                    <div className="">
                                        <img
                                            className="min-w-full max-w-full min-h-[293px] max-h-[293px] object-cover"
                                            src="https://im.uniqlo.com/global-cms/spa/res2629834248797934e997734f81048e21fr.jpg"
                                            alt=""
                                        />
                                        <h3 className="mt-5 mb-2 uppercase font-bold text-left text-[18px]">
                                            Exclusive incentives are only available at the application
                                        </h3>
                                        <p className="text-left text-[16px]">
                                            Special price is only for application members. Scan ID code
                                            Application members before paying at the store to
                                            Get preferential prices.
                                        </p>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="">
                                        <img
                                            className="min-w-full max-w-full min-h-[293px] max-h-[293px] object-cover"
                                            src="https://im.uniqlo.com/global-cms/spa/res35ed47075c05896951c0667a17a263c7fr.jpg"
                                            alt=""
                                        />
                                        <h3 className="mt-5 mb-2 uppercase font-bold text-left text-[18px]">
                                            WELCOME COUPON
                                        </h3>
                                        <p className="text-left text-[16px]">
                                            Download Uniqlo application immediately and experience Welcome Coupon for
                                            The first order on the app.
                                        </p>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="">
                                        <img
                                            className="min-w-full max-w-full min-h-[293px] max-h-[293px] object-cover"
                                            src="https://im.uniqlo.com/global-cms/spa/res747a14ba91cec5c31d78e90d99793712fr.jpg"
                                            alt=""
                                        />
                                        <h3 className="mt-5 mb-2 uppercase font-bold text-left text-[18px]">
                                            Product barcode scanning
                                        </h3>
                                        <p className="text-left text-[16px]">
                                            Scan barcodes on the product to easily check the product
                                            Products are online or in the store.
                                        </p>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="">
                                        <img
                                            className="min-w-full max-w-full min-h-[293px] max-h-[293px] object-cover"
                                            src="https://im.uniqlo.com/global-cms/spa/resa7005eaee25b5c00ee4a325b855f267efr.jpg"
                                            alt=""
                                        />
                                        <h3 className="mt-5 mb-2 uppercase font-bold text-left text-[18px]">
                                            GET THE LATEST NEWS
                                        </h3>
                                        <p className="text-left text-[16px]">
                                            Receive the latest information about newly launched products, incentives
                                            Special and outstanding news.
                                        </p>
                                    </div>
                                </SwiperSlide>

                            </Swiper>
                        </div>
                    </main>
                </section>
                <section className="mt-[40px]">
                    <Link className="flex justify-center mb-7">
                        <button
                            className="h-12 border uppercase px-4 border-[#333]"
                            style={{ width: "calc(50% - 0.75rem)" }}
                        >
                            View information about Uniqlo application
                        </button>
                    </Link>
                </section>
                <section className="mt-10 mb-[60px]">
                    <h2 className="text-[34px] uppercase font-bold">Information</h2>
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <td className="px-0">
                                    <Link>User manual</Link>
                                </td>
                                <td className="px-0">
                                    <Link>Order in large quantities</Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-0">
                                    <Link>Style Hind</Link>
                                </td>
                                <td className="px-0">
                                    <Link>App</Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-0">
                                    <Link>Register the electronic newsletter</Link>
                                </td>
                                <td className="px-0">
                                    <Link>Uniqlo news</Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </main>
            <Footer />
        </>
    );
}
