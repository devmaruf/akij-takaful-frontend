import { useState } from "react";
import { IStamp, IStamps } from "@/redux/interfaces";
import { formatCurrency } from "@/utils/currency";

export default function StampCountView({ stamps }: any) {
    const [fullView, setFullView] = useState<boolean>(false);

    return (
        <>
            Stamps
            <i
                className={`ml-2 cursor-pointer bi bi-chevron-${fullView ? 'up' : 'down'}`}
                onClick={(e) => setFullView(!fullView)}
            ></i>
            {
                fullView &&
                <div>
                    <table className=" w-40">
                        <thead className="bg-gray-100">
                            <tr>
                                <td>Name</td>
                                <td>Value</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-100">
                                <td>Stamp - 100</td>
                                <td>{stamps.qty_100}</td>
                            </tr>
                            <tr className="border-b border-gray-100">
                                <td>Stamp - 50</td>
                                <td>{stamps.qty_50}</td>
                            </tr>
                            <tr className="border-b border-gray-100">
                                <td>Stamp - 30</td>
                                <td>{stamps.qty_30}</td>
                            </tr>
                            <tr className="border-b border-gray-100">
                                <td>Stamp - 20</td>
                                <td>{stamps.qty_20}</td>
                            </tr>
                            <tr className="border-b border-gray-100">
                                <td>Stamp - 10</td>
                                <td>{stamps.qty_10}</td>
                            </tr>
                            <tr className="border-b border-gray-100">
                                <td>Stamp - 5</td>
                                <td>{stamps.qty_5}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            }
        </>
    )
}