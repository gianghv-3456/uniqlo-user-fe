import { Breadcrumb, Radio, message } from "antd";
import { Link } from "react-router-dom";
import DiscountIcon from "@mui/icons-material/Discount";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ErrorIcon from "@mui/icons-material/Error";
import { useDispatch, useSelector } from "react-redux";
import instanceAxios from "../../../configs/axios";
import { getCart } from "../../../redux/slices/cart";
import { useRef, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";

export default function Checkout() {

    const dispatch = useDispatch();

    const account = useSelector(state => state.account.data);
    const cart = useSelector(state => state.cart.data);
    const total = JSON.parse(localStorage.getItem("total_orders")) || 0;
    const formRef = useRef(null);
    const [pay, setPay] = useState(true);


    const handlePaypalOrder = async () => {
        const formData = new FormData(formRef.current);
        const values = {};
        for (let [name, value] of formData.entries()) {
            values[name] = value;
        }

        const data = { ...values, account_id: account.id, total, pay };

        try {
            const result = await instanceAxios.post(`/orders/create`, data)
            console.log(result);
            if (result.data.statusCode === 200) {
                message.success(result.data.message);
                localStorage.removeItem("total_orders")
                dispatch(getCart(account.id))
                e.target.reset();
            }
        } catch (error) {
            console.log(error);
            message.error(error.response.data.message)
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const values = {};
        for (let [name, value] of formData.entries()) {
            values[name] = value;
        }

        const data = { ...values, account_id: account.id, total, pay };

        try {
            const result = await instanceAxios.post(`/orders/create`, data)
            console.log(result);
            if (result.data.statusCode === 200) {
                message.success(result.data.message);
                localStorage.removeItem("total_orders")
                dispatch(getCart(account.id))
                e.target.reset();
            }
        } catch (error) {
            console.log(error);
            message.error(error.response.data.message)
        }
    }

    return (
        <>
            <main className="mx-[124px] my-0 px-[20px] py-0 h-auto flex flex-col z-20">
                <div className="mt-[15px] mb-[50px] z-20">
                    <Breadcrumb
                        items={[
                            {
                                title: (
                                    <Link className="uppercase underline" to="/">
                                        Uniqlo
                                    </Link>
                                ),
                            },
                            {
                                title: (
                                    <Link className="uppercase underline" to="/">
                                        Cart
                                    </Link>
                                ),
                            },
                            {
                                title: <p className="uppercase">Checkout</p>,
                            },
                        ]}
                    />
                </div>
                <section className="flex mb-[50px] flex-col">
                    <h1 className="text-[34px] font-bold uppercase mb-[40px]">
                        Order
                    </h1>
                    <div className="flex gap-14">
                        <main style={{ flex: 2 }} className="max-h-[100%] overflow-y-auto">
                            <div className="border">
                                {/* <div className="px-[20px] py-7 border-b">
                                    <h1 className="text-[31px] text-[#757575] uppercase font-semibold">
                                        1. Tùy chọn giao hàng
                                    </h1>
                                </div> */}
                                <div className="px-[20px] py-7 ">
                                    {/* <div className="mb-5">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Radio
                                                id="address"
                                                
                                                type="radio"
                                                className="h-[20px] w-[20px]"
                                            />
                                            <label
                                                htmlFor="address"
                                                className="text-[16px] text-[#757575]"
                                            >
                                                Click & Collect
                                            </label>
                                        </div>
                                        <div className="text-[16px] flex gap-2">
                                            <p>Phí vận chuyến: </p>
                                            <span className="uppercase text-[#378694]">Miễn phí</span>
                                        </div>
                                        <div className="w-[60%] text-[15px] font-bold text-[#757575]">
                                            Khách hàng sẽ nhận được email thông báo khi đơn hàng có
                                            tại cửa hàng. Cửa hàng có thể trực tiếp chuẩn bị đơn hàng
                                            nếu có số lượng sản phẩm phù hợp. TP. Hồ Chí Minh: 1 - 4
                                            ngày, Hà Nội & Hải Phòng: 1 - 7 ngày.
                                        </div>
                                    </div> */}
                                    {/* <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Radio
                                                id="address"
                                                
                                                type="radio"
                                                className="h-[20px] w-[20px]"
                                            />
                                            <label
                                                htmlFor="address"
                                                className="text-[16px] text-[#757575]"
                                            >
                                                Giao Đến địa chỉ
                                            </label>
                                        </div>
                                        <div className="text-[16px] flex gap-2">
                                            <p>Phí vận chuyến: </p>
                                            <span className="uppercase text-[#378694]">Miễn phí</span>
                                        </div>
                                        <div className="w-[60%] text-[15px] font-bold text-[#757575]">
                                            [Thời gian giao hàng dự kiến] TP. Hồ Chí Minh: 2 ngày, các
                                            tỉnh miền Nam khác: 3 ngày, Hà Nội: 3 ngày, các tỉnh miền
                                            Bắc khác: 4 ngày, các tỉnh miền Trung: 4 ngày.
                                        </div>
                                    </div> */}
                                    {/* <div className="border-b my-7"></div> */}
                                    <form className="flex flex-col gap-7" onSubmit={onSubmit} ref={formRef}>
                                        <h1 className="text-[34px] uppercase text-[#757575] font-bold mb-5">
                                            Purchasing information
                                        </h1>
                                        <div className="flex items-center">
                                            <label
                                                className="min-w-[200px] text-[17px] uppercase font-bold"
                                                htmlFor=""
                                            >
                                                Name *
                                            </label>
                                            <div className="w-full">
                                                <input
                                                    name="name"
                                                    id="name"

                                                    type="text"
                                                    className="login-input border-2 w-full"
                                                    defaultValue={account.name}
                                                />
                                                {/* <p className="tex-[14px] text-[#f00] mt-2">
                                                    Vui lòng nhập tên của bạn
                                                </p> */}
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <label
                                                className="min-w-[200px] text-[17px] uppercase font-bold"
                                                htmlFor="phone"
                                            >
                                                Phone *
                                            </label>
                                            <div className="w-full">
                                                <input
                                                    name="phone"
                                                    id="phone"

                                                    type="text"
                                                    className="login-input border-2 w-full"
                                                    defaultValue={account.phone}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <label
                                                className="min-w-[200px] text-[17px] uppercase font-bold"
                                                htmlFor="email"
                                            >
                                                Email *
                                            </label>
                                            <div className="w-full">
                                                <input
                                                    name="email"
                                                    id="email"

                                                    type="text"
                                                    className="login-input border-2 w-full"
                                                    defaultValue={account.email}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <label
                                                className="min-w-[200px] text-[17px] uppercase font-bold"
                                                htmlFor="address"
                                            >
                                                Address *
                                            </label>
                                            <div className="w-full">
                                                <input
                                                    name="address"
                                                    id="address"

                                                    type="text"
                                                    className="login-input border-2 w-full"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <label
                                                className="min-w-[200px] text-[17px] uppercase font-bold"
                                                htmlFor="note"
                                            >
                                                Note *
                                            </label>
                                            <div className="w-full">
                                                <textarea
                                                    name="note"
                                                    cols="30"
                                                    rows="4"
                                                    id="note"

                                                    type="note"
                                                    className="login-input border-2 w-full"
                                                ></textarea>
                                                <p className="tex-[14px] text-[#f00] mt-2">
                                                    For valid invoices, require accurate information.
                                                </p>
                                            </div>
                                        </div>

                                        <p>
                                            We can contact you by phone or email if we have questions about your order and delivery option.
                                        </p>
                                        <div className="text-right text-[#378694]">Required *</div>
                                        {/* <div className="flex items-center gap-2">
                                            <input id="confirm" 
                                            type="checkbox" className="h-5 w-5" />
                                            <label htmlFor="confirm">
                                                Dùng làm địa chỉ thanh toán
                                            </label>
                                            <ErrorIcon className="text-[#ababab]" />
                                        </div> */}

                                        <div style={{ display: "flex", gap: 12 }}>
                                            <button
                                                style={{
                                                    padding: "0 5px", border: '1px solid #333', minWidth: '60px',
                                                    boxShadow: `${pay ? "1px 1px 1px 1px #333" : ""}`
                                                }}
                                                type="button" onClick={() => setPay(true)}
                                            >
                                                Pay
                                            </button>
                                            <button
                                                style={{
                                                    padding: "0 5px", border: '1px solid #333', minWidth: '60px',
                                                    boxShadow: `${!pay ? "1px 1px 1px 1px #333" : ""}`
                                                }}
                                                type="button" onClick={() => setPay(false)}
                                            >
                                                Order
                                            </button>
                                        </div>

                                        {
                                            pay ?
                                                <PayPalButton
                                                    amount={total}
                                                    // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                                    onSuccess={(details, data) => {

                                                        handlePaypalOrder();
                                                        // OPTIONAL: Call your server to save the transaction
                                                        // return fetch("/paypal-transaction-complete", {
                                                        //     method: "post",
                                                        //     body: JSON.stringify({
                                                        //         orderID: data.orderID
                                                        //     })
                                                        // });
                                                    }}

                                                    onError={(error) => {
                                                        console.log(error);
                                                    }}
                                                />
                                                : <button
                                                    type="submit" className="uppercase bg-[#1b1b1b] text-white py-2 px-1 w-[40%]">
                                                    Order
                                                </button>
                                        }


                                    </form>
                                </div>
                            </div>
                        </main>
                        <article className="flex-1 flex flex-col gap-5">
                            <div className=" px-5 py-7 border">
                                <h1 className="uppercase font-bold text-[19px] flex gap-2 mb-7">
                                    Total order| <span>{cart.length}</span> <span>product</span>
                                    {/* <Link to="/cart" className="underline">
                                        Sửa
                                    </Link> */}
                                </h1>
                                {/* <div className="flex justify-between items-center text-[16px] text-[#1b1b1b] mb-7">
                                    <span>Tổng cộng</span>
                                    <span>1.416.000 VND</span>
                                </div> */}
                                <div className="flex justify-between items-center text-[19px] uppercase font-bold mb-[10px]">
                                    <h1>Total</h1>
                                    <h1>$ {total.toFixed(2)}</h1>
                                </div>
                                <div className="flex justify-between text-[16px text-[#1b1b1b]">
                                    <p>Including value added tax</p>
                                    <p>$ {total.toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between font-bold mt-7 text-[19px] uppercase">
                                    <h1 className="">Total orders</h1>
                                    <span>$ {total.toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="border py-7 px-5">
                                <h1 className="text-[20px] uppercase font-bold mb-4">
                                    Products order
                                </h1>
                                <div className="grid grid-cols-3 gap-5">
                                    {cart.map((item) => (
                                        <div key={item.id}>
                                            <img
                                                className="h-[120px] object-cover w-full"
                                                src={item.variation.image}
                                                alt=""
                                            />
                                            <p className="text-[16px] text-right">&#8569; {item.quantity}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <Link className="border-b border-t my-[10px] py-[14px] flex gap-2 justify-between items-center">
                                <div className="flex gap-2 items-center">
                                    <DiscountIcon
                                        style={{ fontSize: 18 }}
                                        className="text-[#757575]"
                                    />
                                    <p>Coupons</p>
                                </div>
                                <ArrowForwardIosIcon
                                    className="text-[#757575]"
                                    style={{ fontSize: 18 }}
                                />
                            </Link>
                        </article>
                    </div>
                </section>
            </main>
        </>
    );
}
