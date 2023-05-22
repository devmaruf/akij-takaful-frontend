import Table from "../table";

export function ExistingPolicy({ data }: any) {

    const columnData: any[] = [
        { title: "Policy No", id: 1 },
        { title: "Sum At Risk", id: 2 },
        { title: "Premium", id: 3 },
        { title: "Status", id: 7 },
    ]

    const dataset = [
        { policyNo: 5622222, riskSum: 200000, premium: 1155222, status: "Lapsed" },
        { policyNo: 454545, riskSum: 5858585, premium: 5454545, status: "In Forced" },
        { policyNo: 5622222, riskSum: 200000, premium: 1155222, status: "Lapsed" },
        { policyNo: 45456, riskSum: 2005455000, premium: 54545, status: "Lapsed" },
        { policyNo: 45456, riskSum: 2005455000, premium: 54545, status: "Lapsed" },
        { policyNo: 45456, riskSum: 2005455000, premium: 54545, status: "Lapsed" },
        { policyNo: 5454545, riskSum: 200000, premium: 4545, status: "In Forced" },
    ]

    return (
        <div className="border border-gray-200 p-2.5 rounded-md shadow-md mt-5">
            <h3 className="bg-slate-100 p-2 text-cyan-600 mb-3 text-xl text-center">
                Particular of Existing Policy / Concurrent Proposals
            </h3>

            <Table
                column={columnData}

            >
                {
                    dataset.map((item, index) => (
                        <tr className="text-left" key={index}>
                            <td className="px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                                {item.policyNo}
                            </td>
                            <td className="px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                {item.riskSum}
                            </td>
                            <td className="px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                {item.premium}
                            </td>
                            <td className="px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                {item.status}
                            </td>

                        </tr>
                    ))
                }
                <tr className="text-left font-extrabold text-lg">
                    <td className="px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                       Total Sum At Risk
                    </td>
                    <td className="px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                      52556565656
                    </td>
                    <td className="px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                      BMI STATUS: OVERWEIGHT
                    </td>
                    <td className="px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                       BMI Result: 28
                    </td>

                </tr>
            </Table>

        </div>
    );
}
