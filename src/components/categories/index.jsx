import React from "react";
import { useSelector } from "react-redux";

export default function Categories() {

    const categories = useSelector(state => state.category.data);
    // const products = useSelector(state => state.category.data);

    return (
        <>
            <div
                style={{ maxHeight: "calc(100vh - 112px)" }}
                className={`fixed overflow-y-auto top-[112px] right-0 left-0 bottom-0 bg-white z-40 px-5 py-6`}
            >
                <div className="flex">
                    <div className="grid grid-cols-4 gap-5" style={{ flex: 3 }}>
                        {categories.map((category) => (
                            <ul key={category.id} className="flex gap-[13px] flex-col">
                                <h3 className="font-bold text-[16px] uppercase">{category.name}</h3>
                                {category.brands.map(brand => (
                                    <li key={brand.id} className="brand-select">{brand.name}</li>
                                ))}
                            </ul>
                        ))}
                    </div>
                    {/* <div className="flex-1 border-l px-6">
                        <ul className="flex flex-col gap-4">
                            <h3 className="font-bold text-[16px]">New</h3>
                            <li>Hàng mới về </li>
                            <li>Hàng mới về </li>
                            <li>Hàng mới về </li>
                            <li>Hàng mới về </li>
                            <li>Hàng mới về </li>
                            <li>Hàng mới về </li>
                            <li>Hàng mới về </li>
                        </ul>
                    </div> */}
                </div>
            </div>
        </>
    );
}
