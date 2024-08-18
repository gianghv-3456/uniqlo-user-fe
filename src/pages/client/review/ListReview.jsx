import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import instanceAxios from "../../../configs/axios";

function formatDate(isoDateString) {
    // Tạo một đối tượng Date từ chuỗi ngày giờ
    var date = new Date(isoDateString);

    // Lấy ngày, tháng, năm từ đối tượng Date
    var year = date.getFullYear();
    var month = date.getMonth() + 1; // Tháng bắt đầu từ 0
    var day = date.getDate();

    // Tạo định dạng ngày tháng năm
    var formattedDate = day + "/" + month + "/" + year;

    return formattedDate;
}

export default function ListReview() {

    const product = JSON.parse(localStorage.getItem("choose_product")) || {}
    const userLogin = JSON.parse(localStorage.getItem("user_login")) || {}

    const [reviews, setReviews] = useState([]);
    const [stars, setStars] = useState([]);

    const getReviews = async () => {
        const result = await instanceAxios.get(`/evaluations/reviews/${product.id}`)
        if (result.data.statusCode === 200) {
            setReviews(result.data.data)
        } else {
            message.error("Error get reviews");
        }
    }

    const getStars = async () => {
        const result = await instanceAxios.get(`/evaluations/stars/${product.id}`)
        if (result.data.statusCode === 200) {
            setStars(result.data.data)
        } else {
            message.error("Error get reviews");
        }
    }
    useEffect(() => {
        getReviews()
        getStars()
    }, [])

    // const starFind = stars.find(el => el.account.id === userLogin.id) || { star: 5 };
    const averageStar = stars.reduce((total, item) => {
        return total += item.star
    }, 0) / stars.length;

    // console.log("trung binh: ", averageStar);
    // console.log(starFind);
    console.log(reviews);
    console.log(stars);

    return (
        <>
            <main className="mx-[124px] mb-[88px]">
                <div className="mt-[15px] mb-[52px] flex gap-2 font-normal text-[12px] uppercase">
                    <Link className="underline">Uniqlo</Link>
                    <span>/</span>
                    <Link className="underline">{product.category.name}</Link>
                    <span>/</span>
                    <Link className="underline">{product.brand.name}</Link>
                    <span>/</span>
                    <Link className="underline">{product.name}</Link>
                    <span>/</span>
                    <span>reviews</span>
                </div>
                <Link to={"/product-detail"} className="text-[16px] uppercase font-bold underline">
                    Back to product details
                </Link>
                <h1 className="mb-[88px] text-[34px] font-bold w-[60%]">
                    {product.name}
                </h1>
                <div className="flex gap-[30px]">
                    <section className="" style={{ flex: 3 }}>
                        <div className="flex justify-between items-center mb-[40px]">
                            <h3 className="text-[32px] uppercase font-bold">Reviews</h3>
                            <div className="flex items-center gap-2">
                                <Rating name="half-rating" value={parseInt(averageStar)} disabled />
                                <span> ({stars.length})</span>
                            </div>
                        </div>
                        <div className="border-b"></div>
                        <p className="my-[20px] font-semibold">{reviews.length} Comments</p>
                        <div className="border-b"></div>
                        <ul style={{ height: 700, overflowY: "scroll" }}>
                            {reviews.map((item, i) => (
                                <div key={i}>
                                    <li>
                                        <div className="flex justify-between items-center mt-7 mb-4">
                                            <h3 className="uppercase text-[20px] font-bold">{item.account.name}</h3>
                                            <time className="text-[#7d7d7d] text-[14px]">{formatDate(item.createdAt)}</time>
                                        </div>
                                        <div className="mb-5">
                                            {/* o day */}
                                            {/* <Rating
                                                name="half-rating"
                                                disabled
                                                value={starFind.star}
                                            /> */}
                                        </div>
                                        <div className="text-[16px] leading-[24px]">
                                            <dl className="flex gap-2">
                                                {item.content}
                                            </dl>
                                        </div>
                                        {/* <div className="mt-4 flex gap-4 items-center mb-7">
                                                <strong className="uppercase text-[14px] font-semibold">
                                                    broccoli
                                                </strong>
                                                <span className="text-[14px] text-[#7d7d7d]">Nữ</span>
                                                <span className="text-[14px] text-[#7d7d7d]">Singapore</span>
                                            </div> */}
                                    </li>
                                    <div className="border-b"></div>
                                </div>
                            ))}

                            {/* <div className="mt-[40px] mb-[20px] flex items-center justify-center cursor-pointer hover:text-gray-800">
                                <span className="uppercase font-bold">Tải thêm</span>
                                <KeyboardArrowDownIcon />
                            </div> */}
                        </ul>
                    </section>
                    <article className="flex-1 border px-[20px] py-[28px]">
                        <h3 className="uppercase font-bold text-[31px] mb-[28px]">
                            View summary information
                        </h3>
                        <h4 className="uppercase font-semibold text-[18px] mb-[28px]">
                            Customer reviews
                        </h4>
                        <div className="flex flex-col gap-5">
                            {
                                Array(5).fill().map((_, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <Rating name="half-rating" defaultValue={5 - i} disabled />
                                        <span> ({stars.filter(item => item.star === (5 - i)).length}) </span>
                                    </div>
                                ))
                            }
                        </div>
                        {/* <div className="my-[40px]">
                            <h1 className="text-[20px] uppercase font-bold break-words mb-4">
                                Quần áo có vừa không
                            </h1>
                            <ul className="w-full flex mb-7 justify-between">
                                <li className="text-[15px] font-bold uppercase">Chật</li>
                                <li className="text-[15px] font-bold uppercase w-[70px] text-center">
                                    Đúng với kích thước
                                </li>
                                <li className="text-[15px] font-bold uppercase">Rộng</li>
                            </ul>
                            <div className="w-full flex items-center">
                                <div className="size-[14px] rounded-full bg-[#dadada]"></div>
                                <div className="border-b flex-1"></div>
                                <div className="size-[14px] rounded-full bg-[#dadada]"></div>
                                <div className="border-b flex-1"></div>
                                <div className="size-[14px] rounded-full bg-[#dadada] dot-selected"></div>
                                <div className="border-b flex-1"></div>
                                <div className="size-[14px] rounded-full bg-[#dadada]"></div>
                                <div className="border-b flex-1"></div>
                                <div className="size-[14px] rounded-full bg-[#dadada]"></div>
                            </div>
                        </div> */}
                        <div className="mt-[20px] mb-[20px]">
                            <Link to="/reviews/new">
                                <button className="h-[45px] text-[16px] uppercase font-bold hover:opacity-70 border border-[#7d7d7d] w-[288px] py-2 px-1">
                                    Write reviews
                                </button>
                            </Link>
                        </div>

                        <hr />

                        <div className="flex flex-col gap-5" style={{ height: 350, overflowY: "scroll" }}>
                            {
                                stars.map((star, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-center">
                                            <h3 className="uppercase text-[20px] font-bold">{star.account.name}</h3>
                                            <Rating
                                                name="half-rating"
                                                disabled
                                                value={star.star}
                                            />
                                        </div>
                                        <div className="border-b"></div>
                                    </div>
                                ))
                            }
                        </div>
                    </article>
                </div>
            </main>
        </>
    );
}
