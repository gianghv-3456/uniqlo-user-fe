import React, { useState } from "react";
import { Link } from "react-router-dom";
import { message } from "antd";
import instanceAxios from "../../../../configs/axios";
import { useDispatch, useSelector } from "react-redux";
import { saveNewDataAcocunt } from "../../../../redux/slices/account"

export default function MemberChangePassword() {

    const dispatch = useDispatch()
    const account = useSelector(state => state.account.data) || {};

    const [typePassword, setTypepassword] = useState("password");

    const handleChangeTypePassword = () => {
        setTypepassword(typePassword === "password" ? "text" : "password");
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const values = {};
        for (let [name, value] of formData.entries()) {
            values[name] = value;
        }

        // console.log(values);
        const { oldPassword, newPassword, confirmPassword } = values;

        if (oldPassword.length < 6 || newPassword.length < 6) {
            message.error("Password is longer than 6 characters");
            return;
        }

        if (confirmPassword !== newPassword) {
            message.error("Confirm password");
            return;
        }

        try {
            const result = await instanceAxios.put('/accounts/change-password', { oldPassword, newPassword }, {
                headers: {
                    Authorization: `Bearer ${account.accessToken}`
                }
            });
            // console.log(result);
            if (result.data.statusCode === 200) {
                message.success(result.data.message)
                dispatch(saveNewDataAcocunt)
                e.target.reset();
            }
        } catch (error) {
            // console.log(error);
            message.error(error.response.data.message)
        }
    }
    return (
        <>
            <main className="px-5 py-7 border">
                <div className="flex justify-between items-center mb-7">
                    <h3 className="text-[31px] uppercase font-bold">
                        Change password
                    </h3>
                    <span className="text-[#378694]">required &#8277;</span>
                </div>
                <form className="flex flex-col gap-7" onSubmit={onSubmit}>
                    <div className="flex">
                        <label
                            className="min-w-[250px] text-[18px] uppercase font-semibold"
                            htmlFor=""
                        >
                            Password
                            <span className="text-[#378694] text-[16px]"> &#8277;</span>
                        </label>
                        <div className="" style={{ flex: 1 }}>
                            <input
                                name="oldPassword"
                                type={`${typePassword === "password" ? "password" : "text"}`}
                                className="login-input w-[60%]"
                            />
                        </div>
                    </div>
                    <div className="flex">
                        <label
                            className="min-w-[250px] text-[18px] uppercase font-semibold"
                            htmlFor=""
                        >
                            New password
                            <span className="text-[#378694] text-[16px]"> &#8277;</span>
                        </label>
                        <div className="" style={{ flex: 1 }}>
                            <input
                                name="newPassword"
                                type={`${typePassword === "password" ? "password" : "text"}`}
                                className="login-input w-[60%]"
                            />
                        </div>
                    </div>
                    <div className="flex">
                        <label
                            className="min-w-[250px] text-[18px] uppercase font-semibold"
                            htmlFor=""
                        >
                            Confirm Password
                            <span className="text-[#378694] text-[16px]"> &#8277;</span>
                        </label>
                        <div className="" style={{ flex: 1 }}>
                            <input
                                name="confirmPassword"
                                type={`${typePassword === "password" ? "password" : "text"}`}
                                className="login-input w-[60%]"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            id="show-password"
                            checked={typePassword === "text"}
                            onChange={handleChangeTypePassword}
                            type="checkbox"
                            className="h-4 w-4"
                        />
                        <label htmlFor="show-password">Show password</label>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <button class="w-[30%] h-[45px] bg-[#1b1b1b] text-white uppercase cursor-pointer text-[18px]">
                            Change
                        </button>

                        <Link className="text-[16px] uppercase underline font-bold mt-3">
                            Forgot password?
                        </Link>
                    </div>
                </form>
            </main>
        </>
    );
}
