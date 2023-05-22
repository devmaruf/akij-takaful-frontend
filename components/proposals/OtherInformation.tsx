import Table from "../table";

export function OtherInformation({ data }: any) {

    const columnData: any[] = [
        { title: "Medical", id: 1 },
        { title: "Occupation", id: 2 },
        { title: "Service", id: 3 },
    ]

    const dataset = [
        { medical: "CMCH", occupation: "Student", service: "ABC Testing" },
        { medical: "DMCH", occupation: "Software Engineer", service: "ABC Testing" },
      
    ]

    return (
        <div className="border border-gray-200 p-2.5 rounded-md shadow-md mt-5">
            <h3 className="bg-slate-100 p-2 text-cyan-600 mb-3 text-xl text-center">
                Other Information
            </h3>

            <Table
                column={columnData}

            >
                {
                    dataset.map((item, index) => (
                        <tr className="text-left" key={index}>
                            <td className="px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                                {item.medical}
                            </td>
                            <td className="px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                {item.occupation}
                            </td>
                            <td className="px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                {item.service}
                            </td>
                           

                        </tr>
                    ))
                }
            </Table>

        </div>
    );
}
