import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import PublicRouter from "./routes/PublicRouter";
import HomePage from "./pages/client/home";
import BackToTop from "./components/backtop";
import Login from "./pages/auth/login/index";
import Register from "./pages/auth/register";
import Cart from "./pages/client/cart";
import ProductDetail from "./pages/client/productDetail";
import Wishlist from "./pages/client/wishlist";
import Checkout from "./pages/client/checkout";
import Member from "./pages/client/member";
import MemberDetail from "./pages/client/member/detail";
import EditProfile from "./pages/client/member/edit";
import MemberAddress from "./pages/client/member/address";
import MemberChangePassword from "./pages/client/member/change-password";
import Order from "./pages/client/member/order";
import PurchaseHistory from "./pages/client/member/purchase-history";
import CouponWallet from "./pages/client/member/coupon-wallet";
import Collection from "./pages/client/collections";
import Reviews from "./pages/client/review";
import CreateReview from "./pages/client/review/CreateReview";
import ReviewIndex from "./pages/client/review";
import ListReview from "./pages/client/review/ListReview";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "./redux/slices/category";
import { getBrands } from "./redux/slices/brand";
import { getProducts } from "./redux/slices/products";
import { getCart } from "./redux/slices/cart";
import { getWishlists } from "./redux/slices/wishlist";

export default function App() {
    const location = useLocation();
    const account = useSelector(state => state.account.data);

    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [location.pathname]);

    useEffect(() => {
        dispatch(getCategories())
        dispatch(getBrands())
        dispatch(getProducts())
        dispatch(getCart(account?.id))
        dispatch(getWishlists(account?.id))
    }, [])

    return (
        <>
            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="/" element={<PublicRouter />}>
                    <Route index element={<HomePage />} />
                    <Route path="register" element={<Register />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="product-detail" element={<ProductDetail />} />
                    <Route path="wishlist" element={<Wishlist />} />
                    <Route path="checkout" element={<Checkout />} />
                    {/* Route members */}
                    <Route path="/member" element={<Member />}>
                        <Route index element={<MemberDetail />} />
                        <Route path="edit" element={<EditProfile />} />
                        <Route path="address" element={<MemberAddress />} />
                        <Route path="change-password" element={<MemberChangePassword />} />\
                        <Route path="orders" element={<Order />} />
                        <Route path="purchase/history" element={<PurchaseHistory />} />
                        <Route path="coupon-wallet" element={<CouponWallet />} />
                        <Route />
                        <Route />
                    </Route>
                    <Route path="/collection" element={<Collection />} />
                    <Route path="/reviews" element={<ReviewIndex />}>
                        <Route index element={<ListReview />} />
                        <Route path="new" element={<CreateReview />} />
                    </Route>
                </Route>
            </Routes>
            <BackToTop />
        </>
    );
}
