import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Rate, message } from "antd";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import instanceAxios from "../../../configs/axios";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../redux/slices/cart";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Navigation } from "swiper/modules";
import axios from "axios";

const SIZE = ["XS", "S", "M", "L", "XL", "XXL"];

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

export default function ProductDetail() {

    const isTym = false

    const product = JSON.parse(localStorage.getItem("choose_product")) || {};
    const account = useSelector(state => state.account.data) || {};
    const products = useSelector(state => state.product.data) || [];
    const [reviews, setReviews] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showOverview, setShowOverview] = useState(false);
    const [showMaterial, setShowMaterial] = useState(false);
    const [showQuantity, setShowQuantity] = useState(false);

    const [quantity, setQuantity] = useState(1);
    const [selectVariation, setSelectVariation] = useState(product?.variations[0] || {});
    const [size, setSize] = useState(SIZE[3]);

    const [ratingProduct, setRatingProduct] = useState([])

    const images = [
        `${product.defaultImage}`,
        ...product.images.map((item) => item.image_path),
        ...product.variations.map((item => item.image)),
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const [messageApi, contextHolder] = message.useMessage();

    const [recommendProduct, setRecommendProduct] = useState([])

    const handleNextImage = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrevImage = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleClickColor = (variation) => {
        const imageVariation = variation.image
        const index = images.indexOf(imageVariation);
        if (index !== -1) {
            setCurrentIndex(index);
            setSelectVariation(variation);
        }
    };

    const handleChangeQuantity = (value) => {
        setQuantity(value);
    };

    const handleClickSize = (value) => {
        setSize(value);
    }

    const handleAddToCart = async () => {
        // console.log("add to cart", selectVariation, quantity);

        if (!selectVariation.id) {
            message.error("Product not sell")
            return
        }

        const userLogin = JSON.parse(localStorage.getItem("user_login")) || null;
        if (!userLogin) {
            messageApi.open({
                type: 'error',
                content: 'Not logged in!',
            });
        } else {
            // messageApi.open({
            //     type: 'success',
            //     content: 'Ready to buy!',
            // });
            const data = { account_id: account?.id, quantity, variation_id: selectVariation.id };
            try {
                const result = await instanceAxios.post(`/carts/create`, data)
                console.log("==>> :: ", result);
                if (result.data.statusCode === 201) {
                    message.success("Add to cart");
                    dispatch(getCart(account.id))
                    // window.location.reload();
                }
            } catch (error) {
                console.log(error);
                message.error(error.response.data.message)
            }
        }
    };

    const handleClickProduct = (product) => {
        localStorage.setItem("choose_product", JSON.stringify(product));
        getRecommendProduct(product.id)
        navigate('/product-detail')
    }

    const getReviews = async () => {
        const result = await instanceAxios.get(`/evaluations/reviews/${product.id}`)
        if (result.data.statusCode === 200) {
            // console.log("review cho priduct :::", result.data.data);
            setReviews(result.data.data)
        } else {
            message.error("Error get reviews");
        }
    }

    const handleClickWriteReviews = () => {
        if (!account.id) {
            message.error("Login to reviews")
        } else {
            navigate('/reviews/new')
        }
    }

    const getRecommendProduct = async () => {
        try {
            const result = await axios.get(`http://localhost:3006/recommend/${product.id}`)
            if (result.data.statusCode === 200) {
                console.log("reuslt:: ", result.data.data);
                setRecommendProduct(result.data.data)
            }
        } catch (error) {
            console.log("==>> :: ", error);
        }
    }

    const getRatingProduct = async () => {
        try {
            const result = await axios.get(`http://localhost:3003/evaluations/stars/${product.id}`)
            if (result.data.statusCode === 200) {
                console.log("reuslt:: ", result.data.data);
                setRatingProduct(result.data.data)
            }
        } catch (error) {
            console.log("==>> :: ", error);
        }
    }

    useEffect(() => {
        getReviews()
        getRatingProduct()
        getRecommendProduct()
    }, [])

    // console.log(reviews);
    // console.log(product);
    let tbStar = 0
    if (ratingProduct.length > 0) {
        tbStar = ratingProduct.reduce((total, item) => total += item.star, 0) / ratingProduct.length
        tbStar = Math.ceil(tbStar)
    }
    console.log(tbStar);

    return (
        <>
            {contextHolder}
            <main className="mx-[124px] mb-[88px]">
                <div className="mt-[15px] mb-[52px] flex gap-2 font-normal text-[12px] uppercase">
                    <Link className="underline">Uniqlo</Link>
                    <span>/</span>
                    <Link className="underline">{product.category.name}</Link>
                    <span>/</span>
                    <span className="underline">{product.brand.name}</span>
                    <span>/</span>
                    <Link>{product.name}</Link>
                </div>
                <section className="flex gap-10 mb-[40px]">
                    <div className="flex flex-1 flex-col gap-[88px]">
                        <article className=" flex w-full gap-6">
                            <div className="w-[20%]">
                                <div className="grid grid-cols-2 gap-4">
                                    {images.map((img, index) => (
                                        <img
                                            key={index}
                                            className={`object-cover w-full min-h-[50px] max-h-[50px] rounded ${index === currentIndex ? "img-active" : ""
                                                }`}
                                            src={img}
                                            alt=""
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="w-[70%]">
                                <div className="w-full h-[520px] relative flex flex-col gap-2">
                                    <div
                                        className="w-full h-full image-main rounded-lg"
                                        style={{
                                            backgroundImage: `url(${images[currentIndex]})`,
                                            backgroundRepeat: "no-repeat",
                                            backgroundSize: "100% 100%",
                                        }}
                                    >
                                        <button
                                            className="carousel-button carousel-button-prev"
                                            onClick={handlePrevImage}
                                        >
                                            <ArrowBackIosIcon />
                                        </button>
                                        <button
                                            className="carousel-button carousel-button-next"
                                            onClick={handleNextImage}
                                        >
                                            <ArrowForwardIosIcon />
                                        </button>
                                    </div>
                                    <div>
                                        {currentIndex + 1} / {images.length}
                                    </div>
                                </div>
                                <div className="mt-5 flex flex-col gap-4">
                                    <div className="flex justify-between">
                                        <h1 className="text-[20px]">Describe</h1>
                                        <div className="flex flex-col text-[#7d7d7d]">
                                            <span>SKU:</span>
                                            <span>459793</span>
                                        </div>
                                    </div>
                                    <div className="border-b"></div>
                                    <div className="flex justify-between">
                                        <h1 className="text-[20px]">Description</h1>
                                        <div className="flex flex-col text-[#7d7d7d]">
                                            {showOverview ? (
                                                <>
                                                    <ExpandMoreIcon
                                                        onClick={() => setShowOverview(!showOverview)}
                                                        className="cursor-pointer transition-all"
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <KeyboardArrowUpIcon
                                                        onClick={() => setShowOverview(!showOverview)}
                                                        className="cursor-pointer transition-all"
                                                    />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    {showOverview && (
                                        <div>
                                            <pre style={{ whiteSpace: "pre-wrap" }}>
                                                {product.description}
                                            </pre>
                                        </div>
                                    )}
                                    <div className="border-b"></div>
                                    <div className="flex justify-between">
                                        <h1 className="text-[20px]">Specifications</h1>
                                        <div className="flex flex-col text-[#7d7d7d]">
                                            {showMaterial ? (
                                                <>
                                                    <ExpandMoreIcon
                                                        onClick={() => setShowMaterial(!showMaterial)}
                                                        className="cursor-pointer transition-all"
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <KeyboardArrowUpIcon
                                                        onClick={() => setShowMaterial(!showMaterial)}
                                                        className="cursor-pointer transition-all"
                                                    />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    {showMaterial && (
                                        <div>
                                            <pre style={{ whiteSpace: "pre-wrap" }}>
                                                {product.specifications}
                                            </pre>
                                        </div>
                                    )}
                                    <div className="border-b"></div>
                                    <div className="flex justify-between">
                                        <h1 className="text-[20px]">Return policy</h1>
                                        <div className="flex flex-col text-[#7d7d7d]">
                                            <Link>
                                                <ArrowForwardIosIcon style={{ fontSize: 20 }} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                        <article className="">
                            <div className="flex items-center gap-[20px]">
                                <h1 className="text-[20px] uppercase text-[#1b1b1b] font-bold">
                                    Reviews
                                </h1>
                                {/* o day */}
                                <Rate allowHalf disabled value={parseInt(tbStar)} /> ({ratingProduct.length})
                            </div>
                            <div className="border-b mt-5 mb-9"></div>
                            {/* <div className="flex justify-between">
                                <div className="w-[30%]">
                                    <h1 className="text-[20px] mb-4 uppercase font-bold break-words">
                                        CUSTOMER REVIEWS
                                    </h1>
                                    <ul className="flex flex-col gap-5">
                                        <li className="flex items-center gap-2">
                                            <Rate allowHalf disabled defaultValue={5} />
                                            <span>({reviews.filter(item => item.star === 5).length})</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Rate allowHalf disabled defaultValue={4} />
                                            <span>(10)</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Rate allowHalf disabled defaultValue={3} />
                                            <span>(5)</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Rate allowHalf disabled defaultValue={2} />
                                            <span>(1)</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Rate allowHalf disabled defaultValue={0} />
                                            <span>(0)</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="w-[60%]">
                                    <h1 className="text-[20px] uppercase font-bold break-words mb-4">
                                        Is clothes tight?
                                    </h1>
                                    <ul className="w-full flex mb-7 justify-between">
                                        <li className="text-[15px] font-bold uppercase">Tight</li>
                                        <li className="text-[15px] font-bold uppercase w-[70px] text-center">
                                            True to size
                                        </li>
                                        <li className="text-[15px] font-bold uppercase">Wide</li>
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
                                </div>
                            </div> */}
                            <div className="mt-[20px] mb-[20px]">

                                <button
                                    className="h-[45px] text-[16px] uppercase font-bold hover:opacity-70 border border-[#7d7d7d] w-[288px] py-2 px-1"
                                    onClick={() => handleClickWriteReviews()}
                                >
                                    Write reviews
                                </button>

                            </div>
                            <div className="border-b"></div>
                            <div className="my-[20px] font-semibold">{reviews.length} comments</div>
                            <div className="border-b mb-10"></div>
                            <ul>
                                {reviews
                                    .slice(0, 4)
                                    .map(item => (
                                        <li key={item.id}>
                                            <div className="flex justify-between items-center mt-7 mb-4">
                                                <h3 className="uppercase text-[20px] font-bold">
                                                    {item.account.name}
                                                </h3>
                                                <time className="text-[#7d7d7d] text-[14px]">
                                                    {formatDate(item.createdAt)}
                                                </time>
                                            </div>
                                            {/* <div className="mb-5">
                                            <Rate allowHalf defaultValue={5} />
                                        </div> */}
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
                                        <span className="text-[14px] text-[#7d7d7d]">
                                            Singapore
                                        </span>
                                    </div> */}
                                        </li>
                                    ))}
                                <div className="border-b"></div>

                                <div className="mt-[40px] mb-[20px]">
                                    <Link to="/reviews">
                                        <button className="h-[45px] text-[16px] uppercase font-bold hover:opacity-70 border border-[#7d7d7d] w-[288px] py-2 px-1">
                                            See more
                                        </button>
                                    </Link>
                                </div>
                            </ul>
                        </article>
                    </div>
                    <article className="flex-1">
                        <h1 className="text-[45px] text-[#1b1b1b] font-bold">
                            {product.name}
                        </h1>
                        <div className="pb-[50px] text-[42px] font-bold">$ {(product.price * (100 - product.discountPercentage) / 100).toFixed(2)}</div>
                        <p>
                            A combination of comfort and warmth in neck design.
                        </p>
                        <div className="my-5 border-b"></div>
                        <aside className="mb-5">
                            <div className="uppercase text-[14px] font-semibold">
                                <strong className="mr-1">Colors:</strong>
                                <span>{product.variations.length}</span>
                            </div>
                            <div className="flex gap-2 mt-[11px]">
                                {product.variations.map((variation) => (
                                    <div
                                        key={variation.id}
                                        className={`size-[45px] border`}
                                        style={{ backgroundColor: `${variation.color}`, cursor: "pointer", boxShadow: `${variation.id === selectVariation.id ? "1px 1px 1px 1px #333" : "none"}` }}
                                        onClick={() => handleClickColor(variation)}
                                    ></div>
                                ))}
                            </div>
                        </aside>
                        <aside>
                            {/* <div className="uppercase text-[14px] font-semibold flex items-center justify-between">
                                <div>
                                    <strong className="mr-1">Size:</strong>
                                    <span>FEMALE S</span>
                                </div>
                                <div className="flex items-center uppercase text-[14px] font-bold">
                                    <strong className="mr-1">
                                        <img
                                            height={24}
                                            width={24}
                                            src="https://tse4.mm.bing.net/th?id=OIP.BofAAsdNRyN-d3ikDZMsEQAAAA&pid=Api&P=0&h=180"
                                            alt=""
                                        />
                                    </strong>
                                    <Link className="underline">Select the size</Link>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-[11px] mb-5">
                                {SIZE.map((item, i) => (
                                    <div
                                        key={i}
                                        onClick={() => handleClickSize(item)}
                                        style={{ boxShadow: `${size === item ? "1px 1px 1px 1px #333" : "none"}` }}
                                        className={`size-[45px] border bg-white text-center leading-[45px]`}
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                            <div>
                                <button className="h-[45px] text-[16px] uppercase font-bold hover:opacity-70 border border-[#7d7d7d] w-full py-2 px-1">
                                    Size by height
                                </button>
                            </div> */}
                            <div className="mt-4">
                                <label htmlFor="" className="uppercase font-semibold">
                                    Quantity
                                </label>
                                <div className="w-[134px] mt-4 relative">
                                    <div className="border px-3 h-[45px] flex items-center justify-between">
                                        <span>{quantity}</span>
                                        <KeyboardArrowDownIcon
                                            id="icon-dropdown"
                                            onClick={() => setShowQuantity(!showQuantity)}
                                            className={`cursor-pointer hover:opacity-70 ${!showQuantity ? "dropdown-rote" : ""
                                                }`}
                                        />
                                    </div>
                                    {showQuantity && (
                                        <ul className="w-full border absolute bg-white z-20">
                                            {Array(3).fill().map((_, i) => (
                                                <li
                                                    key={i}
                                                    onClick={() => handleChangeQuantity(i + 1)}
                                                    className="p-3 cursor-pointer hover:bg-[#f6f6f6]">
                                                    {i + 1}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <p className="text-[14px] text-[#7d7d7d] mt-1">Stocking</p>
                            </div>
                            <div className="mt-[28px] mb-[20px]">
                                <button
                                    className="h-[45px] text-[16px] bg-[#ff0000] text-white uppercase font-bold hover:opacity-85 w-full py-2 px-1"
                                    onClick={handleAddToCart}
                                >
                                    Add to cart
                                </button>
                            </div>
                            {/* <div className="flex gap-6">
                                <button className="flex-1 text-[16px] uppercase font-bold hover:opacity-70 border border-[#7d7d7d] w-[288px] py-2 px-1">
                                Add the desired list
                                </button>
                                <button className="flex-1 text-[16px] uppercase font-bold hover:opacity-70 border border-[#7d7d7d] w-[288px] py-2 px-1">
                                    Tìm sản phẩm còn hàng trong giỏ hàng
                                </button>
                            </div> */}
                            <div className="border-b my-5"></div>
                            <div className="text-[16px] uppercase font-bold">SHARE</div>
                            <div className="flex items-center gap-6 mt-3">
                                <img
                                    height={45}
                                    width={45}
                                    src="https://tse4.mm.bing.net/th?id=OIP.H836RvDYYgQZcZn0TC8qBAHaHa&pid=Api&P=0&h=180"
                                    alt=""
                                />
                                <img
                                    height={45}
                                    width={45}
                                    src="https://cdn.freebiesupply.com/logos/large/2x/facebook-4-logo-png-transparent.png"
                                    alt=""
                                />
                            </div>
                        </aside>
                    </article>
                </section>

                <section className="mt-[50px]">
                    <h1 className="font-semibold text-[34px] uppercase">
                        Product suggested
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
                                    recommendProduct.map((item) => {
                                        const product = products.find(el => el.id === item.id)
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
                                                        {product?.variations.map((variation) => (
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
