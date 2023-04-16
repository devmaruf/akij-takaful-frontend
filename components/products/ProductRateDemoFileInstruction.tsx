import Link from "next/link";
import { Accordion } from 'flowbite-react';

export default function ProductDemoFileInstruction() {
    return (
        <div className="mt-5">
            <Accordion alwaysOpen={true}>
                <Accordion.Panel>
                    <Accordion.Title>
                        Demo File Instructions
                    </Accordion.Title>
                    <Accordion.Content>
                        <p className="text-gray-500 mt-1 text-xs">
                            Upload a .csv file with age, term and rate. <br />
                            <Link href={'/files/product-form-demo.csv'} className='text-blue-500'>
                                <i className='bi bi-download'></i> Download demo file
                            </Link>
                        </p>
                        <table className='w-full border-collapse border mt-3'>
                            <thead>
                                <tr>
                                    <th className='text-left border-b bg-slate-100'>Age</th>
                                    <th className='text-left border-b bg-slate-100'>10</th>
                                    <th className='text-left border-b bg-slate-100'>20</th>
                                    <th className='text-left border-b bg-slate-100'>30</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>18</td>
                                    <td>120.20</td>
                                    <td>200.50</td>
                                    <td>500.50</td>
                                </tr>
                                <tr>
                                    <td>19</td>
                                    <td>140.20</td>
                                    <td>300.50</td>
                                    <td>400.50</td>
                                </tr>
                                <tr>
                                    <td>20</td>
                                    <td>500</td>
                                    <td>400.50</td>
                                    <td>200.50</td>
                                </tr>
                            </tbody>
                        </table>
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>
        </div>
    )
}