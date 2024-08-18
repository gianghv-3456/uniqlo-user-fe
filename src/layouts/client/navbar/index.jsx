import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Logo from "../../../../public/images/logo-header.svg";
import { Link, useNavigate } from "react-router-dom";
import { Input, Dropdown } from "antd";
import { CloseSharp, SearchOutlined, Spa } from "@mui/icons-material";
import ModalMain from "../../../components/modal/ModalMain";
import { Tooltip, Badge } from "antd";
import Categories from "../../../components/categories";
import "./index.css";
import { useSelector } from "react-redux";

export default function Navbar() {
    const navigate = useNavigate();
    const [showInput, setShowInput] = useState(false);
    const [showModalLogin, setShowModalLogin] = useState(false);
    const [showCategory, setShowCategory] = useState(false);
    const [showModalLogout, setShowModalLogout] = useState(false);
    // console.log(showModalLogout);
    const isLogin = useSelector(state => state.account.data);

    const categories = useSelector(state => state.category.data);
    const products = useSelector(state => state.product.data);
    const cart = useSelector(state => state.cart.data);
    const wishlist = useSelector(state => state.wishlist.data)

    const [productSearch, setProductSearch] = useState([]);
    /**
     * Kiểm tra đăng nhập và chuyển hướng
     */
    const handleRedirect = () => {
        if (isLogin) {
            navigate("/wishlist");
        } else {
            setShowModalLogin(true);
        }
    };

    const handleOpenCategories = (id) => {
        setShowCategory(true);
    };

    const handleCloseModal = () => {
        setShowModalLogin(false);
    };

    const handleCloseCategories = (e) => {
        if (e.clientY > 80) {
            setShowCategory(true);
        } else {
            setShowCategory(false);
        }
    };

    const items = [
        {
            key: "1",
            label: <Link to="/member">Account</Link>,
        },
        // {
        //     key: "2",
        //     label: <Link to="/member/coupon-wallet">Phiếu giảm giá</Link>,
        // },
        // {
        //     key: "3",
        //     label: <Link to="/member/purchase/history">Lịch sử mua hàng</Link>,
        // },
        {
            key: "4",
            label: <Link to="/member/orders">Orders</Link>,
        },
        {
            key: "6",
            label: <Link to="/wishlist">Wishlist</Link>,
        },
        {
            key: "7",
            label: <span onClick={() => setShowModalLogout(true)}>Logout</span>,
        },
    ];

    const changeTextSearch = (textSearch) => {
        if (!textSearch) {
            setProductSearch([])
        } else {
            let productFilter = products.filter(el => el.name.toLowerCase().includes(textSearch.toLowerCase()))
            productFilter = productFilter.splice(0, 6)
            setProductSearch(productFilter)
        }
    }

    const handleClickProduct = (product) => {
        localStorage.setItem("choose_product", JSON.stringify(product));
        navigate('/product-detail')
    }

    return (
        <>
            {showModalLogin && <ModalMain close={handleCloseModal} />}
            {showModalLogout && (
                <ModalMain
                    title="Confirm Logout"
                    content="Are you sure you want to log out."
                    close={handleCloseModal}
                />
            )}
            <nav className="sticky top-0 z-40 w-full h-[72px] bg-white py-0 border-b border-solid border-b-[rgb(204, 204, 204)]">
                {showInput ? (
                    <>
                        <div className="absolute h-full w-full gap-3 flex items-center justify-center relative">
                            <div className="flex w-[50%] items-center">
                                <Input
                                    className="h-[40px] rounded-r-none"
                                    placeholder="Search by keyword"
                                    onChange={(e) => changeTextSearch(e.target.value)}
                                />
                                <Tooltip title="Search">
                                    <div className="h-10 flex items-center border px-2 bg-black rounded-r-[4px] text-white">
                                        <SearchOutlined className="cursor-pointer" />
                                    </div>
                                </Tooltip>
                            </div>
                            <Tooltip onClick={() => { setShowInput(false), setProductSearch([]) }} title="Close">
                                <CloseSharp className="cursor-pointer hover:text-gray-800" />
                            </Tooltip>

                            {/* code them */}
                            <div className="recommend-search">
                                {productSearch.map((product) => (
                                    <div key={product.id} style={{ display: "flex", alignItems: "center", margin: "4px 0", justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', gap: 12, alignItems: "center" }}>
                                            <div>
                                                <img width={50} src={product.defaultImage} alt="" />
                                            </div>
                                            <div className="text-[14px] uppercase  text-[#ababab] font-bold flex justify-between items-center" >
                                                <span className="">{product.category.name}</span>
                                                {/* <p>5Y(110)-14Y(160)</p> */}
                                            </div>
                                            <p className="text-[#7d7d7d] ">{product.brand.name}</p>
                                            <h2 className="text-[14px] uppercase  text-[#ababab] font-bold" style={{ cursor: "pointer" }}
                                                onClick={() => handleClickProduct(product)}
                                            >
                                                {product.name}
                                            </h2>
                                        </div>
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
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="py-0 px-5 my-0 mx-[124px] h-full flex justify-between items-center">
                            <div className="flex items-center gap-5">
                                <Link to="/" className="mr-[28px]">
                                    <img src={Logo} alt="Logo" />
                                </Link>
                                <ul className="flex gap-8" onMouseLeave={handleCloseCategories}>
                                    {categories.map((cat) => (
                                        <Link
                                            to="/collection"
                                            onMouseEnter={() => handleOpenCategories(cat.id)}
                                            key={cat.id}
                                            className="relative"
                                        >
                                            <span className="uppercase text-[#8c8b8b] font-semibold hover:text-[#424242] cursor-pointer">
                                                {cat.name}
                                            </span>
                                            {showCategory && <Categories />}
                                        </Link>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex items-center gap-8">
                                <Tooltip title="Search">
                                    <SearchIcon
                                        onClick={() => setShowInput(true)}
                                        className="cursor-pointer text-[24px]"
                                    />
                                </Tooltip>
                                {isLogin ? (
                                    <>
                                        <Dropdown
                                            placement="bottomRight"
                                            menu={{
                                                items,
                                            }}
                                        >

                                            <Badge dot>
                                                <a onClick={(e) => e.preventDefault()}>
                                                    <PersonIcon className="cursor-pointer text-[24px]" />
                                                </a>
                                            </Badge>
                                        </Dropdown>
                                    </>
                                ) : (
                                    <>
                                        <Tooltip title="Login">
                                            <Link to="/login">
                                                <PersonIcon className="cursor-pointer text-[24px]" />
                                            </Link>
                                        </Tooltip>
                                    </>
                                )}
                                <Tooltip title="Wishlist">
                                    <div onClick={handleRedirect} className="relative">
                                        <FavoriteBorderIcon className="cursor-pointer text-[24px]" />
                                        <span className="absolute px-2 py-0 rounded-full top-[-3px] right-[-18px] text-[10px] bg-[#EB3333] text-white font-semibold">
                                            {wishlist.length}
                                        </span>
                                    </div>
                                </Tooltip>
                                <Tooltip title="Cart">
                                    <Link to="/cart" className="relative">
                                        <ShoppingCartIcon className="cursor-pointer text-[24px]" />
                                        <span className="absolute px-2 py-0 rounded-full top-[-3px] right-[-18px] text-[10px] bg-[#EB3333] text-white font-semibold">
                                            {cart.length}
                                        </span>
                                    </Link>
                                </Tooltip>
                            </div>
                        </div>
                    </>
                )}
            </nav>
        </>
    );
}
