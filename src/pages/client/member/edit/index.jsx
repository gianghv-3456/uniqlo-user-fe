import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../../../../common/upload"
import { useState } from "react";
import { message } from "antd";
import instanceAxios from "../../../../configs/axios";
import { saveNewDataAcocunt } from "../../../../redux/slices/account";

export default function EditProfile() {

    const account = useSelector(state => state.account.data);
    const [imageUrl, setImageUrl] = useState();
    const dispatch = useDispatch()
    const handleFileChange = async (e) => {
        const url = await uploadImage(e.target.files[0]);
        setImageUrl(url);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const values = {};
        for (let [name, value] of formData.entries()) {
            values[name] = value;
        }

        const data = { id: account.id, ...values, imagePath: imageUrl || account.imagePath };
        console.log(data);

        if (!data.name) {
            message.error("Name empty");
            return;
        }

        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email)) {
            message.error("Validate email");
            return;
        }

        if (!/^0[13579]\d{8}$/.test(data.phone)) {
            message.error("Validate phone");
            return;
        }

        if (!imageUrl && !account.imagePath) {
            message.error("Validate avatar");
            return;
        }

        try {
            const result = await instanceAxios.put('/accounts/update', data, {
                headers: {
                    Authorization: `Bearer ${account.accessToken}`
                }
            });
            console.log(result);
            if (result.data.statusCode === 200) {
                message.success(result.data.message)
                e.target.reset();
                dispatch(saveNewDataAcocunt(result.data.data));
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
            message.error(error.response.data.message)
        }
    }

    return (
        <>
            <main className="border px-5 py-7">
                <div className="flex justify-between items-center mb-7">
                    <h3 className="text-[31px] uppercase font-bold">
                        Edit profile
                    </h3>
                    <span className="text-[#378694]">required &#8277;</span>
                </div>
                <form className="flex flex-col gap-7" onSubmit={onSubmit}>
                    <div className="flex items-center">
                        <label
                            className="min-w-[250px] text-[18px] uppercase font-semibold"
                            htmlFor="name"
                        >
                            Name
                            <span className="text-[#378694] text-[16px]"> &#8277;</span>
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            className="login-input"
                            style={{ flex: 1 }}
                            defaultValue={account.name}
                        />
                    </div>
                    <div className="flex items-center">
                        <label
                            className="min-w-[250px] text-[18px] uppercase font-semibold"
                            htmlFor="email"
                        >
                            Email{" "}
                            <span className="text-[#378694] text-[16px]"> &#8277;</span>
                        </label>
                        <input id="email" name="email" type="email" className="login-input" style={{ flex: 1 }} defaultValue={account.email} />
                    </div>
                    <div className="flex items-center">
                        <label
                            className="min-w-[250px] text-[18px] uppercase font-semibold"
                            htmlFor="phone"
                        >
                            Phone
                            <span className="text-[#378694] text-[16px]"> &#8277;</span>
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            className="login-input"
                            style={{ flex: 1 }}
                            defaultValue={account.phone}
                        />
                    </div>
                    <div className="flex items-center">
                        <label
                            className="min-w-[250px] text-[18px] uppercase font-semibold"
                            htmlFor=""
                        >
                            Gender
                        </label>
                        <div className="flex-1 flex gap-[20px]">
                            <div className="flex items-center gap-2">
                                <input
                                    className="w-5 h-5 "
                                    type="radio"
                                    name="gender"
                                    id="male"
                                    value="male"
                                    defaultChecked={account.gender === "male"}
                                />
                                <label className="font-semibold" htmlFor="male">
                                    Male
                                </label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    className="w-5 h-5"
                                    type="radio"
                                    name="gender"
                                    id="female"
                                    value="female"
                                    defaultChecked={account.gender === "female"}
                                />
                                <label className="font-semibold" htmlFor="female">
                                    Female
                                </label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    className="w-5 h-5"
                                    type="radio"
                                    name="gender"
                                    id="other"
                                    value="other"
                                    defaultChecked={account.gender === "other"}
                                />
                                <label className="font-semibold" htmlFor="other">
                                    Other
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <label
                            className="min-w-[250px] text-[18px] uppercase font-semibold"
                            htmlFor="avatar"
                        >
                            Image
                            <span className="text-[#378694] text-[16px]"> &#8277;</span>
                        </label>
                        <input
                            id="avatar"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            // className="login-input"
                            style={{ flex: 1 }}
                            hidden
                        />
                        <img width={100} src={imageUrl || account?.imagePath} alt="" />
                    </div>
                    {/* <p className="w-[70%]">
                        Chúng tôi có thể liên hệ với bạn qua điện thoại hoặc email nếu chúng
                        tôi có thắc mắc về đơn đặt hàng và tùy chọn giao hàng của bạn.
                    </p> */}
                    <div>
                        <button class="w-[40%] h-[45px] bg-[#1b1b1b] text-white uppercase cursor-pointer text-[18px]">
                            Save
                        </button>
                    </div>
                </form>
            </main>
        </>
    );
}
