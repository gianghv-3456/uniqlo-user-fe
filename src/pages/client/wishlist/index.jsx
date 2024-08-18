import { Breadcrumb } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CancelIcon from '@mui/icons-material/Cancel';
import { useDispatch, useSelector } from "react-redux";
import instanceAxios from "../../../configs/axios";
import { getWishlists } from "../../../redux/slices/wishlist";

export default function Wishlist() {

    const account = useSelector(state => state.account.data)
    const products = useSelector(state => state.product.data)
    const wishlists = useSelector(state => state.wishlist.data)

    const dispatch = useDispatch()

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
            <div className="mx-[124px] mb-[88px]">
                <Breadcrumb
                    className="mt-[15px] mb-[52px] text-[12px]"
                    items={[
                        {
                            title: (
                                <Link to="/" className="uppercase">
                                    Uniqlo
                                </Link>
                            ),
                        },
                        {
                            title: <p className="uppercase">Wishlist</p>,
                        },
                    ]}
                />
                <h3 className="font-semibold uppercase text-[34px] mb-[52px]">
                    Wishlist
                </h3>
                <main className="px-5 py-7 border shadow">
                    <p className="mb-7">{wishlists.length} product</p>
                    {
                        wishlists.map((item) => {
                            const product = products.find(p => p.id === item.product_id)
                            // console.log(product);
                            return (
                                <div key={item.id}>
                                    <div className="flex gap-5">
                                        <div className="w-[219px] h-[219px] relative">
                                            <img
                                                className="object-cover w-full h-full"
                                                src={product.defaultImage}
                                                alt=""
                                            />
                                            {/* {isTym ? (
                                                <>
                                                    <FavoriteIcon
                                                        onClick={() => setIsTym(false)}
                                                        className="absolute top-3 right-3 cursor-pointer text-[#f00]"
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <FavoriteBorderIcon
                                                        onClick={() => setIsTym(true)}
                                                        className="absolute top-3 right-3 cursor-pointer text-[#f00]"
                                                    />
                                                </>
                                            )} */}
                                            <>
                                                <CancelIcon
                                                    className="absolute top-3 right-3 cursor-pointer text-[#f00]"
                                                    onClick={() => handleChangeWishlist(product.id)}
                                                />
                                            </>
                                        </div>
                                        <div>
                                            <Link
                                                to="/product-detail/1"
                                                className="text-[18px] uppercase font-semibold"
                                            >
                                                {product.name}
                                            </Link>
                                            <div className="text-[16px] flex flex-col gap-2 my-5">
                                                <p className="text-[#7d7d7d]">Mã sản phẩm: 465760</p>
                                                <p>
                                                    Colors:
                                                    {product.variations.map((v) => (
                                                        <span
                                                            key={v.is}
                                                            style={{
                                                                display: "inline-block",
                                                                width: 16, height: 16,
                                                                backgroundColor: `${v.color}`,
                                                                margin: "0 4px",
                                                                border: "1px solid #999",
                                                            }}
                                                        >
                                                        </span>
                                                    ))}
                                                </p>
                                                <p style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                    <span>{product.category.name}</span>
                                                    <span>{product.brand.name}</span>
                                                </p>
                                            </div>
                                            <strong className="text-[22px] font-semibold uppercase"
                                                style={{ color: `${product.discountPercentage > 0 ? `red` : ""}` }}
                                            >
                                                ${(product.price * (100 - product.discountPercentage) / 100).toFixed(2)}
                                                {" "}
                                                <span style={{ fontSize: 12 }}> {product.discountPercentage > 0 ? `(sale)` : ""}</span>
                                            </strong>
                                        </div>
                                    </div>
                                    <div className="border-b my-[28px]"></div>
                                </div>
                            )
                        })
                    }
                </main>
            </div>
        </>
    );
}
