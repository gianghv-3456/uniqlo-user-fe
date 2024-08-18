import { Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import instanceAxios from "../../../configs/axios";
import { message } from "antd";

export default function CreateReview() {
    const [size, setSize] = useState(3);

    const product = JSON.parse(localStorage.getItem("choose_product")) || {}
    const account = useSelector(state => state.account.data) || {};
    const navigate = useNavigate()

    const [accountRating, setAccountRating] = useState(5)
    const [star, setStar] = useState(5);
    const [content, setContent] = useState("");

    const handleChangeStar = (e) => {
        setStar(+e.target.value)
    }

    const handleChangeContent = (e) => {
        setContent(e.target.value)
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!content) {
            message.error("Enter comment");
        }

        const data = { star, content, productId: product.id, accountId: account.id }

        try {
            const result = await instanceAxios.post(`/evaluations/create`, data)
            if (result.data.statusCode === 201) {
                message.success("Success")
                setContent("")
            }
        } catch (error) {
            console.log(error);
            message.error("Error !")
        }
    }

    const getAccountRating = async () => {
        try {
            const result = await instanceAxios.get(`/evaluations/account/${account.id}`)
            if (result.data.statusCode === 200) {
                const data = result.data.data;
                const ratingFind = data.find(item => item.product.id == product.id)
                if (!ratingFind) {
                    setAccountRating(5)
                } else {
                    setAccountRating(ratingFind.star)
                }
            }
        } catch (error) {
            console.log(err);
        }
    }

    useEffect(() => {
        getAccountRating()
    }, [])

    return (
        <>
            <main className="mx-[124px] mb-[88px]">
                <div className="mt-[15px] mb-[52px] flex gap-2 font-normal text-[12px] uppercase">
                    <Link className="underline">Uniqlo</Link>
                    <span>/</span>
                    <Link className="underline">{product.category.name}</Link>
                    <span>/</span>
                    <span>{product.brand.name}</span>
                    <span>/</span>
                    <span>{product.name}</span>
                </div>
                <Link className="text-[16px] uppercase font-bold underline">
                    Back to product details
                </Link>
                <h1 className="mb-[88px] text-[34px] font-bold w-[60%]">
                    {product.name}
                </h1>
                <div className="flex gap-[30px]">
                    <section style={{ flex: 3 }} className="border px-[20px] py-[28px]">
                        <form onSubmit={onSubmit}>
                            <div className="flex justify-between items-center mb-[40px]">
                                <h3 className="text-[31px] uppercase font-bold">
                                    Write reviews
                                </h3>
                                <p className="text-[#378694]">Required *</p>
                            </div>
                            <div className="flex items-center mb-[28px]">
                                <label
                                    className="min-w-[200px] text-[17px] uppercase font-semibold"
                                    htmlFor=""
                                >
                                    Star *
                                </label>
                                <Rating defaultValue={parseInt(accountRating)} onChange={handleChangeStar} />
                            </div>
                            {/* <div className="flex items-center mb-[28px]">
                            <label
                                className="min-w-[200px] text-[17px] uppercase font-semibold"
                                htmlFor=""
                            >
                                Dáng *
                            </label>
                            <div className="w-full">
                                <ul className="w-full flex mb-7 justify-between">
                                    <li className="text-[15px] font-bold uppercase">Chật</li>
                                    <li className="text-[15px] font-bold uppercase">Hơi chật</li>
                                    <li className="text-[15px] font-bold uppercase  text-center">
                                        Đúng với kích thước
                                    </li>
                                    <li className="text-[15px] font-bold uppercase">Hơi rộng</li>
                                    <li className="text-[15px] font-bold uppercase">Rộng</li>
                                </ul>
                                <div className="w-full flex items-center">
                                    <div
                                        className={`size-[14px] rounded-full bg-[#dadada] cursor-pointer ${size === 1 ? "dot-selected" : ""
                                            }`}
                                        onClick={() => setSize(1)}
                                    ></div>
                                    <div className="border-b flex-1"></div>
                                    <div
                                        className={`size-[14px] rounded-full bg-[#dadada] cursor-pointer ${size === 2 ? "dot-selected" : ""
                                            }`}
                                        onClick={() => setSize(2)}
                                    ></div>
                                    <div className="border-b flex-1"></div>
                                    <div
                                        className={`size-[14px] rounded-full bg-[#dadada] cursor-pointer ${size === 3 ? "dot-selected" : ""
                                            }`}
                                        onClick={() => setSize(3)}
                                    ></div>
                                    <div className="border-b flex-1"></div>
                                    <div
                                        className={`size-[14px] rounded-full bg-[#dadada] cursor-pointer ${size === 4 ? "dot-selected" : ""
                                            }`}
                                        onClick={() => setSize(4)}
                                    ></div>
                                    <div className="border-b flex-1"></div>
                                    <div
                                        className={`size-[14px] rounded-full bg-[#dadada] cursor-pointer ${size === 5 ? "dot-selected" : ""
                                            }`}
                                        onClick={() => setSize(5)}
                                    ></div>
                                </div>
                            </div>
                        </div> */}
                            {/* <div className="flex items-center mb-[28px]">
                            <label
                                className="min-w-[200px] text-[17px] uppercase font-semibold"
                                htmlFor=""
                            >
                                Tiêu đề *
                            </label>
                            <div className="w-full">
                                <input
                                    type="text"
                                    className="login-input w-full"
                                    placeholder="Tóm tắt đánh giá của bạn"
                                />
                                <p>Tiêu đề của bạn phải ít hơn 100 ký tự.</p>
                            </div>
                        </div> */}
                            <div className="flex items-center mb-[28px]">
                                <label
                                    className="min-w-[200px] text-[17px] uppercase font-semibold"
                                    htmlFor=""
                                >
                                    Comment *
                                </label>
                                <div className="w-full">
                                    <textarea className="login-input" cols="30" rows="3"
                                        value={content}
                                        onChange={handleChangeContent}
                                    ></textarea>
                                    {/* <p>Bạn phải viết ít nhất 50 ký tự tại đây.</p> */}
                                </div>
                            </div>
                            {/* <div className="flex flex-col gap-2 mb-[28px]">
                            <label
                                className="min-w-[200px] text-[17px] uppercase font-semibold"
                                htmlFor=""
                            >
                                Kích cỡ đã mưa *
                            </label>
                            <div className="w-full">
                                <select className="login-input">
                                    <option value="">1</option>
                                    <option value="">1</option>
                                    <option value="">1</option>
                                    <option value="">1</option>
                                </select>
                            </div>
                        </div> */}
                            {/* <div className="flex items-center mb-[28px]">
                            <label
                                className="min-w-[200px] text-[17px] uppercase font-semibold"
                                htmlFor=""
                            >
                                Biệt danh *
                            </label>
                            <div className="w-full">
                                <input
                                    type="text"
                                    className="login-input"
                                    placeholder="Vui lòng nhập tên đăng nhập"
                                />
                                <p>Vui lòng nhập tên đăng nhập.</p>
                            </div>
                        </div> */}
                            {/* <h3 className="uppercase font-bold text-[20px] my-[20px]">
                            Thông tin người mặc
                        </h3>
                        <div className="grid grid-cols-2 gap-[50px] mb-[28px]">
                            <div className="flex flex-col gap-2">
                                <label className="font-semibold uppercase">Giới tính *</label>
                                <select className="login-input">
                                    <option value="">Chọn</option>
                                    <option value="">Nam</option>
                                    <option value="">Nữ</option>
                                    <option value="">Khác</option>
                                    <option value="">Câu trả lời khác</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-semibold uppercase">Vị trí *</label>
                                <select className="login-input">
                                    <option value="">Chọn</option>
                                    <option value="">Nam</option>
                                    <option value="">Nữ</option>
                                    <option value="">Khác</option>
                                    <option value="">Câu trả lời khác</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-[50px] mb-[28px]">
                            <div className="flex flex-col gap-2">
                                <label className="font-semibold uppercase">Độ tuổi</label>
                                <select className="login-input">
                                    <option value="">Chọn</option>
                                    <option value="">Nam</option>
                                    <option value="">Nữ</option>
                                    <option value="">Khác</option>
                                    <option value="">Câu trả lời khác</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-semibold uppercase">Chiều cao</label>
                                <select className="login-input">
                                    <option value="">Chọn</option>
                                    <option value="">Nam</option>
                                    <option value="">Nữ</option>
                                    <option value="">Khác</option>
                                    <option value="">Câu trả lời khác</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-[50px] mb-[28px]">
                            <div className="flex flex-col gap-2">
                                <label className="font-semibold uppercase">Cân nặng</label>
                                <select className="login-input">
                                    <option value="">Chọn</option>
                                    <option value="">Nam</option>
                                    <option value="">Nữ</option>
                                    <option value="">Khác</option>
                                    <option value="">Câu trả lời khác</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-semibold uppercase">Cỡ giày</label>
                                <select className="login-input">
                                    <option value="">Chọn</option>
                                    <option value="">Nam</option>
                                    <option value="">Nữ</option>
                                    <option value="">Khác</option>
                                    <option value="">Câu trả lời khác</option>
                                </select>
                            </div>
                        </div> */}
                            <div className="border-b my-[20px]"></div>
                            <h3 className="uppercase font-bold text-[20px]">
                                Post your review:
                            </h3>
                            <ul className="ml-[28px]">
                                <li className="list-disc">
                                    Your posted comment may be used.
                                </li>
                                <li className="list-disc">
                                    We do not accept advertising requirements for the
                                    Brands, individuals, other organizations. Also, we do not
                                    Pushing in stock and product size.{" "}
                                </li>
                            </ul>
                            <div className="my-[20px] flex items-center gap-2">
                                <input className="h-5 w-5" type="checkbox" />
                                <span>I agree with the UNIQLO use clause</span>
                            </div>
                            <div className="flex items-center gap-4 my-[20px]">
                                <button
                                    type="submit"
                                    class="h-[45px] text-[16px] uppercase font-bold hover:opacity-70 bg-[#000000] text-white w-[288px] py-2 px-1">
                                    Send
                                </button>
                                <button type="button"
                                    class="h-[45px] text-[16px] uppercase font-bold hover:opacity-70 border border-[#7d7d7d] w-[288px] py-2 px-1"
                                    onClick={() => navigate('/product-detail')}
                                >
                                    BACK TO PRODUCT DETAILS
                                </button>
                            </div>
                        </form>
                    </section>
                    <article className="flex-1 h-[365px] w-[365px]">
                        <img
                            className="object-cover w-full h-full"
                            src={product.defaultImage}
                            alt=""
                        />
                    </article>
                </div>
            </main>
        </>
    );
}
