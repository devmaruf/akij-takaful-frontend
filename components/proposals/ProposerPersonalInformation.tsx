import Table from "../table";

export function ProposerPersonalInformation({ data }: any) {

    return (
        <div className="border border-gray-200 p-2.5 rounded-md shadow-md mt-5">
            <h3 className="bg-slate-100 p-2 text-cyan-600 mb-3 text-xl text-center">
                {`Proposer's Personal Al Information`}
            </h3>

            <Table
                column={[]}

            >
                <tr className="flex text-left">
                    <th scope="row" className="basis-1/4 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                        Name
                    </th>
                    <td className="basis-3/4 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                        {data.proposal_personal_information.full_name ?? "N/A"}
                    </td>
                </tr>

                <tr className="flex text-left">
                    <th scope="row" className="basis-1/4 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                        Mobile
                    </th>
                    <td className="basis-1/4 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                        {data.proposal_personal_information.mobile_no ?? "N/A"}
                    </td>
                    <th scope="row" className="basis-1/4 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                        Email
                    </th>
                    <td className="basis-1/4 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                        {data.proposal_personal_information.email ?? "N/A"}
                    </td>
                </tr>



                <tr className="flex text-left">
                    <th scope="row" className="basis-1/4 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                        Address
                    </th>
                    <td className="basis-3/4 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                        {data.proposer_present_address.street_address}, {data.proposer_present_address.area_name}, {data.proposer_present_address.post_office_name}, {data.proposer_present_address.district_name}, {data.proposer_present_address.division_name}
                    </td>
                </tr>
                <tr className="flex text-left">
                    <th scope="row" className="basis-2/4 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                        Nominee 1 Name, Age & Relation
                    </th>
                    <td className="basis-2/4 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                        ABC, 28, Brother
                    </td>
                </tr>

            </Table>
        </div>


    );
}
