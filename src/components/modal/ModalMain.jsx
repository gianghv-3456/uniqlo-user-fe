import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveAccount } from "../../redux/slices/account";

export default function ModalMain({ close, title, content }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(saveAccount(null));
        window.location.reload();
    }

    return (
        <>
            <div className="overlay">
                <div className="bg-white px-5 py-7 w-[636px]">
                    <header className="flex justify-between items-center mb-7">
                        <h1 className="text-[19px] uppercase font-bold">{title}</h1>
                        <div title="Đóng">
                            <CloseIcon
                                onClick={close}
                                className="cursor-pointer hover:text-gray-700"
                            />
                        </div>
                    </header>
                    <div className="mb-10">
                        <p className="text-[#1b1b1b] break-words text-[16px] font-normal">
                            {content}
                        </p>
                    </div>
                    <div className="w-[50%]">

                        <button onClick={handleLogout} className="w-full bg-[#1b1b1b] px-1 py-2 text-white uppercase">
                            Ok
                        </button>

                    </div>
                </div>
            </div>
        </>
    );
}
