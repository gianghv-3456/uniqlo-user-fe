import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Rate, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DiscountIcon from "@mui/icons-material/Discount";
import RedeemIcon from "@mui/icons-material/Redeem";
import ErrorIcon from "@mui/icons-material/Error";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import instanceAxios from "../../../configs/axios";
import { getCart } from "../../../redux/slices/cart"
import axios from "axios";


function checkNewProduct(dateString) {
    // Chuyển đổi chuỗi ngày giờ thành đối tượng Date
    const productDate = new Date(dateString);

    // Lấy ngày giờ hiện tại
    const currentDate = new Date();

    // Tính toán sự chênh lệch giữa hai ngày
    const difference = currentDate.getTime() - productDate.getTime();
    const threeDaysInMillis = 3 * 24 * 60 * 60 * 1000; // 3 ngày tính bằng mili giây

    // Kiểm tra xem sự chênh lệch có nhỏ hơn 3 ngày hay không
    if (difference < threeDaysInMillis) {
        return true;
    } else {
        return false;
    }
}

// Sử dụng hàm
// const productDateString = "2024-05-02T11:42:30.123Z";
// const isNew = checkNewProduct(productDateString);
// console.log("Is the product new?", isNew);


export default function Cart() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cart = useSelector(state => state.cart.data);
    const account = useSelector(state => state.account.data)
    const products = useSelector(state => state.product.data) || [];

    const [itemYourLike, setItemYourLike] = useState([])
    // console.log(cart);

    const [showResult, setShowResult] = useState(false);
    const [isTym, setIsTym] = useState(false);

    const handleDeleteCartItem = async (id) => {
        try {
            const result = await instanceAxios.delete(`/carts/${id}`)
            dispatch(getCart(account.id))
        } catch (error) {
            console.log(error);
        }
    }

    const handleClickCkeckout = () => {

        if (cart.length === 0) {
            message.error("Cart empty")
            return
        }

        localStorage.setItem("total_orders", JSON.stringify(total));
        navigate('/checkout')
    }

    const handleChangeQuantity = async (status, cart) => {
        if ((status === -1 && cart.quantity === 1) || (status === 1 && cart.quantity === 3)) {
            return;
        }

        try {
            const result = await instanceAxios.put(`/carts/update-quantity`, { status, id: cart.id })
            if (result.data.statusCode === 200) {
                dispatch(getCart(account.id));
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getItemYourLike = async () => {
        try {
            const result = await axios.get(`http://localhost:3006/cfrecommend/${account.id}`)
            if (result.data.statusCode === 200) {
                console.log("reuslt recommend cart:: ", result.data.data);
                setItemYourLike(result.data.data)
            }
        } catch (error) {
            console.log("==>> :: ", error);
        }
    }

    const total = cart.reduce((total, item) => {
        return total += +(item.variation.product.price * (100 - item.variation.product.discountPercentage) / 100 * item.quantity).toFixed(2)
    }, 0)

    const handleClickProduct = (product) => {
        localStorage.setItem("choose_product", JSON.stringify(product));
        navigate('/product-detail')
    }

    useEffect(() => {
        document.title = "Uniqlo | Giỏ hàng";

        getItemYourLike()
    }, []);
    return (
        <>
            <main className="mx-[124px] my-0 px-[20px] py-0 h-auto flex flex-col z-20">
                <div className="mt-[15px] mb-[50px] z-20">
                    <Breadcrumb
                        items={[
                            {
                                title: <Link to="/">Uniqlo</Link>,
                            },
                            {
                                title: <p>Cart</p>,
                            },
                        ]}
                    />
                </div>
                <section className="flex mb-[50px] flex-col">
                    <h1 className="text-[34px] font-bold uppercase mb-[88px]">
                        Cart
                    </h1>
                    <div className="flex gap-[88px]">
                        <section style={{ flex: 2 }}>
                            {cart
                                .map((item) => (
                                    <React.Fragment key={item.id}>
                                        <div className="flex gap-[20px]">
                                            <div className="min-w-[216px] max-w-[216px] min-h-[216px] max-h-[216px]">
                                                <img
                                                    className="w-full h-full object-cover"
                                                    src={item.variation.image}
                                                    alt=""
                                                />
                                            </div>
                                            <div className="flex w-full gap-6">
                                                <div className="flex flex-col gap-2 flex-1">
                                                    <h1 className="text-[20px] text-[#1b1b1b] font-bold">
                                                        {item.variation.product.name}
                                                    </h1>
                                                    {/* <span className="text-[16px] text-[#7d7d7d]">
                                                    Mã sản phẩm: 465761
                                                </span> */}
                                                    <span>Color:
                                                        <span
                                                            style={{
                                                                display: "inline-block", width: 16, height: 16,
                                                                backgroundColor: `${item.variation.color}`,
                                                                margin: "0 4px",
                                                                boxShadow: "1px 1px 1px 1px #999"
                                                            }}>
                                                        </span>
                                                        {item.variation.color}
                                                    </span>
                                                    {/* <span>Kích cỡ: Nữ S</span> */}
                                                    <span className="text-[#7d7d7d]">
                                                        {checkNewProduct(item.variation.product.createdAt) ? "New" : ""}
                                                    </span>
                                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                        <span className="mt-4 mb-2"
                                                            style={{ textDecoration: `${item.variation.product.discountPercentage != 0 ? "line-through" : "none"}` }}
                                                        >
                                                            ${item.variation.product.price}
                                                        </span>

                                                        {item.variation.product.discountPercentage != 0 ?
                                                            <>
                                                                <span>{item.variation.product.discountPercentage}%</span>
                                                                <span>${((100 - item.variation.product.discountPercentage) * item.variation.product.price / 100).toFixed(2)}</span>
                                                            </>
                                                            : <></>}

                                                    </div>
                                                    <h3 className="uppercase text-[13px] font-semibold mb-[14px]">
                                                        Quantity
                                                    </h3>
                                                    <div className="flex justify-between w-full items-center">
                                                        <div className="relative">
                                                            <div className=" bottom-0 border w-[134px] h-[45px] flex items-center justify-between pr-2 pl-[15px]">
                                                                <span
                                                                    style={{
                                                                        display: "inline-block", width: 24,
                                                                        cursor: "pointer", textAlign: "center"
                                                                    }}
                                                                    onClick={() => handleChangeQuantity(-1, item)}
                                                                >-</span>

                                                                <span>{item.quantity}</span>

                                                                <span
                                                                    style={{
                                                                        display: "inline-block", width: 24,
                                                                        cursor: "pointer", textAlign: "center"
                                                                    }}
                                                                    onClick={() => handleChangeQuantity(1, item)}
                                                                >+</span>
                                                                {/* {showResult ? (
                                                                <>
                                                                    <ExpandMoreIcon
                                                                        onClick={() => setShowResult(false)}
                                                                        className="cursor-pointer"
                                                                    />
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <ExpandLessIcon
                                                                        onClick={() => setShowResult(true)}
                                                                        className="cursor-pointer"
                                                                    />
                                                                </>
                                                            )} */}
                                                            </div>
                                                            {/* {showResult && (
                                                            <>
                                                                <div className="absolute border w-[134px] h-[45px] z-20 bg-white text-[#378694] pl-[15px] flex items-center cursor-pointer hover:bg-[#f6f6f6]">
                                                                    1
                                                                </div>
                                                            </>
                                                        )} */}
                                                        </div>
                                                        <div className="text-[20px] uppercase">
                                                            <span>Total: </span>
                                                            <span className="font-semibold">$
                                                                {((item.variation.product.price * (100 - item.variation.product.discountPercentage) / 100) * item.quantity).toFixed(2)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <CloseIcon
                                                    className="cursor-pointer"
                                                    style={{ fontSize: 30 }}
                                                    onClick={() => handleDeleteCartItem(item.id)}
                                                />
                                            </div>
                                        </div>
                                        <div className="border-b my-7"></div>
                                    </React.Fragment>
                                ))}
                        </section>

                        <div className="flex-1">
                            <section className="border">
                                <div className="px-5 py-7">
                                    <h1 className="text-[19px] font-bold uppercase mb-[28px]">
                                        Total Order&#124; {cart.length} product
                                    </h1>
                                    {/* <div className="flex justify-between items-center text-[16px] mb-[28px]">
                                        <p>Sub Total</p>
                                        <span>$ {total.toFixed(2)}</span>
                                    </div> */}
                                    <div className="flex flex-col gap-[8px] mb-[18px]">
                                        <div className="flex justify-between items-center text-[20px] font-bold uppercase">
                                            <p>Total</p>
                                            <span>$ {total.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-[16px]">
                                            <p>Including value added tax</p>
                                            <span>$ {total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mb-[28px]">
                                        <h1 className="text-[20px] font-bold uppercase ">
                                            Total orders
                                        </h1>
                                        <span className="uppercase font-bold text-[16px]">
                                            $ {total.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </section>
                            <div className="border-b border-t cursor-pointer mt-[30px] py-[14px] flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <DiscountIcon
                                        className="text-[#5a5a5a]"
                                        style={{ fontSize: 18 }}
                                    />
                                    <span>Coupons</span>
                                </div>
                                <ArrowForwardIosIcon
                                    className="text-[#5a5a5a]"
                                    style={{ fontSize: 18 }}
                                />
                            </div>
                            <div className="cursor-pointer my-[12px] py-[14px] flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <RedeemIcon
                                        className="text-[#5a5a5a]"
                                        style={{ fontSize: 18 }}
                                    />
                                    <span>Gift options</span>
                                </div>
                                <ArrowForwardIosIcon
                                    className="text-[#5a5a5a]"
                                    style={{ fontSize: 18 }}
                                />
                            </div>
                            <div className="flex items-center gap-[30px]">
                                <p className="break-words">
                                    Free delivery applies to orders delivered from place
                                    $ 500.00 and all applications at the store (Click &
                                    Collect)
                                </p>
                                <ErrorIcon className="text-[#ababab]" />
                            </div>
                            <div className="w-full mt-4">
                                <button
                                    className="bg-[red] px-1 py-3 tex-[16px] 
                                font-semibold text-white uppercase w-full"
                                    onClick={() => handleClickCkeckout()}>
                                    Checkout
                                </button>
                            </div>
                            <div className="w-full mt-4">
                                <button
                                    className="bg-white border border-black px-1 py-3 tex-[16px] 
                                    font-semibold hover:text-[#5a5a5a] uppercase w-full"
                                >
                                    Continue shopping
                                </button>
                            </div>
                            <p className="w-full mt-4 text-[#7d7d7d] text-[13px]">
                                Order an additional ${(500 - total) > 0 ? (500 - total).toFixed(2) : 0} (including VAT), or choose the form
                                Click & Collect, for free delivery.
                            </p>
                        </div>
                    </div>
                </section>

                {/* <div className="mb-4 text-center cursor-pointer hover:underline hover:text-blue-600">
          Xem thêm
        </div> */}

                <section className="mt-[50px]">
                    <h1 className="font-semibold text-[34px] uppercase">
                        ITEMS YOU MAY LIKE
                    </h1>
                    <main className="mt-6 mb-[88px]">
                        <div className="w-full">
                            <Swiper
                                slidesPerView={4}
                                navigation={true}
                                spaceBetween={30}
                                modules={[Navigation]}
                                className="w-full mySwiper"
                            >
                                {
                                    itemYourLike.map((item) => {
                                        const product = products.find(el => el.id === item.product_id)
                                        return (
                                            <SwiperSlide key={item.id}>
                                                <div className="relative">
                                                    {/* {isTym ? (
                                                        <>
                                                            <FavoriteIcon
                                                                onClick={() => setIsTym(false)}
                                                                className="absolute right-[10px] top-[10px] cursor-pointer text-[#f00]"
                                                            />
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FavoriteBorderIcon
                                                                onClick={() => setIsTym(true)}
                                                                className="absolute right-[10px] top-[10px] cursor-pointer text-[#f00]"
                                                            />
                                                        </>
                                                    )} */}
                                                    <img
                                                        className="min-w-full max-w-full min-h-[293px] max-h-[293px] object-cover"
                                                        src={product?.defaultImage}
                                                        alt=""
                                                    />
                                                    <div className="my-[20px]" style={{ display: "flex", gap: 4 }}>
                                                        {product.variations.map((variation) => (
                                                            <div key={variation.id} className="h-4 w-4 text-[#ababab]"
                                                                style={{ backgroundColor: `${variation.color}`, border: "1px solid #999" }}
                                                            ></div>
                                                        ))}
                                                    </div>
                                                    <div className="text-[14px] uppercase mb-5 text-[#ababab] font-bold flex justify-between items-center" >
                                                        <span className="">{product.category.name}</span>
                                                        {/* <p>5Y(110)-14Y(160)</p> */}
                                                    </div>
                                                    <h1 className="text-[20px] uppercase font-bold text-left mb-[10px]" style={{ minHeight: 92 }}
                                                        onClick={() => handleClickProduct(product)}
                                                    >
                                                        {product.name}
                                                    </h1>
                                                    <p className="text-[#7d7d7d] mb-1" style={{ textAlign: "left" }}>{product.brand.name}</p>
                                                    {product.discountPercentage == 0 ?
                                                        <p className="text-[#8c8b8b] uppercase font-bold text-[22px]" style={{ textAlign: "left" }}>
                                                            ${product.price}
                                                        </p>
                                                        :
                                                        <p className="text-[#8c8b8b] uppercase font-bold text-[22px] text-red-500" style={{ opacity: 1 }}>
                                                            ${(product.price * (100 - product.discountPercentage) / 100).toFixed(2)}
                                                            <span style={{ fontSize: 14 }}> (sale) </span>
                                                        </p>
                                                    }
                                                    <p style={{ textAlign: "left" }}>
                                                        <Rate allowHalf disabled defaultValue={parseInt(product.averageRating)}
                                                            style={{ fontSize: 16 }}
                                                        />
                                                        {" "}({product.numberRating})
                                                    </p>
                                                </div>
                                            </SwiperSlide>
                                        )
                                    })
                                }
                            </Swiper>
                        </div>
                    </main>
                </section>
            </main>
        </>
    );
}
