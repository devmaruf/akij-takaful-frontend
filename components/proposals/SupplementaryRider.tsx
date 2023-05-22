import Table from "../table";

export function SupplementaryRider({ data }: any) {

    return (
        <div className="border border-gray-200 p-2.5 rounded-md shadow-md mt-5">
            <h3 className="bg-slate-100 p-2 text-cyan-600 mb-3 text-xl text-center">
                Supplementary Cover/Rider
            </h3>

            <Table
                column={[]}

            >
                <tr className="flex text-left">
                    <th scope="row" className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                        PDAB
                    </th>
                    <td className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                        Yes
                    </td>
                    <th scope="row" className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                        Premium
                    </th>
                    <td className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                    {data.initial_premium ?? "N/A"}
                    </td>
                    <td className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                        DIAB
                    </td>
                    <td className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                        No
                    </td>
                    <td className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                        Premium
                    </td>
                    <td className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                        350
                    </td>
                </tr>


                <tr className="flex text-left">
                    <th scope="row" className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                        HI
                    </th>
                    <td className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                        bronze
                    </td>
                    <th scope="row" className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                        Premium
                    </th>
                    <td className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                        735.00
                    </td>
                    <td className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                        CI
                    </td>
                    <td className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                        Yes
                    </td>
                    <td className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                        Premium
                    </td>
                    <td className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                        0
                    </td>
                </tr>



            </Table>

        </div>
    );
}
