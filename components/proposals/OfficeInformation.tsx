import Table from "../table";

export function OfficeInformation({ data }: any) {

    console.log('data :>> ', data);

    return (
        <div className="border border-gray-200 p-2.5 rounded-md shadow-md mt-1">
            <h3 className="bg-slate-100 p-2 text-cyan-600 mb-3 text-xl text-center">
                Office Information
            </h3>

            <Table
                column={[]}

            >
                <tr className="flex text-left">
                    <th scope="row" className="flex-1 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                        Proposal No
                    </th>
                    <td className="flex-1 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                        {data.proposal_no ?? "N/A"}
                    </td>
                    <th scope="row" className="flex-1 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                        Proposal Date
                    </th>
                    <td className="flex-1 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                        12
                    </td>
                </tr>

                <tr className="flex text-left">
                    <th scope="row" className="flex-1 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                        Policy No
                    </th>
                    <td className="flex-1 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                        12
                    </td>
                    <th scope="row" className="flex-1 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                        Branch Code
                    </th>
                    <td className="flex-1 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                       {data.branch_name ?? "N/A"} ({data.branch_id})
                    </td>
                </tr>


                <tr className="flex text-left">
                    <th scope="row" className="flex-1 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                        F.P.R No
                    </th>
                    <td className="flex-1 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                       N/F
                    </td>
                    <th scope="row" className="flex-1 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                       Region
                    </th>
                    <td className="flex-1 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                       Uttara Office 
                    </td>
                </tr>

            </Table>

        </div>
    );
}
