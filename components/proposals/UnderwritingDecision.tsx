import Table from "../table";

export function UnderwritingDecision({ data }: any) {

    return (
        <div className="border border-gray-200 p-2.5 rounded-md shadow-md mt-5">
            <h3 className="bg-slate-100 p-2 text-cyan-600 mb-3 text-xl text-center">
                {`Under Writing Decision`}
            </h3>

            <Table
                column={[]}

            >
                <tr className="flex text-left">
                    <th scope="row" className="basis-full px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                       Accepted with standard rate for
                    </th>
                </tr>

                <tr className="flex text-left">
                    <th scope="row" className="basis-1/2 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                        Approved By
                    </th>
                    <td className="basis-1/2 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                       Admin & 202000005
                    </td>
                </tr>

                <tr className="flex text-left">
                    <th scope="row" className="basis-1/2 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                        Approved Date & Time
                    </th>
                    <td className="basis-1/2 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                      20-05-2023 12:00 PM
                    </td>
                </tr>


            </Table>
        </div>


    );
}
