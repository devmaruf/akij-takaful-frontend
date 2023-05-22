import Table from "../table";

export function ExtraLoading({ data }: any) {

    return (
        <>
            <div className="border border-gray-200 p-2.5 rounded-md shadow-md mt-5">
                <h3 className="bg-slate-100 p-2 text-cyan-600 mb-3 text-xl text-center">
                    Extra Loading
                </h3>

                <Table
                    column={[]}

                >
                    <tr className="flex text-left">
                        <th scope="row" className="basis-2/4 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                            OC (Per Thousand)
                        </th>
                        <td className="basis-2/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                            0
                        </td>
                        <th scope="row" className="basis-2/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                            Premium
                        </th>
                        <td className="basis-2/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                            350.00
                        </td>

                    </tr>

                    <tr className="flex text-left">
                        <th scope="row" className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                            EM For Life
                        </th>
                        <td className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                            0
                        </td>
                        <th scope="row" className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                            Premium
                        </th>
                        <td className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                            0
                        </td>
                        <td className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                            EM For PDAB/DIAB
                        </td>
                        <td className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                            0
                        </td>
                        <th scope="row" className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                            Premium
                        </th>
                        <td className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                            0
                        </td>
                    </tr>



                    <tr className="flex text-left">
                        <th scope="row" className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                            EM For CI
                        </th>
                        <td className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                            0
                        </td>
                        <th scope="row" className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                            Premium
                        </th>
                        <td className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                            0
                        </td>
                        <td className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                            EM For HI
                        </td>
                        <td className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                            0
                        </td>
                        <th scope="row" className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                            Premium
                        </th>
                        <td className="basis-1/6 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                            0
                        </td>
                    </tr>

                </Table>
            </div>


            <div className="border border-gray-200 p-2.5 rounded-md shadow-md mt-5">

                <Table
                    column={[]}

                >
                    <tr className="flex text-left">
                        <th scope="row" className="basis-2/4 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                            Total Instalment Premium
                        </th>
                        <td className="basis-2/4 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                            17525
                        </td>
                    </tr>
                    <tr className="flex text-left">
                        <th scope="row" className="basis-1/4 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                            Policy Option
                        </th>
                        <td className="basis-1/4 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                            B
                        </td>
                        <th scope="row" className="basis-1/4 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                            Next Premium Due Date
                        </th>
                        <td className="basis-1/4 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                            N/F
                        </td>
                    </tr>

                </Table>
            </div>
        </>
    );
}
