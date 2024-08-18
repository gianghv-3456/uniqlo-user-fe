import { useState } from "react";
import { Breadcrumb, Rate, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import instanceAxios from "../../../configs/axios";
import { getWishlists } from "../../../redux/slices/wishlist"

export default function Collection() {
    // const [tab, setTab] = useState(1);
    const [showOption, setShowOption] = useState(false);
    const [typeSort, setTypeSort] = useState({
        id: 1,
        type: "Featured",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const categories = useSelector(state => state.category.data);
    const [selectCategory, setSelectCategory] = useState(categories[0] || null);
    const products = useSelector(state => state.product.data);
    const account = useSelector(state => state.account.data);
    const wishlist = useSelector(state => state.wishlist.data);

    // const [productShow, setProductShow] = useState(products.filter(e => e.category.id === selectCategory.id));
    const [selectBrandId, setSelectBrandId] = useState(0);
    let productShow = products.filter(e => e.category.id === selectCategory.id);
    if (selectBrandId === 0) {
        productShow = products.filter(e => e.category.id === selectCategory.id);
    } else {
        productShow = productShow.filter(e => e.brand.id === selectBrandId);
    }

    // Tiêu chí sắp xếp dữ liệu
    const typeSorts = [
        {
            id: 1,
            type: "Featured",
        },
        {
            id: 2,
            type: "New arrivals",
        },
        {
            id: 3,
            type: "Low to hight",
        },
        {
            id: 4,
            type: "Hight to low",
        },
        {
            id: 5,
            type: "Top rated",
        },
    ];

    // Thay đổi tab active
    const handleActive = (category) => {
        // setTab(category.id);
        setSelectCategory(category);
        setSelectBrandId(0);
        // setProductShow(newRealProducts.slice(0, 12) || []);
    };

    // Thay đổi tiêu chí sắp xếp
    const changeTypeSort = (type) => {
        setTypeSort(type);
        setShowOption(false);
    };

    // const handleLoadMore = () => {
    //     if (productShow.length < products.length) {
    //         // setProductShow([...productShow.concat(products.slice(productShow.length, productShow.length + 8))]);
    //     }
    // }

    const handleClickProduct = (product) => {
        localStorage.setItem("choose_product", JSON.stringify(product));
        navigate('/product-detail')
    }

    const handleClickType = (id) => {
        setSelectBrandId(id);
    }

    const handleChangeWishlist = async (productId) => {
        const data = { accountId: account?.id, productId }
        if (data.accountId) {
            try {
                const result = await instanceAxios.put(`/accounts/change-wishlists`, { accountId: account.id, productId })
                dispatch(getWishlists(account.id))
            } catch (error) {
                console.log(error);
            }
        } else {
            message.error("Login")
        }
    }


    return (
        <>
            <main className="mx-[124px] mb-[88px]">
                <section className="mt-[15px] mb-[52px]">
                    <Breadcrumb
                        className="w-full"
                        items={[
                            {
                                title: (
                                    <Link to="/" className="uppercase">
                                        Uniqlo HomePage
                                    </Link>
                                ),
                            },
                            {
                                title: <span className="uppercase">Collection</span>,
                            },
                        ]}
                    />
                </section>
                <h2 className="text-[36px] uppercase font-bold mb-[16px]">
                    Collection
                </h2>
                <nav className="flex w-full">
                    {categories.map((t) => (
                        <div
                            key={t.id}
                            onClick={() => handleActive(t)}
                            className={`text-[#ababab] hover:text-[#1b1b1b] cursor-pointer flex-1 text-center 
                            text-[18px] uppercase font-bold p-4 ${selectCategory.id === t.id ? "tab-active" : ""
                                }`}
                        >
                            {t.name}
                        </div>
                    ))}
                </nav>

                {/* Thanh chức năng sắp xếp sản phẩm và hiển thị số lượng bản ghi */}
                <section className="flex items-center justify-between mt-4">
                    <div className="flex flex-col gap-[14px]">
                        <span className="text-[14px] uppercase font-bold">Results</span>
                        <span>{productShow.length} items</span>
                    </div>
                    <div className="flex flex-col gap-[14px] mb-[40px]">
                        <span className="text-[14px] uppercase font-bold">Sort by</span>
                        <div className="w-[214px] h-[45px] border relative">
                            <div className="flex items-center justify-between h-full">
                                <span className="pl-[15px]">{typeSort?.type}</span>
                                <ExpandMoreIcon
                                    id="icon-dropdown"
                                    onClick={() => setShowOption(!showOption)}
                                    className={`text-[24px] mr-2 text-[#ababab] cursor-pointer hover:text-[#8c8b8b] ${!showOption ? "dropdown-rote" : ""
                                        }`}
                                    style={{ fontSize: 28 }}
                                />
                            </div>
                            {showOption && (
                                <ul className="absolute top-[44px] border w-full z-30 bg-white">
                                    {typeSorts.map((t) => (
                                        <li
                                            key={t.id}
                                            onClick={() => changeTypeSort(t)}
                                            className={`p-[12px] text-[14px] hover:bg-[#f6f6f6] hover:text-[#378694] cursor-pointer transition-all ${typeSort.id === t.id ? "sort-active" : ""
                                                }`}
                                        >
                                            {t.type}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </section>

                {/* Danh sách sản phẩm đã lọc */}
                <section className="flex gap-5 bg-white z-[10000]">
                    <article className="flex-1 sticky top-[100px] flex flex-col h-screen">
                        {/* <h2 className="text-[32px] uppercase text-[#8c8b8b] font-bold mb-5">
                            Kids
                        </h2> */}
                        <ul className="flex flex-col gap-3">
                            <li className="flex justify-between items-center"
                                onClick={() => handleClickType(0)}
                            >
                                <span className="text-[16px] uppercase text-[#8c8b8b] brand-select">
                                    All
                                </span>
                                {/* <ExpandMoreIcon
                                    className={`text-[24px] mr-2 text-[#ababab] cursor-pointer hover:text-[#8c8b8b] `}
                                    style={{ fontSize: 28 }}
                                /> */}
                            </li>
                            {selectCategory &&
                                selectCategory.brands.map((brand) => (
                                    <li key={brand.id} className="flex justify-between items-center"
                                        onClick={() => handleClickType(brand.id)}
                                    >
                                        <span className="text-[16px] uppercase text-[#8c8b8b] brand-select">
                                            {brand.name}
                                        </span>
                                        {/* <ExpandMoreIcon
                                            className={`text-[24px] mr-2 text-[#ababab] cursor-pointer hover:text-[#8c8b8b] `}
                                            style={{ fontSize: 28 }}
                                        /> */}
                                    </li>
                                ))
                            }
                        </ul>
                        <div className="border-b my-6"></div>
                        <ul className="flex flex-col gap-3">
                            {/* <li className="flex justify-between items-center">
                                <span className="text-[16px] text-[#8c8b8b]">Size</span>
                                <ExpandMoreIcon
                                    className={`text-[24px] mr-2 text-[#ababab] cursor-pointer hover:text-[#8c8b8b] `}
                                    style={{ fontSize: 28 }}
                                />
                            </li> */}
                            <li className="flex justify-between items-center">
                                <span className="text-[16px] text-[#8c8b8b]">Color</span>
                                <ExpandMoreIcon
                                    className={`text-[24px] mr-2 text-[#ababab] cursor-pointer hover:text-[#8c8b8b] `}
                                    style={{ fontSize: 28 }}
                                />
                            </li>
                            <li className="flex justify-between items-center">
                                <span className="text-[16px] text-[#8c8b8b]">Price</span>
                                <ExpandMoreIcon
                                    className={`text-[24px] mr-2 text-[#ababab] cursor-pointer hover:text-[#8c8b8b] `}
                                    style={{ fontSize: 28 }}
                                />
                            </li>
                            <li className="flex justify-between items-center">
                                <span className="text-[16px] text-[#8c8b8b]">
                                    Additional Criteria
                                </span>
                                <ExpandMoreIcon
                                    className={`text-[24px] mr-2 text-[#ababab] cursor-pointer hover:text-[#8c8b8b] `}
                                    style={{ fontSize: 28 }}
                                />
                            </li>
                        </ul>
                    </article>
                    <main style={{ flex: 3 }} className="">
                        <ul className="w-full grid grid-cols-4 gap-5">
                            {productShow.map((product) => (
                                <div
                                    key={product.id}
                                >
                                    <div className="relative">
                                        <img
                                            src={product.defaultImage}
                                            alt=""
                                        />
                                        <FavoriteBorderIcon
                                            className={`absolute top-[10px] right-[10px] cursor-pointer ${wishlist.some(item => item.product_id === product.id) ? "text-red-500" : ""}`}
                                            onClick={() => handleChangeWishlist(product.id)}
                                        />
                                    </div>
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
                                    <h2 className="text-[14px] uppercase mb-5 text-[#ababab] font-bold" style={{ height: 42, cursor: "pointer" }}
                                        onClick={() => handleClickProduct(product)}
                                    >
                                        {product.name}
                                    </h2>
                                    <p className="text-[#7d7d7d] mb-1">{product.brand.name}</p>
                                    {product.discountPercentage == 0 ?
                                        <span className="text-[#8c8b8b] uppercase font-bold text-[22px]" style={{ textAlign: "left" }}>
                                            ${product.price}
                                        </span>
                                        :
                                        <span className="text-[#8c8b8b] uppercase font-bold text-[22px] text-red-500" style={{ opacity: 1 }}>
                                            ${(product.price * (100 - product.discountPercentage) / 100).toFixed(2)}
                                            <span style={{ fontSize: 14 }}> (sale) </span>
                                        </span>
                                    }
                                    <p>
                                        <Rate allowHalf disabled defaultValue={parseInt(product.averageRating)}
                                            style={{ fontSize: 16 }}
                                        />
                                        {" "}({product.numberRating})
                                    </p>
                                </div>
                            ))}
                        </ul>
                        <div className="border-b my-6"></div>
                        {/* {productShow.length < products.length &&
                            <div className="flex items-center gap-2 justify-center cursor-pointer hover:text-[#8c8b8b]"
                                onClick={handleLoadMore}
                            >
                                <span className="text-[16px] uppercase font-bold">Load more</span>
                                <ExpandMoreIcon
                                    className={`text-[24px] mr-2 text-[#ababab] cursor-pointer`}
                                    style={{ fontSize: 28 }}
                                />
                            </div>
                        } */}
                    </main>
                </section>
            </main>
        </>
    );
}
