import Table from "../table";

export function PolicyInformation({ data }: any) {

    return (
        <div className="border border-gray-200 p-2.5 rounded-md shadow-md mt-5">
            <h3 className="bg-slate-100 p-2 text-cyan-600 mb-3 text-xl text-center">
                Policy Information
            </h3>

            <Table
                column={[]}

            >
                <tr className="flex text-left">
                    <th scope="row" className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                        Commencement Date
                    </th>
                    <td className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                        {data.commencement_date ?? "N/A"}
                    </td>
                    <th scope="row" className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                        Risk Date
                    </th>
                    <td className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                        {data.risk_date ?? "N/A"}
                    </td>
                    <td className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">

                    </td>
                    <td className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">

                    </td>
                </tr>

                <tr className="flex text-left">
                    <th scope="row" className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                        Date of Birth
                    </th>
                    <td className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                        12/05/2023
                    </td>
                    <th scope="row" className="basis-2/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                        Entry Age & Kyc Doc
                    </th>
                    <td className="basis-2/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                        53 - Passport
                    </td>
                </tr>

                <tr className="flex text-left">
                    <th scope="row" className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                        Table and Term
                    </th>
                    <td className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                        03 15
                    </td>
                    <th scope="row" className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                        Made of Payment
                    </th>
                    <td className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                        Yly
                    </td>
                    <td className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                        Basic Premium
                    </td>
                    <td className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                        {data.basic_premium ?? "N/A"}
                    </td>
                </tr>


                <tr className="flex text-left">
                    <th scope="row" className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                        Sum Assured
                    </th>
                    <td className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                        {data.sum_assured ?? "N/A"}
                    </td>
                    <th scope="row" className="basis-2/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                        Sum at Risk
                    </th>
                    <td className="basis-2/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                        {data.sum_at_risk ?? "N/A"}
                    </td>
                </tr>

            </Table>

        </div>
    );
}
