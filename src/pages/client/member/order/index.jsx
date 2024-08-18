import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import instanceAxios from "../../../../configs/axios"

const STATUS = ['pending', 'deny', 'accept']

export default function Order() {

    const account = useSelector(state => state.account.data) || {}
    const [status, setStatus] = useState(STATUS[0]);
    const [orders, setOrders] = useState([])

    const getOrderById = async () => {
        try {
            const result = await instanceAxios.get(`/orders/${account?.id}`);
            console.log(result.data.data);
            if (result.data.statusCode === 200) {
                setOrders(result.data.data)
            }
        } catch (error) {
            console.log(result);
        }
    }

    const handleDeny = async (id) => {
        try {
            const result = await instanceAxios.post(`/orders/status`, { id, status: "user_deny" });
            if (result.data.statusCode === 200) {
                getOrderById()
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getOrderById()
    }, [])

    return (
        <>
            <h4>
                Orders:
                {STATUS.map((item, i) => (
                    <button
                        key={i}
                        style={{
                            border: '1px solid #333', margin: "0 12px",
                            minWidth: 100, boxShadow: `${status === item ? "1px 1px 1px 1px #999" : "none"}`
                        }}
                        onClick={() => setStatus(item)}
                    >{item}</button>
                ))}
            </h4>

            <br />

            <div className="table-content table-responsive" style={{ maxHeight: 700, overflowY: "scroll" }}>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="li-product-remove" >Receiver</th>
                            <th className="cart-product-name">Detail</th>
                            <th className="li-product-thumbnail">Note</th>
                            <th className="li-product-quantity">Total</th>
                            <th className="li-product-price">Date</th>
                            <th className="li-product-subtotal">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders
                            .filter(item => item.status.includes(status))
                            .sort((a, b) => new Date(a.date) - new Date(b.date))
                            .map(item => {
                                const date = new Date(item.date);
                                const formattedDateH =
                                    `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
                                const formattedDateD =
                                    `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                                let details = item.details;
                                details = details.map((item) => {
                                    return {
                                        ...item,
                                        variation: JSON.parse(item.variation)
                                    }
                                })
                                return (
                                    <tr key={item.id} style={{ borderBottom: "1px solid #333" }}>
                                        <td>
                                            <p
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "start",
                                                    fontWeight: 100,
                                                    fontSize: 14
                                                }}
                                            >
                                                <span> {item.name} </span>
                                                <span> {item.phone} </span>
                                                <span> {item.email} </span>
                                                <span
                                                    style={{ display: "inline-block", width: 100, wordWrap: "break-word", overflowWrap: "break-word" }}
                                                >
                                                    {item.address}
                                                </span>
                                            </p>
                                        </td>
                                        <td className="li-product-name" style={{ padding: 0 }}>
                                            <table>
                                                <tbody>
                                                    {details.map((detail) => (
                                                        <tr key={detail.id} style={{ borderBottom: "1px solid #eeeee4" }}>
                                                            <td >
                                                                <img src={detail.variation.image} alt="img" />
                                                            </td>
                                                            <td style={{ padding: 0, fontSize: 12 }}>{detail.variation.name}</td>
                                                            <td style={{ fontSize: 12 }}>
                                                                <span style={{
                                                                    display: "inline-block", width: 16, height: 16,
                                                                    border: "1px solid #333",
                                                                    backgroundColor: `${detail.variation.color}`
                                                                }}></span>
                                                            </td>
                                                            <td style={{ fontSize: 12 }}>${detail.variation.price}</td>
                                                            <td style={{ fontSize: 12 }}>{detail.quantity}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </td>
                                        <td className="li-product-thumbnail">
                                            <div style={{ width: 100, overflow: "hidden" }}>
                                                <span
                                                    style={{ display: "inline-block", width: 100, wordWrap: "break-word", overflowWrap: "break-word" }}
                                                >
                                                    {item.note}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="quantity">
                                            ${item.total}
                                        </td>
                                        <td className="li-product-price">
                                            <p className="amount"> {formattedDateH} </p>
                                            <p className="amount"> {formattedDateD} </p>
                                        </td>
                                        <td className="product-subtotal">
                                            {
                                                item.status.includes("pending") ?
                                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                                        {/* <span style={{ fontWeight: 100, fontSize: 14, color: `${item.pay ? "green" : "black"}` }}>{item.status}</span> */}
                                                        <button type="button"
                                                            onClick={() => handleDeny(item.id)}
                                                            style={{
                                                                cursor: "pointer", padding: 0, border: `1px solid ${item.pay ? "red" : "#333"}`,
                                                                color: `${item.pay ? "red" : ""}`
                                                            }}
                                                        >
                                                            Deny
                                                        </button>
                                                    </div>
                                                    : <span style={{ fontWeight: 100, fontSize: 14 }}>{item.status}</span>
                                            }
                                        </td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            </div>
        </>
    );
}
