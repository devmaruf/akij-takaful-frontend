import { useState } from "react";
import { IStamp, IStamps } from "@/redux/interfaces";
import { formatCurrency } from "@/utils/currency";

export default function StampCountView({ stamps }: IStamps) {
    const [fullView, setFullView] = useState<boolean>(false);

    return (
        <>
            {stamps.length} stamp{stamps.length > 1 ? 's' : ''}

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
                            {
                                stamps.map((stampItem: IStamp, index: number) => (
                                    <tr key={index} className="border-b border-gray-100">
                                        <td>{stampItem.name}</td>
                                        <td>{formatCurrency(stampItem.value)}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            }
        </>
    )
}