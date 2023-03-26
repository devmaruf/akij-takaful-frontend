import { formatCurrency } from "@/utils/currency";
import StatusBadge from "@/components/badge/StatusBadge";

export default function ExpenseDetail({ expenseDetails }: any) {
    return (
        <div className="text-gray-900">
            {
                (typeof expenseDetails !== "undefined" && expenseDetails !== null) ? (
                    <div>
                        <div className="grid gap-2 grid-cols-2">
                            <div className='flex justify-between'>
                                <h6>Expense ID</h6>
                                <h6>:</h6>
                            </div>
                            <h6>{expenseDetails.id}</h6>
                            <div className='flex justify-between'>
                                <h6>Expense Title</h6>
                                <h6>:</h6>
                            </div>
                            <h6>{expenseDetails.name}</h6>
                            <div className='flex justify-between'>
                                <h6>Request Amount</h6>
                                <h6>:</h6>
                            </div>
                            <h6>{formatCurrency(expenseDetails.requested_amount)}</h6>
                            <div className='flex justify-between'>
                                <h6>Approved Amount</h6>
                                <h6>:</h6>
                            </div>
                            <h6>{formatCurrency(expenseDetails.approved_amount)}</h6>
                            <div className='flex justify-between'>
                                <h6>Status</h6>
                                <h6>:</h6>
                            </div>
                            <StatusBadge status={expenseDetails?.status ?? ''} />
                            <div className='flex justify-between'>
                                <h6>Expense Items</h6>
                                <h6>:</h6>
                            </div>
                        </div>

                        <table className="border-collapse border border-gray-300 rounded-md w-full text-sm mt-3">
                            <thead className="text-xs font-semibold text-gray-700 text-center bg-gray-100">
                                <tr>
                                    <th className="border border-gray-200 p-1">SI</th>
                                    <td className="border border-gray-200 p-1">Item Name</td>
                                    <td className="border border-gray-200 p-1">Quantity</td>
                                    <td className="border border-gray-200 p-1">Unit Amount</td>
                                    <td className="border border-gray-200 p-1">Sub Total</td>
                                </tr>
                            </thead>
                            <tbody className="text-xs text-gray-700 capitalize text-center">
                                {
                                    expenseDetails.items && expenseDetails.items.map((item: any, index: number) => (
                                        <tr key={item.id}>
                                            <td className="border border-gray-200 p-1">{index + 1}</td>
                                            <td className="border border-gray-200 p-1">{item.item_name}</td>
                                            <td className="border border-gray-200 p-1">{item.item_quantity}</td>
                                            <td className="border border-gray-200 p-1">{formatCurrency(item.item_unit_amount)}</td>
                                            <td className="border border-gray-200 p-1">{formatCurrency(item.item_quantity * item.item_unit_amount)}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div>Something Went wrong!</div>
                )
            }
        </div>
    )
}