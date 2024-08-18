import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function MemberDetail() {

    const account = useSelector(state => state.account.data) || {};

    return (
        <>
            <main className="border px-5 py-7">
                <h3 className="text-[31px] uppercase font-bold mb-7">Profile</h3>
                <div className="flex flex-col gap-5">
                    <div className="grid grid-cols-2">
                        <div>
                            <label className="font-bold uppercase text-[20px]">
                                Emaill
                            </label>
                            <p>{account?.email}</p>
                        </div>
                        <div>
                            <label className="font-bold uppercase text-[20px]">
                                Phone
                            </label>
                            <p>{account?.phone}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2">
                        <div>
                            <label className="font-bold uppercase text-[20px]">Name</label>
                            <p>{account?.name}</p>
                        </div>
                        <div>
                            <label className="font-bold uppercase text-[20px]">Gender</label>
                            <p>{account?.gender}</p>

                        </div>
                    </div>
                    <div className="grid grid-cols-2">
                        <div>
                            <label className="font-bold uppercase text-[20px]">Birthday</label>
                            <p>{account?.birthday}</p>
                        </div>
                        <div>
                            <label className="font-bold uppercase text-[20px]">
                                Image
                            </label>
                            <p>
                                <img width={50} src={account?.imagePath} alt="" />
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
