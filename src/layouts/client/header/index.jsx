import React from "react";
import { Link } from "react-router-dom";

export default function Header() {

    return (
        <>
            <header className="w-full h-10 bg-[#f4f4f4]">
                <div className="py-0 px-5 my-0 mx-[124px] h-full flex justify-end items-center">
                    <ul className="flex items-center gap-4">
                        <Link to="/help">Help</Link>
                        <li>System</li>
                        <li className="flex items-center gap-2">
                            <div>English</div>
                            <div>|</div>
                            <div className="font-semibold">Tiếng Việt</div>
                        </li>
                    </ul>
                </div>
            </header>
        </>
    );
}
